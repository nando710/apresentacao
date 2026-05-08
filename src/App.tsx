import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import {
  AlertCircle,
  LayoutDashboard,
  Smartphone,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Building2,
  Handshake,
  Sparkles,
  Target,
  Wallet,
  CreditCard,
  Repeat,
  Shield,
  Zap,
  ClipboardList,
  Banknote,
  BarChart3,
  Workflow,
  Rocket,
  Mail,
  Phone,
} from 'lucide-react';

gsap.registerPlugin(Observer);

const TOTAL_SLIDES = 22;

const LinkedinIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

type AnimVariant =
  | 'fade-up'
  | 'from-left'
  | 'from-right'
  | 'from-bottom'
  | 'scale-up'
  | 'blur-in'
  | 'rotate-in'
  | 'cascade';

const SLIDE_VARIANTS: AnimVariant[] = [
  'blur-in', 'from-left', 'scale-up', 'from-bottom', 'rotate-in',
  'from-right', 'scale-up', 'blur-in', 'cascade', 'from-right',
  'from-left', 'from-right', 'from-left', 'from-right', 'from-left',
  'from-right', 'from-bottom', 'scale-up', 'cascade', 'from-bottom',
  'cascade', 'blur-in',
];

const VARIANT_CONFIGS: Record<AnimVariant, {
  from: gsap.TweenVars; to: gsap.TweenVars; duration: number; stagger: number; ease: string;
}> = {
  'fade-up':     { from: { y: 50, opacity: 0 }, to: { y: 0, opacity: 1 }, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
  'from-left':   { from: { x: -90, opacity: 0 }, to: { x: 0, opacity: 1 }, duration: 0.85, stagger: 0.07, ease: 'power3.out' },
  'from-right':  { from: { x: 90, opacity: 0 }, to: { x: 0, opacity: 1 }, duration: 0.85, stagger: 0.07, ease: 'power3.out' },
  'from-bottom': { from: { y: 90, opacity: 0 }, to: { y: 0, opacity: 1 }, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
  'scale-up':    { from: { scale: 0.82, opacity: 0, y: 20 }, to: { scale: 1, opacity: 1, y: 0 }, duration: 0.95, stagger: 0.09, ease: 'back.out(1.4)' },
  'blur-in':     { from: { opacity: 0, filter: 'blur(18px)', y: 30 }, to: { opacity: 1, filter: 'blur(0px)', y: 0 }, duration: 1.05, stagger: 0.1, ease: 'power2.out' },
  'rotate-in':   { from: { rotateX: 35, opacity: 0, transformPerspective: 1000, y: 40 }, to: { rotateX: 0, opacity: 1, y: 0 }, duration: 1, stagger: 0.1, ease: 'power3.out' },
  'cascade':     { from: { y: 60, opacity: 0, scale: 0.9, rotate: -2 }, to: { y: 0, opacity: 1, scale: 1, rotate: 0 }, duration: 0.85, stagger: 0.06, ease: 'back.out(1.6)' },
};

const animateSlideIn = (section: HTMLElement, variant: AnimVariant, delay = 0.3) => {
  const cfg = VARIANT_CONFIGS[variant];
  const items = section.querySelectorAll('.animate-item');
  if (!items.length) return;
  gsap.fromTo(items, cfg.from, { ...cfg.to, duration: cfg.duration, stagger: cfg.stagger, delay, ease: cfg.ease });
};

const SLIDE_TITLES = [
  'Capa', 'Sobre', 'Trajetória', 'Método', 'A solução', 'Cenário',
  'Custo', 'Visão', 'Módulos', 'Multi-Arena', 'Financeiro', 'Alunos',
  'Cobrança', 'Agendamento', 'Reposição', 'Portal', 'Comparativo',
  'Performance', 'Métricas', 'Roadmap', 'Próximos passos', 'Contato',
];

/** Numeração decorativa gigante no canto */
const SlideMark = ({ n, label }: { n: number; label: string }) => (
  <div className="pointer-events-none absolute right-6 top-6 z-10 text-right">
    <div className="font-mono text-[0.65rem] tracking-[0.32em] text-zinc-500 uppercase mb-1">
      {label}
    </div>
    <div className="huge-num text-[clamp(120px,18vw,240px)]">
      {String(n).padStart(2, '0')}
    </div>
  </div>
);

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const slideIndex = useRef(0);

  useEffect(() => {
    const sections = gsap.utils.toArray('.slide') as HTMLElement[];

    gsap.set(sections, {
      yPercent: (i) => (i === 0 ? 0 : 100),
      zIndex: (i) => sections.length - i,
    });

    animateSlideIn(sections[0], SLIDE_VARIANTS[0] ?? 'fade-up', 0.25);

    const gotoSection = (index: number, direction: number) => {
      if (animating.current || index < 0 || index >= TOTAL_SLIDES) return;
      animating.current = true;

      const fromSection = sections[slideIndex.current];
      const toSection = sections[index];
      const dFactor = direction === 1 ? -1 : 1;

      gsap.to(fromSection, {
        yPercent: 100 * dFactor, scale: 0.96, duration: 0.9, ease: 'power3.inOut',
        onComplete: () => { gsap.set(fromSection, { scale: 1 }); },
      });
      gsap.set(toSection, { yPercent: -100 * dFactor, scale: 1 });
      gsap.to(toSection, {
        yPercent: 0, duration: 0.9, ease: 'power3.inOut',
        onComplete: () => {
          animating.current = false;
          slideIndex.current = index;
          setActiveSlide(index);
        },
      });

      animateSlideIn(toSection, SLIDE_VARIANTS[index] ?? 'fade-up', 0.45);
    };

    const handleInput = (direction: number) => {
      if (direction === 1 && slideIndex.current < TOTAL_SLIDES - 1) {
        gotoSection(slideIndex.current + 1, 1);
      } else if (direction === -1 && slideIndex.current > 0) {
        gotoSection(slideIndex.current - 1, -1);
      }
    };

    const observer = Observer.create({
      target: window, type: 'wheel,touch,pointer', wheelSpeed: -1,
      onDown: () => handleInput(1), onUp: () => handleInput(-1),
      tolerance: 20, preventDefault: true,
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') handleInput(1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') handleInput(-1);
    };

    (window as Window).__gotoSection = (i: number) => {
      const dir = i > slideIndex.current ? 1 : -1;
      gotoSection(i, dir);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => { observer.kill(); window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  const goTo = (i: number) => { (window as Window).__gotoSection?.(i); };
  const progressPct = ((activeSlide + 1) / TOTAL_SLIDES) * 100;

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-black text-white font-sans">
      {/* === HEADER FIXO === */}
      <div className="top-bar">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-neon to-brand-cyan flex items-center justify-center text-zinc-950 font-black text-sm">
            V
          </div>
          <div>
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-zinc-500">
              Visionário
            </div>
            <div className="text-xs font-semibold tracking-wide text-white">
              Beach Tennis OS
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
            {SLIDE_TITLES[activeSlide]}
          </span>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="font-mono text-xs text-brand-neon font-bold">
            {String(activeSlide + 1).padStart(2, '0')}
            <span className="text-zinc-600"> / {TOTAL_SLIDES}</span>
          </span>
        </div>

        <button
          onClick={() => goTo(Math.min(activeSlide + 1, TOTAL_SLIDES - 1))}
          className="hidden md:inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-zinc-400 hover:text-brand-neon transition-colors"
        >
          Próximo <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* === MARCA LATERAL === */}
      <div className="brand-mark hidden md:block">
        Fernando Almeida · 2026 · Visionário
      </div>

      {/* === DOTS LATERAIS === */}
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 z-[2000]">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i} onClick={() => goTo(i)}
            className={`block transition-all duration-300 rounded-full ${
              activeSlide === i
                ? 'w-1.5 h-6 bg-brand-neon shadow-[0_0_10px_rgba(74,222,128,0.7)]'
                : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ════════════ 1 — CAPA ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[1000] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" />
        <div className="glow-orb bg-brand-neon/20 w-[600px] h-[600px] -top-40 -left-40" />
        <div className="glow-orb bg-brand-cyan/15 w-[500px] h-[500px] bottom-[-120px] right-[-120px]" />

        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-7xl">
            <div className="animate-item section-marker mb-8">Apresentação · Maio 2026</div>

            <h1 className="animate-item font-display text-[clamp(56px,9.5vw,180px)] font-extrabold leading-[0.88] mb-6 tracking-[-0.045em]">
              Plataforma<br />
              <span className="text-gradient-green">de Gestão</span><br />
              <span className="text-zinc-400 font-light italic">para Arenas de</span><br />
              Beach Tennis<span className="text-brand-neon">.</span>
            </h1>

            <div className="animate-item flex flex-wrap items-center gap-3 mt-12">
              <span className="tag-chip">Multi-Arena</span>
              <span className="tag-chip cyan">Financeiro IA</span>
              <span className="tag-chip amber">Self-service</span>
            </div>

            <div className="animate-item flex items-end justify-between mt-16 max-w-5xl">
              <div className="text-zinc-400 text-sm leading-relaxed">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500 mb-2">
                  Apresentado por
                </div>
                <div className="text-white font-semibold text-lg">Fernando Almeida</div>
                <div className="text-zinc-500">Head de Tecnologia e IA · Five Franchising</div>
              </div>
              <div className="hidden md:flex flex-col items-end gap-2">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
                  Role para descobrir
                </div>
                <div className="w-[1px] h-16 bg-gradient-to-b from-brand-neon to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 2 — SOBRE MIM ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[990] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={2} label={SLIDE_TITLES[1]} />
        <div className="relative z-10 h-full flex items-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[0.9fr_1.4fr] gap-16 items-center">
            <div className="animate-item flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-neon to-brand-cyan rounded-full blur-2xl opacity-60" />
                <div className="relative w-52 h-52 rounded-full bg-gradient-to-br from-brand-neon to-emerald-700 flex items-center justify-center text-6xl font-extrabold text-zinc-950 font-display">
                  FA
                </div>
              </div>
              <h2 className="font-display text-3xl font-bold mb-2">Fernando Almeida</h2>
              <div className="section-marker text-[0.65rem] mt-1">Head Tech & IA</div>
              <div className="text-zinc-400 text-sm mt-2">Five Franchising</div>
            </div>
            <div>
              <div className="animate-item section-marker mb-5">Sobre mim</div>
              <p className="animate-item font-display text-3xl md:text-4xl text-zinc-100 leading-[1.18] font-medium mb-6 tracking-tight">
                Construo produtos que conectam <span className="text-gradient-green">tecnologia, IA e resultado</span> de negócio.
              </p>
              <p className="animate-item text-lg text-zinc-400 leading-relaxed mb-4">
                Mais de <span className="text-brand-neon font-semibold">10 anos de marketing</span> aliados à liderança de tecnologia. Atuo da{' '}
                <span className="text-gradient-green font-semibold">ideia à entrega</span> — estratégia, produto e operação.
              </p>
              <p className="animate-item text-lg text-zinc-400 leading-relaxed">
                Lidero a vertical de automações e IA no Networking dos Irmãos —{' '}
                <span className="text-brand-neon font-semibold">+2.000 profissionais</span> de marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 3 — NÚMEROS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[980] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" />
        <SlideMark n={3} label={SLIDE_TITLES[2]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Trajetória em números</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight max-w-3xl">
              Resultados que <span className="text-gradient-green">falam por si.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {[
                { value: '+100', label: 'Projetos entregues' },
                { value: '+20', label: 'Em operação' },
                { value: '+10', label: 'Anos em marketing' },
                { value: '+2k', label: 'Profissionais liderados' },
              ].map((s, i) => (
                <div key={s.label} className="animate-item glass-panel rounded-xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-brand-neon to-transparent" />
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-500 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-6xl font-extrabold text-gradient-green leading-none mb-3">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="animate-item glass-panel rounded-xl p-6 flex gap-4">
                <Building2 className="w-7 h-7 text-brand-neon flex-shrink-0 mt-1" />
                <div>
                  <div className="section-marker text-[0.65rem] mb-2">Five Franchising</div>
                  <p className="text-zinc-300 leading-relaxed">
                    Head de Tecnologia — estratégia técnica, produtos digitais e IA aplicada.
                  </p>
                </div>
              </div>
              <div className="animate-item glass-panel rounded-xl p-6 flex gap-4">
                <Handshake className="w-7 h-7 text-brand-cyan flex-shrink-0 mt-1" />
                <div>
                  <div className="section-marker text-[0.65rem] mb-2" style={{ color: '#22d3ee' }}>
                    Networking dos Irmãos
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Líder de Automações e IA na comunidade de +2.000 profissionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 4 — METODOLOGIA ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[970] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={4} label={SLIDE_TITLES[3]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Metodologia</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              Como eu <span className="text-gradient-green">trabalho.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {[
                { num: '01', title: 'Da ideia à entrega', desc: 'Da estratégia ao desenvolvimento — participo de toda a concepção do produto.', icon: <Workflow className="w-6 h-6" /> },
                { num: '02', title: 'Marketing + Tech', desc: '10+ anos de marketing aliados a IA — produtos que entendem o negócio.', icon: <Sparkles className="w-6 h-6" /> },
                { num: '03', title: 'Foco em ROI', desc: 'Cada feature responde a uma métrica de negócio — construo o que move o ponteiro.', icon: <Target className="w-6 h-6" /> },
              ].map((c) => (
                <div key={c.num} className="animate-item relative glass-panel rounded-xl p-7 group hover:border-brand-neon/30 transition-colors">
                  <div className="font-display text-7xl font-extrabold text-zinc-800 absolute -top-2 right-4 leading-none">
                    {c.num}
                  </div>
                  <div className="text-brand-neon mb-4 relative z-10">{c.icon}</div>
                  <h4 className="font-display text-xl font-bold mb-3 relative z-10">{c.title}</h4>
                  <p className="text-zinc-400 leading-relaxed text-sm relative z-10">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="animate-item border-l-2 border-brand-neon pl-6 max-w-4xl">
              <p className="font-display text-2xl md:text-3xl text-zinc-100 font-light leading-snug italic">
                "Tecnologia bem aplicada é a que{' '}
                <span className="text-gradient-green font-semibold not-italic">faz a empresa do cliente crescer</span>{' '}
                — não a que tem a stack mais bonita."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 5 — TRANSIÇÃO PARTE 02 ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[960] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 scan-lines" />
        <div className="glow-orb bg-brand-neon/20 w-[700px] h-[700px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
          <div className="huge-num font-display text-[clamp(280px,40vw,560px)] mr-[-60px] opacity-90">
            02
          </div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-5xl">
            <div className="animate-item section-marker mb-8">Parte Dois</div>
            <h1 className="animate-item font-display text-[clamp(72px,11vw,200px)] font-extrabold leading-[0.85] tracking-[-0.045em] mb-8">
              A solução<br />
              <span className="text-gradient-green">proposta.</span>
            </h1>
            <p className="animate-item text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              Plataforma de Gestão para Arenas de Beach Tennis — desenhada do zero para o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 6 — CENÁRIO ATUAL ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[950] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <div className="glow-orb bg-red-500/10 w-[400px] h-[400px] top-20 right-20" />
        <SlideMark n={6} label={SLIDE_TITLES[5]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item flex items-center gap-3 mb-4">
              <span className="tag-chip danger">
                <AlertCircle className="w-3 h-3" />
                Diagnóstico
              </span>
            </div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              O cenário atual <span className="text-gradient-warm">é caótico.</span>
            </h2>
            <p className="animate-item text-lg text-zinc-400 mb-12 max-w-3xl leading-relaxed">
              Arenas operam, hoje, com uma combinação fragmentada de ferramentas que não conversam:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <ClipboardList className="w-6 h-6" />, title: 'Agendamento', desc: 'Planilhas, cadernos físicos ou grupos de WhatsApp.' },
                { icon: <Banknote className="w-6 h-6" />, title: 'Cobrança', desc: 'Pix avulso, boletos manuais — sem reconciliação automática.' },
                { icon: <Repeat className="w-6 h-6" />, title: 'Reposições', desc: 'Controle manual sujeito a perdas e disputas com alunos.' },
                { icon: <BarChart3 className="w-6 h-6" />, title: 'Financeiro', desc: 'Excel sem visão consolidada quando há múltiplas arenas.' },
              ].map((c, i) => (
                <div key={c.title} className="animate-item relative cut-corner bg-zinc-900/60 border border-red-500/20 p-6 hover:border-red-400/40 transition-colors">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-3">
                    {String(i + 1).padStart(2, '0')} / 04
                  </div>
                  <div className="text-red-400 mb-3">{c.icon}</div>
                  <h4 className="font-display text-lg font-bold mb-2">{c.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 7 — CUSTO DA FRAGMENTAÇÃO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[940] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" style={{ filter: 'hue-rotate(-60deg)' }} />
        <SlideMark n={7} label={SLIDE_TITLES[6]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4" style={{ color: '#fbbf24' }}>
              Quanto custa
            </div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight max-w-4xl">
              O preço dessa <span className="text-gradient-warm">fragmentação.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {[
                { value: '8-15%', label: 'Inadimplência sobre faturamento' },
                { value: '2 dias', label: 'Para fechamento financeiro mensal' },
                { value: '~30%', label: 'Quadras ociosas em horários reativos' },
                { value: '+50%', label: 'Tempo do gestor em tarefas operacionais' },
              ].map((s, i) => (
                <div key={s.label} className="animate-item glass-panel rounded-xl p-7 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-red-400" />
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-500 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-5xl md:text-6xl font-extrabold text-gradient-warm leading-none mb-4">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="animate-item text-sm text-zinc-500 italic">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase mr-2">Nota</span>
              Estimativas de mercado — a serem validadas com dados reais da sua operação.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 8 — VISÃO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[930] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,_var(--tw-gradient-stops))] from-brand-neon/20 via-brand-black to-brand-black" />
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 md:px-24">
          <div className="animate-item section-marker mb-8">Nossa proposta de valor</div>
          <h1 className="animate-item font-display text-[clamp(48px,8vw,140px)] font-extrabold leading-[0.95] tracking-[-0.045em] max-w-6xl mb-10">
            Tornar a operação<br />
            tão simples quanto<br />
            <span className="text-gradient-green italic">agendar uma aula.</span>
          </h1>
          <p className="animate-item text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            Um único sistema que conecta gestão multi-arena, financeiro automatizado e autonomia do aluno
            em uma experiência fluida — web e mobile.
          </p>
          <div className="animate-item flex items-center gap-2 mt-10 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
            Continue rolando para os módulos
          </div>
        </div>
      </section>

      {/* ════════════ 9 — 7 MÓDULOS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[920] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={9} label={SLIDE_TITLES[8]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">A plataforma</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-10 tracking-tight">
              Sete módulos. <span className="text-gradient-green">Um sistema.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: <Building2 className="w-5 h-5" />, title: 'Multi-Arena', desc: 'Gestão centralizada por unidade.' },
                { icon: <Wallet className="w-5 h-5" />, title: 'Financeiro', desc: 'Fluxo de caixa e DRE consolidado.' },
                { icon: <Users className="w-5 h-5" />, title: 'Alunos', desc: 'Cadastro, planos, presença.' },
                { icon: <CreditCard className="w-5 h-5" />, title: 'Cobrança', desc: 'Recorrência via Asaas.' },
                { icon: <Calendar className="w-5 h-5" />, title: 'Agendamento', desc: 'Calendário visual por quadra.' },
                { icon: <Repeat className="w-5 h-5" />, title: 'Reposição', desc: 'Crédito automático com regras.' },
                { icon: <Smartphone className="w-5 h-5" />, title: 'Portal Aluno', desc: 'Self-service total.' },
                { icon: <Zap className="w-5 h-5" />, title: 'Integrado', desc: 'Tudo conversa, em tempo real.', highlight: true },
              ].map((m, i) => (
                <div
                  key={m.title}
                  className={`animate-item relative p-5 rounded-xl transition-all hover:-translate-y-1 ${
                    m.highlight
                      ? 'bg-gradient-to-br from-brand-neon/15 to-brand-cyan/5 border border-brand-neon/40 shadow-[0_0_30px_rgba(74,222,128,0.15)]'
                      : 'glass-panel hover:border-brand-neon/25'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={m.highlight ? 'text-brand-neon' : 'text-brand-neon'}>{m.icon}</div>
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] text-zinc-600">
                      M{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className={`font-display text-base font-bold mb-1 ${m.highlight ? 'text-brand-neon' : 'text-white'}`}>
                    {m.title}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 10 — MULTI-ARENA ════════════ */}
      <ModuleSlide
        zIndex={910} bg="bg-brand-black" n={10} label={SLIDE_TITLES[9]} moduleNum="01"
        title={<>Gestão <span className="text-gradient-green">Multi-Arena</span></>}
        bullets={[
          'Cadastro ilimitado de arenas com regras próprias',
          'Dashboard consolidado com KPIs por unidade',
          'Permissões granulares por arena e perfil',
          'Comparativo de performance entre unidades',
        ]}
        imageSrc="/images/dashboard.png" imageOnRight={false}
      />

      {/* ════════════ 11 — FINANCEIRO ════════════ */}
      <ModuleSlide
        zIndex={900} bg="bg-brand-dark" n={11} label={SLIDE_TITLES[10]} moduleNum="02" tagVariant="cyan"
        title={<>Financeiro & <span className="text-gradient-green">Fluxo de Caixa</span></>}
        bullets={[
          'Fluxo de caixa diário, semanal e mensal por arena',
          'DRE simplificado consolidado e por unidade',
          'Centro de custos e categorização',
          'Conciliação automática via webhook Asaas',
          'Indicadores: ticket médio, LTV, inadimplência, ocupação',
        ]}
        imageOnRight
        mockup={
          <div className="rounded-xl overflow-hidden border border-white/10 glass-panel p-7">
            <div className="aspect-[16/10] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-zinc-500 uppercase">
                  Fluxo · Maio 2026
                </span>
                <BarChart3 className="w-4 h-4 text-brand-neon" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { l: 'Receita', v: 'R$ 184k', c: 'text-brand-neon' },
                  { l: 'Despesa', v: 'R$ 92k', c: 'text-red-300' },
                  { l: 'Líquido', v: 'R$ 92k', c: 'text-white' },
                ].map((x) => (
                  <div key={x.l} className="rounded-lg bg-zinc-800/50 p-3">
                    <div className="text-[0.6rem] uppercase tracking-wider text-zinc-500 mb-1">{x.l}</div>
                    <div className={`font-display text-xl font-bold ${x.c}`}>{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-lg bg-zinc-800/30 p-3 flex items-end gap-1.5">
                {[40, 65, 50, 78, 55, 90, 72, 85, 60, 95, 70, 88].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-neon to-brand-cyan" style={{ height: `${h}%`, opacity: 0.4 + i * 0.05 }} />
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ════════════ 12 — ALUNOS ════════════ */}
      <ModuleSlide
        zIndex={890} bg="bg-brand-black" n={12} label={SLIDE_TITLES[11]} moduleNum="03"
        title={<>Gestão de <span className="text-gradient-green">Alunos</span></>}
        bullets={[
          'Cadastro completo + vínculo com turma e professor',
          'Planos: mensal, trimestral, pacote, day-use',
          'Histórico de presença, reposições e pagamentos',
          'Régua de relacionamento (boas-vindas, aniversário, recuperação)',
          'Score de risco de churn por aluno',
        ]}
        imageOnRight={false}
        mockup={
          <div className="rounded-xl border border-white/10 glass-panel p-7 aspect-[5/4]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-neon" />
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-zinc-500 uppercase">
                  Alunos ativos · 312
                </span>
              </div>
              <span className="font-mono text-xs text-brand-neon">+18%</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Mariana Silva', plan: 'Mensal · 2x', risk: 'Em dia', s: 'green' },
                { name: 'Carlos Mendes', plan: 'Pacote 8 aulas', risk: 'Renovar', s: 'amber' },
                { name: 'Juliana Rocha', plan: 'Trimestral', risk: 'Em dia', s: 'green' },
                { name: 'Rafael Costa', plan: 'Day-use', risk: 'Em dia', s: 'green' },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-3 rounded-lg bg-zinc-800/40 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-neon to-emerald-700 flex items-center justify-center text-zinc-950 font-bold text-sm">
                    {a.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{a.name}</div>
                    <div className="text-[0.65rem] text-zinc-500">{a.plan}</div>
                  </div>
                  <span className={`text-[0.6rem] px-2 py-0.5 rounded font-mono uppercase tracking-wider ${
                    a.s === 'green' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                  }`}>
                    {a.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ════════════ 13 — COBRANÇA ════════════ */}
      <ModuleSlide
        zIndex={880} bg="bg-brand-dark" n={13} label={SLIDE_TITLES[12]} moduleNum="04"
        title={<>Cobrança via <span className="text-gradient-green">Asaas</span></>}
        bullets={[
          'Recorrência automática a partir do plano do aluno',
          'Pix, boleto e cartão (parcelamento e recorrência)',
          'Régua de cobrança automática (lembrete, atraso, segunda via)',
          'Baixa automática via webhook',
          'Negativação opcional para inadimplentes crônicos',
        ]}
        imageOnRight
        mockup={
          <div className="rounded-xl border border-white/10 glass-panel p-7 aspect-[5/4]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-neon" />
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-zinc-500 uppercase">
                  Cobranças · Asaas
                </span>
              </div>
              <span className="font-mono text-xs text-brand-neon">95% baixa</span>
            </div>
            <div className="space-y-2">
              {[
                { l: 'Pix · Mariana Silva', v: 'R$ 280', s: 'Pago', c: 'emerald' },
                { l: 'Cartão · Rafael Costa', v: 'R$ 380', s: 'Pago', c: 'emerald' },
                { l: 'Boleto · Pedro Lima', v: 'R$ 240', s: 'Atraso', c: 'amber' },
                { l: 'Pix · Juliana Rocha', v: 'R$ 320', s: 'Pago', c: 'emerald' },
                { l: 'Pix · Lucas Dias', v: 'R$ 280', s: 'Pendente', c: 'zinc' },
              ].map((c) => (
                <div key={c.l} className="flex items-center justify-between rounded-lg bg-zinc-800/40 px-3 py-2.5 text-sm">
                  <div className="text-zinc-200">{c.l}</div>
                  <div className="flex items-center gap-2">
                    <div className="font-display font-bold text-brand-neon">{c.v}</div>
                    <span className={`text-[0.6rem] px-2 py-0.5 rounded font-mono uppercase tracking-wider ${
                      c.c === 'emerald' ? 'bg-emerald-500/15 text-emerald-300'
                        : c.c === 'amber' ? 'bg-amber-500/15 text-amber-300'
                        : 'bg-zinc-500/15 text-zinc-300'
                    }`}>
                      {c.s}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ════════════ 14 — AGENDAMENTO ════════════ */}
      <ModuleSlide
        zIndex={870} bg="bg-brand-black" n={14} label={SLIDE_TITLES[13]} moduleNum="05" tagVariant="cyan"
        title={<>Agendamento & <span className="text-gradient-green">Reservas</span></>}
        bullets={[
          'Calendário visual por quadra (dia/semana/mês)',
          'Reserva para aulas regulares, avulsas e day-use',
          'Bloqueio de horários (manutenção, evento, clima)',
          'Lista de espera automática',
          'Notificações 24h e 2h antes',
        ]}
        imageOnRight={false}
        mockup={
          <div className="rounded-xl border border-white/10 glass-panel p-6 aspect-[5/4]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-neon" />
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-zinc-500 uppercase">
                  Sex 14/05 · Quadras
                </span>
              </div>
              <span className="font-mono text-xs text-brand-neon">87% ocup.</span>
            </div>
            <div className="grid grid-cols-[40px_1fr_1fr_1fr] gap-2 text-xs">
              <div />
              <div className="text-center text-zinc-500 pb-2 font-mono text-[0.65rem]">Q1</div>
              <div className="text-center text-zinc-500 pb-2 font-mono text-[0.65rem]">Q2</div>
              <div className="text-center text-zinc-500 pb-2 font-mono text-[0.65rem]">Q3</div>
              {['07h', '08h', '09h', '18h', '19h', '20h', '21h'].flatMap((h, row) => [
                <div key={`h-${h}`} className="text-zinc-500 py-1.5 font-mono text-[0.65rem]">{h}</div>,
                ...[0, 1, 2].map((col) => {
                  const filled = (row + col) % 4 !== 1;
                  return (
                    <div key={`${h}-${col}`} className={`h-7 rounded ${
                      filled
                        ? 'bg-gradient-to-br from-brand-neon/35 to-brand-cyan/20 border border-brand-neon/40'
                        : 'bg-zinc-800/40 border border-white/5'
                    }`} />
                  );
                }),
              ])}
            </div>
          </div>
        }
      />

      {/* ════════════ 15 — REPOSIÇÃO ════════════ */}
      <ModuleSlide
        zIndex={860} bg="bg-brand-dark" n={15} label={SLIDE_TITLES[14]} moduleNum="06"
        title={<>Reposição de <span className="text-gradient-green">Aulas</span></>}
        bullets={[
          'Registro de falta com regra de antecedência configurável',
          'Crédito de reposição automático',
          'Aluno escolhe horário disponível sem intervenção da recepção',
          'Auditoria completa: quem faltou, repôs e saldo',
          'Política configurável por arena (limite, validade)',
        ]}
        imageOnRight
        mockup={
          <div className="rounded-xl border border-white/10 glass-panel p-7 aspect-[5/4]">
            <div className="flex items-center gap-2 mb-5">
              <Repeat className="w-4 h-4 text-brand-neon" />
              <span className="font-mono text-[0.6rem] tracking-[0.25em] text-zinc-500 uppercase">
                Reposições · Mariana Silva
              </span>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-brand-neon/10 to-brand-cyan/5 border border-brand-neon/20 p-5 mb-4 flex items-center justify-between">
              <div>
                <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500 mb-1">Saldo</div>
                <div className="font-display text-4xl font-extrabold text-gradient-green">02</div>
              </div>
              <div className="text-right">
                <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500 mb-1">Validade</div>
                <div className="text-sm text-zinc-300 font-semibold">30 dias</div>
              </div>
            </div>
            <div className="space-y-1.5">
              {[
                { d: '12/05 · 19h', q: 'Q2 · Prof. Lucas', s: 'Confirmada' },
                { d: '08/05 · 20h', q: 'Q1 · Prof. Lucas', s: 'Realizada' },
                { d: '03/05 · 18h', q: 'Q3 · Prof. Camila', s: 'Realizada' },
              ].map((r) => (
                <div key={r.d} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-3 py-2 text-sm">
                  <div>
                    <div className="font-semibold text-xs">{r.d}</div>
                    <div className="text-[0.65rem] text-zinc-500">{r.q}</div>
                  </div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-wider text-brand-neon">{r.s}</span>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ════════════ 16 — PORTAL ALUNO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[850] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" />
        <SlideMark n={16} label={SLIDE_TITLES[15]} />
        <div className="relative z-10 h-full flex items-center px-12 md:px-24">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-item relative flex justify-center h-[560px]">
              <div className="absolute w-80 h-80 bg-brand-neon/25 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl top-1/3 left-1/2 transform -translate-x-1/2" />
              <img src="/images/mobile.png" alt="Portal do Aluno" className="h-full object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(74,222,128,0.3)]" />
            </div>
            <div>
              <div className="animate-item flex items-center gap-3 mb-5">
                <span className="tag-chip">Módulo 07</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Mobile-first</span>
              </div>
              <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.05]">
                Portal do <span className="text-gradient-green">Aluno.</span>
              </h2>
              <p className="animate-item text-lg text-zinc-400 mb-8 leading-relaxed max-w-md">
                Dê poder ao seu aluno e reduza o tempo da recepção em até{' '}
                <span className="text-brand-neon font-semibold">70%.</span>
              </p>
              <ul className="space-y-3">
                {[
                  'Login simples (e-mail/celular)',
                  'Próximas aulas e saldo de reposições',
                  'Agendamento e reposição self-service',
                  'Faturas em aberto e segunda via',
                  'Notificações push, WhatsApp e e-mail',
                ].map((t) => (
                  <li key={t} className="animate-item flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-neon flex-shrink-0 mt-1" />
                    <span className="text-zinc-300">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 17 — ANTES vs DEPOIS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[840] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={17} label={SLIDE_TITLES[16]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Comparativo</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-10 tracking-tight">
              Antes <span className="text-zinc-500 font-light">vs</span>{' '}
              <span className="text-gradient-green">depois.</span>
            </h2>
            <div className="overflow-hidden rounded-xl glass-panel border border-white/10">
              <div className="grid grid-cols-3 px-6 py-4 border-b border-white/10">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Hoje</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-neon">Com a plataforma</div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-brand-cyan text-right">Ganho</div>
              </div>
              {[
                ['Cobrança manual de mensalidades', 'Recorrência automática + régua Asaas', '−30 a 50% inadimplência'],
                ['Agendamento por WhatsApp', 'Self-service no portal do aluno', '−70% tempo da recepção'],
                ['Reposição em caderno', 'Crédito automático com regras', 'Zero conflitos'],
                ['Fechamento financeiro de 2 dias', 'Conciliação automática + DRE em tempo real', '2 dias → minutos'],
                ['Visão fragmentada das arenas', 'Dashboard multi-arena consolidado', 'Decisão por dado'],
              ].map((row, i) => (
                <div key={i} className="animate-item grid grid-cols-3 px-6 py-4 border-b border-white/5 last:border-b-0 hover:bg-brand-neon/5 transition group">
                  <div className="text-zinc-500 text-sm flex items-start gap-3">
                    <span className="font-mono text-[0.6rem] text-zinc-700 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <span>{row[0]}</span>
                  </div>
                  <div className="text-zinc-200 text-sm">{row[1]}</div>
                  <div className="text-right font-display font-bold text-brand-neon">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 18 — PERFORMANCE ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[830] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" />
        <SlideMark n={18} label={SLIDE_TITLES[17]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Performance</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              Confiabilidade <span className="text-gradient-green">enterprise.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {[
                { value: '<2s', label: 'Carregamento em 4G', icon: <Zap className="w-5 h-5" /> },
                { value: '10k+', label: 'Alunos sem degradação', icon: <Users className="w-5 h-5" /> },
                { value: '99.5%', label: 'Disponibilidade SLA', icon: <TrendingUp className="w-5 h-5" /> },
                { value: 'LGPD', label: 'Criptografia + 2FA', icon: <Shield className="w-5 h-5" /> },
              ].map((s, i) => (
                <div key={s.label} className="animate-item glass-panel rounded-xl p-6 relative">
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-brand-neon to-transparent" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-brand-neon">{s.icon}</div>
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] text-zinc-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient-green leading-none mb-3">
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="animate-item text-zinc-400 max-w-2xl">
              Arquitetura escalável horizontalmente, com integração nativa ao{' '}
              <span className="text-brand-neon font-semibold">Asaas</span> e{' '}
              <span className="text-brand-neon font-semibold">WhatsApp Business</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 19 — KPIs DE SUCESSO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[820] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={19} label={SLIDE_TITLES[18]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">KPIs do projeto</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              Métricas de <span className="text-gradient-green">sucesso.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  label: 'Do produto', accent: 'brand-neon', icon: <LayoutDashboard className="w-5 h-5" />,
                  items: [
                    '≥ 70% dos alunos logando 1x/mês',
                    '≥ 60% das aulas agendadas pelo aluno em 6 meses',
                    '≥ 95% das cobranças baixadas automaticamente',
                  ],
                },
                {
                  label: 'Do negócio', accent: 'brand-cyan', icon: <TrendingUp className="w-5 h-5" />,
                  items: [
                    '−30% de inadimplência em 90 dias',
                    '+15% de ocupação das quadras',
                    '−50% do tempo administrativo do gestor',
                  ],
                },
              ].map((g) => (
                <div key={g.label} className="animate-item glass-panel rounded-xl p-7 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: g.accent === 'brand-neon' ? 'linear-gradient(90deg, #4ade80, transparent)' : 'linear-gradient(90deg, #22d3ee, transparent)' }}
                  />
                  <div className="flex items-center gap-3 mb-6">
                    <div style={{ color: g.accent === 'brand-neon' ? '#4ade80' : '#22d3ee' }}>{g.icon}</div>
                    <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase font-bold"
                      style={{ color: g.accent === 'brand-neon' ? '#4ade80' : '#22d3ee' }}
                    >
                      {g.label}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: g.accent === 'brand-neon' ? '#4ade80' : '#22d3ee' }} />
                        <span className="text-zinc-300">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 20 — ROADMAP ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[810] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask" />
        <SlideMark n={20} label={SLIDE_TITLES[19]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Cronograma</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              Roadmap <span className="text-gradient-green">proposto.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  phase: 'Fase 01', period: '0–3 meses', title: 'MVP', accent: '#4ade80',
                  items: ['Cadastro multi-arena, alunos, planos', 'Agendamento de aulas e quadras', 'Integração Asaas (recorrência + conciliação)', 'Portal do aluno (agendar, repor, pagar)', 'Fluxo de caixa básico'],
                },
                {
                  phase: 'Fase 02', period: '3–6 meses', title: 'Consolidação', accent: '#22d3ee',
                  items: ['Dashboard multi-arena consolidado', 'Régua de cobrança avançada', 'Integração WhatsApp Business', 'Relatórios gerenciais', 'App mobile nativo'],
                },
                {
                  phase: 'Fase 03', period: '6–12 meses', title: 'Escala', accent: '#a78bfa',
                  items: ['Score de churn e retenção', 'Split de pagamento p/ professores', 'Marketplace de torneios', 'Integrações contábeis', 'BI avançado e IA preditiva'],
                },
              ].map((p) => (
                <div key={p.title} className="animate-item glass-panel rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: p.accent }} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase font-bold" style={{ color: p.accent }}>
                      {p.phase}
                    </span>
                    <span className="font-mono text-[0.6rem] text-zinc-500">{p.period}</span>
                  </div>
                  <h4 className="font-display text-3xl font-bold mb-5">{p.title}</h4>
                  <ul className="space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="mt-0.5" style={{ color: p.accent }}>▸</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 21 — PRÓXIMOS PASSOS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[800] bg-brand-dark bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-grid-fine" />
        <SlideMark n={21} label={SLIDE_TITLES[20]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item section-marker mb-4">Como começar</div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              Próximos <span className="text-gradient-green">passos.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { num: '01', title: 'Validação do PRD', desc: 'Alinhamento de escopo e prioridades.' },
                { num: '02', title: 'Workshop de descoberta', desc: 'Mapear regras das suas arenas.' },
                { num: '03', title: 'Aprovação do MVP', desc: 'Cronograma definitivo.' },
                { num: '04', title: 'Setup de ambiente', desc: 'Início do desenvolvimento.' },
              ].map((p) => (
                <div key={p.num} className="animate-item relative glass-panel rounded-xl p-6 hover:-translate-y-1 transition-all hover:border-brand-neon/30">
                  <div className="font-display text-6xl font-extrabold text-zinc-800 leading-none mb-4 absolute -top-2 right-3">
                    {p.num}
                  </div>
                  <div className="relative z-10 mt-8">
                    <h4 className="font-display font-bold mb-2">{p.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="animate-item border-l-2 border-brand-neon pl-6 max-w-4xl">
              <p className="font-display text-2xl md:text-3xl text-zinc-100 font-light leading-snug">
                Pronto para transformar a gestão das suas arenas em uma{' '}
                <span className="text-gradient-green font-semibold">vantagem competitiva?</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 22 — CONTATO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[790] bg-brand-black bg-noise overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,_var(--tw-gradient-stops))] from-brand-neon/15 via-brand-black to-brand-black" />
        <div className="absolute inset-0 bg-grid bg-grid-radial-mask opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 md:px-24">
          <div className="animate-item section-marker mb-8">Vamos conversar</div>
          <h1 className="animate-item font-display text-[clamp(80px,14vw,240px)] font-extrabold leading-[0.85] tracking-[-0.045em] mb-10">
            <span className="text-gradient-green">Obrigado.</span>
          </h1>
          <div className="animate-item text-2xl text-zinc-200 font-display font-semibold mb-1">
            Fernando Almeida
          </div>
          <div className="animate-item font-mono text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500 mb-10">
            Head de Tecnologia e IA · Five Franchising
          </div>
          <div className="animate-item flex flex-wrap justify-center gap-3 mb-12">
            <div className="flex items-center gap-2 glass-panel px-5 py-3 rounded-lg border border-brand-neon/20">
              <Mail className="w-4 h-4 text-brand-neon" />
              <span className="text-sm text-zinc-300">contato@fernandoalmeida.dev</span>
            </div>
            <div className="flex items-center gap-2 glass-panel px-5 py-3 rounded-lg border border-brand-neon/20">
              <Phone className="w-4 h-4 text-brand-neon" />
              <span className="text-sm text-zinc-300">+55 00 00000-0000</span>
            </div>
            <div className="flex items-center gap-2 glass-panel px-5 py-3 rounded-lg border border-brand-neon/20">
              <LinkedinIcon className="w-4 h-4 text-brand-neon" />
              <span className="text-sm text-zinc-300">linkedin.com/in/seu-perfil</span>
            </div>
          </div>
          <button className="animate-item group inline-flex items-center gap-3 bg-brand-neon hover:bg-emerald-400 text-zinc-950 font-display font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(74,222,128,0.5)]">
            <Rocket className="w-5 h-5" />
            Iniciar Projeto MVP
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}

/** Slide reutilizável para módulos */
function ModuleSlide({
  zIndex, bg, n, label, moduleNum, title, bullets, imageSrc, mockup, imageOnRight = true, tagVariant,
}: {
  zIndex: number; bg: string; n: number; label: string; moduleNum: string;
  title: React.ReactNode; bullets: string[]; imageSrc?: string; mockup?: React.ReactNode;
  imageOnRight?: boolean; tagVariant?: 'cyan' | 'amber';
}) {
  const visual = imageSrc ? (
    <div className="animate-item relative rounded-2xl overflow-hidden border border-white/10 group shadow-[0_30px_80px_rgba(74,222,128,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/15 via-transparent to-brand-cyan/10 group-hover:opacity-0 transition-opacity z-10" />
      <img src={imageSrc} alt="" className="w-full h-auto block" />
    </div>
  ) : (
    <div className="animate-item">{mockup}</div>
  );

  const text = (
    <div>
      <div className="animate-item flex items-center gap-3 mb-5">
        <span className={`tag-chip ${tagVariant || ''}`}>Módulo {moduleNum}</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
          M{moduleNum} / 07
        </span>
      </div>
      <h2 className="animate-item font-display text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.05]">
        {title}
      </h2>
      <ul className="space-y-3">
        {bullets.map((t) => (
          <li key={t} className="animate-item flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand-neon flex-shrink-0 mt-1" />
            <span className="text-zinc-300">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      className={`slide absolute inset-0 w-full h-full ${bg} bg-noise overflow-hidden`}
      style={{ zIndex }}
    >
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <SlideMark n={n} label={label} />
      <div className="relative z-10 h-full flex items-center px-12 md:px-24">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          {imageOnRight ? (
            <>
              {text}
              {visual}
            </>
          ) : (
            <>
              {visual}
              {text}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

declare global {
  interface Window {
    __gotoSection?: (i: number) => void;
  }
}

export default App;
