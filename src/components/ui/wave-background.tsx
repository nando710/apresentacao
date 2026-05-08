"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import gsap from "gsap";

export type WaveBackgroundProps = {
  className?: string;
  style?: React.CSSProperties;
  extendLeftPx?: number;
  /** 0–1, multiplica gain das ondas (sutil = 0.4) */
  intensity?: number;
  /** força do bloom (default 0.45) */
  bloomStrength?: number;
  /** opacidade do canvas (default 0.55) */
  opacity?: number;
  /** velocidade da timeline (default 0.55 = mais lenta) */
  speed?: number;
};

export function WaveBackground({
  className,
  style,
  extendLeftPx = 320,
  intensity = 0.45,
  bloomStrength = 0.45,
  opacity = 0.55,
  speed = 0.55,
}: WaveBackgroundProps) {
  const waveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!waveRef.current) return;

    const FilmGrainShader = {
      uniforms: {
        tDiffuse: { value: null as THREE.Texture | null },
        time: { value: 0 },
        intensity: { value: 0.6 },
        grainScale: { value: 0.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        #ifdef GL_ES
          precision highp int;
          precision mediump float;
        #else
          precision mediump float;
        #endif
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float intensity;
        uniform float grainScale;
        varying vec2 vUv;

        float sparkleNoise(vec2 p) {
          vec2 jPos = p + vec2(37.0, 17.0) * fract(time * 0.07);
          vec3 p3 = fract(vec3(jPos.xyx) * vec3(.1031, .1030, .0973) + time * 0.1);
          p3 += dot(p3, p3.yxz + 19.19);
          return fract((p3.x + p3.y) * p3.z);
        }

        void main() {
          vec4 color = texture2D(tDiffuse, vUv);
          vec2 pos = gl_FragCoord.xy * 0.5 * grainScale;
          float noise = sparkleNoise(pos);
          noise = noise * 2.0 - 1.0;
          vec3 result = color.rgb + noise * intensity * 0.06;
          gl_FragColor = vec4(result, color.a);
        }
      `,
    };

    function createFilmGrainPass(intensity = 0.55, grainScale = 0.3) {
      const pass = new ShaderPass(FilmGrainShader as any);
      (pass.uniforms as any).intensity.value = intensity;
      (pass.uniforms as any).grainScale.value = grainScale;
      return pass;
    }

    // Wave state — gain reduzido por intensity
    const wave1 = { gain: 10, frequency: 0, waveLength: 0.5, currentAngle: 0 };
    const wave2 = { gain: 0, frequency: 0, waveLength: 0.5, currentAngle: 0 };

    const k1 = [
      { time: 0, gain: 10, frequency: 0, waveLength: 0.5 },
      { time: 6, gain: 220, frequency: 0.7, waveLength: 0.5 },
      { time: 12, gain: 280, frequency: 2.4, waveLength: Math.PI * 1.5 },
      { time: 18, gain: 200, frequency: 2.0, waveLength: Math.PI * 1.5 },
      { time: 26, gain: 360, frequency: 0.8, waveLength: Math.PI * 1.5 },
      { time: 36, gain: 180, frequency: 2.2, waveLength: Math.PI * 1.5 },
      { time: 48, gain: 80, frequency: 4.0, waveLength: Math.PI * 1.5 },
      { time: 60, gain: 0, frequency: 0.6, waveLength: 0.5 },
      { time: 70, gain: 140, frequency: 0.9, waveLength: 0.5 },
      { time: 84, gain: 320, frequency: 2.4, waveLength: Math.PI * 1.5 },
      { time: 96, gain: 220, frequency: 1.8, waveLength: Math.PI * 1.5 },
      { time: 108, gain: 100, frequency: 3.5, waveLength: 0.5 },
      { time: 120, gain: 10, frequency: 0, waveLength: 0.5 },
    ].map((k) => ({ ...k, gain: k.gain * intensity }));

    const k2 = [
      { time: 0, gain: 0, frequency: 0, waveLength: 0.5 },
      { time: 12, gain: 0, frequency: 0, waveLength: 0.5 },
      { time: 16, gain: 240, frequency: 0.7, waveLength: 0.5 },
      { time: 22, gain: 200, frequency: 2.4, waveLength: Math.PI * 1.5 },
      { time: 36, gain: 80, frequency: 1.4, waveLength: 0.5 },
      { time: 48, gain: 0, frequency: 0.6, waveLength: 0.5 },
      { time: 64, gain: 110, frequency: 0.8, waveLength: 0.5 },
      { time: 78, gain: 240, frequency: 2.4, waveLength: Math.PI * 1.5 },
      { time: 90, gain: 180, frequency: 1.5, waveLength: Math.PI * 1.5 },
      { time: 108, gain: 70, frequency: 3.0, waveLength: 0.5 },
      { time: 120, gain: 0, frequency: 0, waveLength: 0.5 },
    ].map((k) => ({ ...k, gain: k.gain * intensity }));

    // Aplica speed: divide os times pela speed (speed < 1 => timeline mais longa = mais lenta)
    const scaleTimes = (arr: typeof k1) => arr.map((k) => ({ ...k, time: k.time / speed }));
    const sk1 = scaleTimes(k1);
    const sk2 = scaleTimes(k2);

    const mouse = { x: 0, y: 0, active: false };
    let proxyMouseX = 0, proxyMouseY = 0, proxyInitialized = false;

    // —— Reatividade ao scroll (wheel / touch) ——
    let scrollEnergy = 0;   // 0 → 1.5, decai exponencialmente
    let scrollPhase = 0;    // shift de fase aplicado às ondas, decai mais lento
    let lastTouchY = 0;

    const glowConfig = {
      maxGlowDistance: 690,
      speedScale: 0.42,
      fadeSpeed: 4.4,
      glowFalloff: 0.6,
      mouseSmoothing: 30.0,
    };

    const glowDynamics = {
      accumulation: 1.0,
      decay: 3.5,
      max: 30.0,
      accumEase: 1.5,
      speedEase: 8.5,
    };

    let DPR_CAP = 2;
    const mm = gsap.matchMedia();
    mm.add("(max-resolution: 180dpi)", () => { DPR_CAP = 1.5; });
    const EFFECT_PR = Math.min(window.devicePixelRatio, DPR_CAP) * 0.5;

    const waveContainer = waveRef.current!;
    while (waveContainer.firstChild) waveContainer.removeChild(waveContainer.firstChild);

    const waveRenderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    waveRenderer.setPixelRatio(EFFECT_PR);
    waveRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    waveRenderer.toneMappingExposure = 0.85;
    waveRenderer.autoClear = false;
    waveContainer.appendChild(waveRenderer.domElement);

    const waveScene = new THREE.Scene();
    waveScene.add(new THREE.AmbientLight(0xffffff, 0.2));

    let waveCamera: THREE.OrthographicCamera;
    let waveComposer: EffectComposer;
    let waveBloomPass: UnrealBloomPass;
    let grainPass: ShaderPass;
    let cameraWidth = 0, cameraHeight = 0, waveCameraInitialized = false;

    let setMouseNDC: any, setSmoothSpeed: any, setPhase1: any, setPhase2: any;

    const MAX_BARS = 256;
    const FIXED_BAR_WIDTH = 14;
    const FIXED_BAR_GAP = 12;
    const EXTEND_LEFT_PX = extendLeftPx;

    let instancedBars: THREE.InstancedMesh | null = null;
    let currentBarCount = 0;
    let barMaterial: THREE.ShaderMaterial;
    let barCenters: Float32Array | null = null;

    function updateGlowDistance() {
      if (!barMaterial) return;
      const totalWidth = currentBarCount * (FIXED_BAR_WIDTH + FIXED_BAR_GAP) - FIXED_BAR_GAP;
      const spanPx = totalWidth * 0.3;
      glowConfig.maxGlowDistance = spanPx;
      (barMaterial.uniforms as any).uMaxGlowDist.value = spanPx;
    }

    function createInstancedMaterial() {
      const baseCol = new THREE.Color("hsl(220,100%,50%)");
      const emisCol = new THREE.Color("#1f3dbc");

      return new THREE.ShaderMaterial({
        defines: { USE_INSTANCING: "" },
        uniforms: {
          uMouseClipX: { value: 0 },
          uHalfW: { value: 0 },
          uMaxGlowDist: { value: glowConfig.maxGlowDistance },
          uGlowFalloff: { value: glowConfig.glowFalloff },
          uSmoothSpeed: { value: 0 },
          uGainMul: { value: 1 },
          uBaseY: { value: 0 },
          w1Gain: { value: wave1.gain },
          w1Len: { value: wave1.waveLength },
          w1Phase: { value: 0 },
          w2Gain: { value: wave2.gain },
          w2Len: { value: wave2.waveLength },
          w2Phase: { value: 0 },
          uFixedTipPx: { value: 10 },
          uMinBottomWidthPx: { value: 0 },
          uColor: { value: baseCol },
          uEmissive: { value: emisCol },
          uBaseEmissive: { value: 0.05 },
          uRotationAngle: { value: THREE.MathUtils.degToRad(23.4) },
        },
        vertexShader: `
          attribute float aXPos, aPosNorm, aGroup, aGlow;
          uniform float uMouseClipX, uHalfW, uMaxGlowDist, uGlowFalloff;
          uniform float uGainMul, uBaseY;
          uniform float w1Gain, w1Len, w1Phase;
          uniform float w2Gain, w2Len, w2Phase;
          uniform float uRotationAngle;
          varying float vGlow, vPulse, vHeight;
          varying vec2 vUv;
          float sineH(float g, float len, float ph, float t){
            return max(20.0, (sin(ph + t * len) * 0.5 + 0.6) * g * uGainMul);
          }
          void main(){
            vUv = uv;
            float h1 = sineH(w1Gain, w1Len, w1Phase, aPosNorm);
            float h2 = sineH(w2Gain, w2Len, w2Phase, aPosNorm);
            vHeight = mix(h1, h2, aGroup);
            vec3 pos = position;
            pos.x += aXPos;
            pos.y = 0.0;
            float height = vHeight * uv.y;
            pos.x += height * tan(uRotationAngle);
            pos.y += height;
            pos.y += uBaseY;
            vec4 clip = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
            float dxPx = abs(uMouseClipX - clip.x/clip.w) * uHalfW;
            float prox = clamp(1.0 - pow(dxPx / uMaxGlowDist, uGlowFalloff), 0.0, 1.0);
            vGlow  = aGlow;
            vPulse = prox;
            gl_Position = clip;
          }
        `,
        fragmentShader: `
          #ifdef GL_ES
            precision highp int;
            precision mediump float;
          #else
            precision mediump float;
          #endif
          uniform vec3 uColor, uEmissive;
          uniform float uBaseEmissive;
          uniform float uFixedTipPx, uMinBottomWidthPx;
          varying float vGlow, vPulse, vHeight;
          varying vec2 vUv;
          void main(){
            float tipProp = clamp(uFixedTipPx / vHeight, 0.0, 0.95);
            float transitionY = 1.0 - tipProp;
            float xFromCenter = abs(vUv.x - 0.5) * 2.0;
            float px = fwidth(vUv.x);
            float allowedWidth;
            if (vUv.y >= transitionY){
              float topPos = (vUv.y - transitionY) / tipProp;
              allowedWidth = 1.0 - pow(topPos, 0.9);
            } else {
              float bottomPos = vUv.y / transitionY;
              allowedWidth = max(uMinBottomWidthPx * px * 10.0, pow(bottomPos, 0.5));
            }
            float alpha = smoothstep(-px, px, allowedWidth - xFromCenter);
            if (alpha < 0.01) discard;
            float emissiveStrength = uBaseEmissive + vGlow * 0.7 + vPulse * 0.12;
            vec3 finalColor = uColor + uEmissive * emissiveStrength;
            gl_FragColor = vec4(finalColor, 0.28 * alpha);
          }
        `,
        side: THREE.FrontSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
    }

    function setupQuickSetters() {
      const u = (instancedBars!.material as THREE.ShaderMaterial).uniforms as any;
      setMouseNDC = gsap.quickSetter(u.uMouseClipX, "value");
      setSmoothSpeed = gsap.quickSetter(u.uSmoothSpeed, "value");
      setPhase1 = gsap.quickSetter(u.w1Phase, "value");
      setPhase2 = gsap.quickSetter(u.w2Phase, "value");
    }

    const MAX_KEYFRAME_GAIN = 500;
    const SCREEN_COVERAGE = 0.32;
    function updateGainMultiplier() {
      if (!barMaterial) return;
      const targetPx = cameraHeight * SCREEN_COVERAGE;
      (barMaterial.uniforms as any).uGainMul.value = targetPx / MAX_KEYFRAME_GAIN;
    }

    function setupPointerTracking() {
      const readCoords = (e: PointerEvent | TouchEvent) => {
        if ("clientX" in e) return { x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY };
        const t = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
        return t ? { x: t.clientX, y: t.clientY } : { x: mouse.x, y: mouse.y };
      };
      const updatePos = (e: any, active: boolean) => {
        const { x, y } = readCoords(e);
        const r = rect;
        mouse.x = x - r.left;
        mouse.y = y - r.top;
        mouse.active = active;
        if (!proxyInitialized) {
          proxyMouseX = mouse.x;
          proxyMouseY = mouse.y;
          proxyInitialized = true;
        }
      };
      const move = (e: any) => updatePos(e, true);
      const deactivate = () => { mouse.active = false; };

      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerleave", deactivate, { passive: true });

      // —— Reatividade ao scroll: wheel + touch ——
      const onWheel = (e: WheelEvent) => {
        const intensity = Math.min(Math.abs(e.deltaY) * 0.0035, 1.2);
        scrollEnergy = Math.min(scrollEnergy + intensity, 2.0);
        scrollPhase += e.deltaY * 0.0014;
      };
      const onTouchStart = (e: TouchEvent) => {
        lastTouchY = e.touches[0]?.clientY ?? 0;
      };
      const onTouchMoveScroll = (e: TouchEvent) => {
        const y = e.touches[0]?.clientY ?? 0;
        const delta = lastTouchY - y;
        scrollEnergy = Math.min(scrollEnergy + Math.abs(delta) * 0.009, 2.0);
        scrollPhase += delta * 0.0028;
        lastTouchY = y;
      };
      window.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMoveScroll, { passive: true });

      listeners.push(() => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerleave", deactivate);
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMoveScroll);
      });
    }

    function accumulateGlow(dt: number) {
      if (!instancedBars) return;
      const attr = instancedBars.geometry.getAttribute("aGlow") as THREE.InstancedBufferAttribute;
      const arr = attr.array as Float32Array;

      const mouseWorldX = proxyMouseX - cameraWidth * 0.5;
      const mDist = glowConfig.maxGlowDistance;
      const fall = glowConfig.glowFalloff;

      const decayLerp = 1.0 - Math.exp(-glowDynamics.decay * dt);
      const addEase = 1.0 - Math.exp(-glowDynamics.accumEase * dt);
      const vmax = glowDynamics.max;

      // Scroll injeta um glow base que se espalha por todas as barras
      const scrollGlowAdd = scrollEnergy * 0.55 * addEase;

      for (let i = 0; i < currentBarCount; i++) {
        const dx = Math.abs(mouseWorldX - (barCenters as Float32Array)[i]);
        const hit = dx < mDist ? 1.0 - Math.pow(dx / mDist, fall) : 0.0;
        const targetAdd = hit * smoothSpeed;
        const add = targetAdd * addEase + scrollGlowAdd;
        let g = arr[i] + add - arr[i] * decayLerp;
        if (g > vmax) g = vmax;
        arr[i] = arr[i + currentBarCount] = g;
      }
      attr.needsUpdate = true;
    }

    function createInstancedBars() {
      if (instancedBars) {
        waveScene.remove(instancedBars);
        instancedBars.geometry.dispose();
        (instancedBars.material as any).dispose();
        instancedBars = null;
      }

      const waveWidth = cameraWidth;
      const span = waveWidth + EXTEND_LEFT_PX;
      const barCount = Math.min(MAX_BARS, Math.max(1, Math.floor((span + FIXED_BAR_GAP) / (FIXED_BAR_WIDTH + FIXED_BAR_GAP))));
      const gap = barCount > 1 ? (span - barCount * FIXED_BAR_WIDTH) / (barCount - 1) : 0;
      currentBarCount = barCount;

      const startX = -waveWidth / 2 - EXTEND_LEFT_PX;
      const instCnt = barCount * 2;
      barCenters = new Float32Array(barCount);

      const aXPos = new Float32Array(instCnt);
      const aPosNorm = new Float32Array(instCnt);
      const aGroup = new Float32Array(instCnt);
      const aGlow = new Float32Array(instCnt).fill(0);

      for (let i = 0; i < barCount; i++) {
        const x = startX + FIXED_BAR_WIDTH / 2 + i * (FIXED_BAR_WIDTH + gap);
        barCenters[i] = x;
        const t = barCount > 1 ? i / (barCount - 1) : 0;
        aXPos[i] = x;
        aXPos[i + barCount] = x;
        aPosNorm[i] = t;
        aPosNorm[i + barCount] = t;
        aGroup[i] = 0;
        aGroup[i + barCount] = 1;
      }

      const geo = new THREE.PlaneGeometry(FIXED_BAR_WIDTH, 1, 1, 1);
      geo.translate(0, 0.5, 0);
      geo.setAttribute("aXPos", new THREE.InstancedBufferAttribute(aXPos, 1));
      geo.setAttribute("aPosNorm", new THREE.InstancedBufferAttribute(aPosNorm, 1));
      geo.setAttribute("aGroup", new THREE.InstancedBufferAttribute(aGroup, 1));
      geo.setAttribute("aGlow", new THREE.InstancedBufferAttribute(aGlow, 1).setUsage(THREE.DynamicDrawUsage));

      barMaterial = createInstancedMaterial();
      instancedBars = new THREE.InstancedMesh(geo, barMaterial, instCnt);
      instancedBars.frustumCulled = false;
      waveScene.add(instancedBars);

      setupQuickSetters();
      updateGlowDistance();
    }

    function buildKeyframeTweens(target: any, keyframes: Array<any>) {
      const tl = gsap.timeline();
      for (let i = 0; i < keyframes.length - 1; i++) {
        const cur = keyframes[i];
        const nxt = keyframes[i + 1];
        const duration = nxt.time - cur.time;
        tl.to(target, {
          gain: nxt.gain,
          frequency: nxt.frequency,
          waveLength: nxt.waveLength,
          duration,
          ease: "power2.inOut",
        }, cur.time);
      }
      return tl;
    }

    function buildSceneTimeline() {
      const tl = gsap.timeline({ repeat: -1 });
      tl.add(buildKeyframeTweens(wave1, sk1), 0);
      tl.add(buildKeyframeTweens(wave2, sk2), 0);
      return tl;
    }

    function initWaveThree() {
      cameraWidth = waveContainer.clientWidth;
      cameraHeight = waveContainer.clientHeight;
      waveCamera = new THREE.OrthographicCamera(
        -cameraWidth / 2, cameraWidth / 2,
        cameraHeight / 2, -cameraHeight / 2,
        -1000, 1000
      );
      waveCamera.position.z = 10;
      waveCamera.lookAt(0, 0, 0);

      waveRenderer.setSize(cameraWidth, cameraHeight);
      waveComposer = new EffectComposer(waveRenderer);
      (waveComposer as any).setPixelRatio(EFFECT_PR);

      waveComposer.addPass(new RenderPass(waveScene, waveCamera));

      waveBloomPass = new UnrealBloomPass(new THREE.Vector2(cameraWidth, cameraHeight), bloomStrength, 0.7, 0.0);
      (waveBloomPass as any).resolution.set(cameraWidth * 0.5, cameraHeight * 0.5);
      waveComposer.addPass(waveBloomPass);

      grainPass = createFilmGrainPass();
      waveComposer.addPass(grainPass);

      createInstancedBars();
      setupPointerTracking();
      updateGainMultiplier();
      waveCameraInitialized = true;
    }

    let pendingW = 0, pendingH = 0, heavyResizeTimer: any = null;

    function onResize(newW: number, newH: number) {
      if (!waveCameraInitialized) return;
      pendingW = newW; pendingH = newH;

      cameraWidth = newW; cameraHeight = newH;
      waveCamera.left = -cameraWidth / 2;
      waveCamera.right = cameraWidth / 2;
      waveCamera.top = cameraHeight / 2;
      waveCamera.bottom = -cameraHeight / 2;
      waveCamera.updateProjectionMatrix();

      const span = cameraWidth + EXTEND_LEFT_PX;
      const barCount = Math.min(MAX_BARS, Math.max(1, Math.floor((span + FIXED_BAR_GAP) / (FIXED_BAR_WIDTH + FIXED_BAR_GAP))));

      if (barCount !== currentBarCount) {
        currentBarCount = barCount;
        createInstancedBars();
      }

      (barMaterial.uniforms as any).uHalfW.value = cameraWidth * 0.5;
      updateGainMultiplier();
      updateGlowDistance();

      clearTimeout(heavyResizeTimer);
      heavyResizeTimer = setTimeout(applyHeavyResize, 10);
      rect = waveRenderer.domElement.getBoundingClientRect();
    }

    function applyHeavyResize() {
      heavyResizeTimer = null;
      waveRenderer.setPixelRatio(EFFECT_PR);
      waveRenderer.setSize(pendingW, pendingH);
      (waveComposer as any).setSize(pendingW, pendingH);
      (waveBloomPass as any)?.setSize(pendingW, pendingH);
    }

    function disposeWaveScene() {
      gsap.globalTimeline.clear();
      waveScene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
      (grainPass as any)?.dispose?.();
      (waveBloomPass as any)?.dispose?.();
      (waveComposer as any)?.dispose?.();
      (waveRenderer as any)?.dispose?.();
      instancedBars = null;
    }

    const listeners: Array<() => void> = [];
    let smoothSpeed = 0;
    let rect = waveRenderer.domElement.getBoundingClientRect();

    initWaveThree();
    onResize(waveContainer.clientWidth, waveContainer.clientHeight);

    const ticker = () => {
      if (!waveCameraInitialized || !instancedBars) return;
      const dt = (gsap.ticker.deltaRatio() as number) * (1 / 60);

      // —— Decay do scroll-energy/phase ——
      scrollEnergy *= Math.exp(-2.5 * dt);   // glow/gain decai rápido
      scrollPhase *= Math.exp(-1.4 * dt);    // shift de fase decai mais lento

      wave1.currentAngle = (wave1.currentAngle + wave1.frequency * dt) % (Math.PI * 2);
      wave2.currentAngle = (wave2.currentAngle + wave2.frequency * dt) % (Math.PI * 2);
      // Aplica scroll-phase: barras "ondulam" lateralmente quando rola
      setPhase1(wave1.currentAngle + scrollPhase);
      setPhase2(wave2.currentAngle + scrollPhase * 0.7);

      const kMouse = 1.0 - Math.exp(-glowConfig.mouseSmoothing * dt);
      proxyMouseX += (mouse.x - proxyMouseX) * kMouse;
      proxyMouseY += (mouse.y - proxyMouseY) * kMouse;

      const dx = mouse.active ? mouse.x - proxyMouseX : 0;
      const dy = mouse.active ? mouse.y - proxyMouseY : 0;
      // Scroll injeta velocidade no cálculo de glow/speed
      const rawSpeed = Math.hypot(dx, dy * 0.1) * glowConfig.speedScale + scrollEnergy * 6;

      const kSpeed = 1.0 - Math.exp(-glowDynamics.speedEase * dt);
      smoothSpeed += (rawSpeed - smoothSpeed) * kSpeed;
      setSmoothSpeed(smoothSpeed);

      const u = (instancedBars.material as THREE.ShaderMaterial).uniforms as any;
      u.w1Gain.value = wave1.gain;
      u.w1Len.value = wave1.waveLength;
      u.w2Gain.value = wave2.gain;
      u.w2Len.value = wave2.waveLength;

      // Scroll dá um boost momentâneo na altura das barras
      const baseGainMul = (cameraHeight * SCREEN_COVERAGE) / MAX_KEYFRAME_GAIN;
      u.uGainMul.value = baseGainMul * (1 + scrollEnergy * 0.55);

      const mouseClipX = (proxyMouseX / cameraWidth) * 2 - 1;
      setMouseNDC(mouseClipX);
      const baseOffset = window.innerWidth < 768 ? 20 : 40;
      u.uBaseY.value = -cameraHeight * 0.5 + baseOffset;

      (grainPass.uniforms as any).time.value += dt * 0.18;

      accumulateGlow(dt);
      waveComposer.render();
    };

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        if (e.target === waveContainer) onResize(e.contentRect.width, e.contentRect.height);
      }
    });

    const mainTimeline = buildSceneTimeline();
    mainTimeline.play(0);

    gsap.ticker.add(ticker);
    ro.observe(waveContainer);
    listeners.push(() => gsap.ticker.remove(ticker));
    listeners.push(() => ro.disconnect());
    listeners.push(() => mainTimeline.kill());

    const onVisibility = () => {
      document.hidden ? gsap.globalTimeline.pause() : gsap.globalTimeline.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    listeners.push(() => document.removeEventListener("visibilitychange", onVisibility));

    return () => {
      listeners.forEach((fn) => fn());
      try { disposeWaveScene(); } catch {}
      try {
        const canvas = waveRenderer.domElement;
        if (canvas && canvas.parentElement === waveContainer) waveContainer.removeChild(canvas);
      } catch {}
    };
  }, [extendLeftPx, intensity, bloomStrength, speed]);

  return (
    <div
      ref={waveRef}
      aria-hidden
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
