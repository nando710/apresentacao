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
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  DashboardMockup,
  FinancialMockup,
  StudentsMockup,
  BillingMockup,
  CalendarMockup,
  MakeupMockup,
  PhoneMockup,
  DashboardMobileMockup,
  FinancialMobileMockup,
  StudentsMobileMockup,
  BillingMobileMockup,
  CalendarMobileMockup,
  MakeupMobileMockup,
  DeviceSwitcher,
} from './mockups';
import { WaveBackground } from '@/components/ui/wave-background';

gsap.registerPlugin(Observer);

const TOTAL_SLIDES = 23;

const LinkedinIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

type AnimVariant =
  | 'fade-up' | 'from-left' | 'from-right' | 'from-bottom'
  | 'scale-up' | 'blur-in' | 'rotate-in' | 'cascade';

const SLIDE_VARIANTS: AnimVariant[] = [
  'blur-in', 'from-left', 'scale-up', 'from-bottom', 'rotate-in',
  'from-right', 'scale-up', 'blur-in', 'cascade', 'from-right',
  'from-left', 'from-right', 'from-left', 'from-right', 'from-left',
  'from-right', 'from-bottom', 'scale-up', 'cascade', 'from-bottom',
  'scale-up', 'cascade', 'blur-in',
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
  'cascade':     { from: { y: 60, opacity: 0, scale: 0.9 }, to: { y: 0, opacity: 1, scale: 1 }, duration: 0.85, stagger: 0.06, ease: 'back.out(1.4)' },
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
  'Performance', 'Métricas', 'Roadmap', 'Investimento', 'Próximos passos', 'Contato',
];

/* —— Componentes minimalistas —— */
const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-mono text-[0.65rem] tracking-[0.32em] uppercase text-zinc-500 font-medium ${className}`}>
    {children}
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-700/80 text-[0.62rem] font-mono uppercase tracking-[0.22em] text-zinc-400 font-medium">
    <span className="w-1 h-1 rounded-full bg-zinc-500" />
    {children}
  </span>
);

const SmallNum = ({ n, label }: { n: number; label: string }) => (
  <div className="pointer-events-none absolute right-7 top-7 z-10 text-right">
    <Eyebrow>{label}</Eyebrow>
    <div className="font-display text-[clamp(80px,11vw,140px)] font-semibold text-zinc-900 leading-[0.85] mt-1 tracking-[-0.04em]">
      {String(n).padStart(2, '0')}
    </div>
  </div>
);

const Divider = () => <div className="h-px w-full bg-zinc-800/80" />;

/* ════════ ROADMAP TIMELINE 45 dias ════════ */
type Sprint = {
  num: string;
  title: string;
  startDay: number;
  endDay: number;
  pct: number;
  deliverables: string[];
};

const SPRINTS: Sprint[] = [
  { num: '01', title: 'Descoberta', startDay: 1, endDay: 14, pct: 30, deliverables: ['Workshop & PRD', 'Setup ambientes', 'Identidade visual', 'Modelagem de dados'] },
  { num: '02', title: 'Core Backend', startDay: 15, endDay: 28, pct: 30, deliverables: ['API & Autenticação', 'Multi-arena & permissões', 'Cadastro & planos', 'Integração Asaas'] },
  { num: '03', title: 'Frontend', startDay: 29, endDay: 35, pct: 16, deliverables: ['Dashboard gestor', 'Agendamento de quadras', 'Portal do aluno', 'Sistema de reposição'] },
  { num: '04', title: 'Integrações', startDay: 36, endDay: 42, pct: 16, deliverables: ['WhatsApp Business', 'Notificações push', 'Régua de cobrança', 'Relatórios'] },
  { num: '05', title: 'Go-Live', startDay: 43, endDay: 45, pct: 8, deliverables: ['Migração de dados', 'Treinamento equipe', 'Deploy produção', 'Acompanhamento ativo'] },
];

function RoadmapTimeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((s) => (s + 1) % SPRINTS.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  const current = SPRINTS[active];
  // Posição do cursor (centro do sprint atual sobre 45 dias)
  const cursorPct = ((current.startDay + current.endDay) / 2 / 45) * 100;

  const dayMarkers = [1, 7, 14, 21, 28, 35, 42, 45];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
    >
      {/* Gantt timeline */}
      <div className="rounded-2xl border border-white/10 bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-5 mb-5">
        {/* Cabeçalho de dias */}
        <div className="grid grid-cols-[88px_1fr] gap-3 mb-2">
          <div className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-zinc-500">Dia</div>
          <div className="relative h-4">
            {dayMarkers.map((d) => (
              <div
                key={d}
                className="absolute text-[0.55rem] font-mono text-zinc-500 -translate-x-1/2"
                style={{ left: `${(d / 45) * 100}%` }}
              >
                D{String(d).padStart(2, '0')}
              </div>
            ))}
            {/* Marca "HOJE" no início */}
            <div className="absolute top-3 left-0 -translate-x-1/2">
              <span className="text-[0.5rem] font-mono uppercase tracking-widest text-blue-300">Hoje</span>
            </div>
          </div>
        </div>

        {/* Linhas de grade */}
        <div className="grid grid-cols-[88px_1fr] gap-3">
          <div />
          <div className="relative h-px bg-zinc-800 mb-1">
            {dayMarkers.map((d) => (
              <div
                key={d}
                className="absolute top-0 w-px h-1.5 bg-zinc-800"
                style={{ left: `${(d / 45) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Sprint bars */}
        <div className="space-y-2 relative">
          {SPRINTS.map((s, i) => (
            <div
              key={s.num}
              onMouseEnter={() => setActive(i)}
              className="grid grid-cols-[88px_1fr] gap-3 items-center cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full transition-all ${active === i ? 'bg-[#1f3dbc] shadow-[0_0_8px_rgba(31,61,188,0.7)]' : 'bg-zinc-700'}`} />
                <span className={`font-mono text-[0.6rem] tracking-wider transition-colors ${active === i ? 'text-white font-semibold' : 'text-zinc-500'}`}>
                  Sprint {s.num}
                </span>
              </div>
              <div className="relative h-7">
                <div
                  className={`absolute top-0 h-full rounded-md flex items-center px-2 transition-all duration-500 ${
                    active === i
                      ? 'bg-[#1f3dbc] shadow-[0_0_18px_rgba(31,61,188,0.55)] z-10'
                      : 'bg-zinc-800/80 hover:bg-zinc-700'
                  }`}
                  style={{
                    left: `${((s.startDay - 1) / 45) * 100}%`,
                    width: `${((s.endDay - s.startDay + 1) / 45) * 100}%`,
                  }}
                >
                  <span className={`text-[0.6rem] font-mono uppercase tracking-wider truncate ${active === i ? 'text-white font-semibold' : 'text-zinc-300'}`}>
                    {s.title}
                  </span>
                  <span className={`ml-auto text-[0.55rem] font-mono tabular-nums ${active === i ? 'text-blue-100' : 'text-zinc-500'}`}>
                    D{String(s.startDay).padStart(2, '0')}–D{String(s.endDay).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Cursor vertical animado */}
          <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(88px + 12px + ${cursorPct}% * (100% - 100px) / 100)` }}>
            <div className="relative w-px h-full bg-gradient-to-b from-[#1f3dbc] via-[#22d3ee] to-transparent">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>

        {/* Marcador 45 dias / entrega final */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[0.6rem] font-mono uppercase tracking-widest">
          <span className="text-zinc-500">D01 · Início</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" />
            <span className="text-blue-300">{paused ? 'Pausado · hover' : `Sprint ${current.num} ativo`}</span>
          </div>
          <span className="text-blue-300 font-semibold">D45 · Entrega</span>
        </div>
      </div>

      {/* Sprint cards detalhados */}
      <div className="grid grid-cols-5 gap-2">
        {SPRINTS.map((s, i) => (
          <div
            key={s.num}
            onMouseEnter={() => setActive(i)}
            className={`rounded-xl border p-3 cursor-pointer transition-all duration-500 ${
              active === i
                ? 'border-[#1f3dbc]/60 bg-[#1f3dbc]/[0.10] scale-[1.04] shadow-[0_8px_28px_rgba(31,61,188,0.25)]'
                : 'border-white/10 bg-[rgba(15,15,20,0.55)] backdrop-blur-md hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-mono text-[0.55rem] uppercase tracking-widest ${active === i ? 'text-blue-300' : 'text-zinc-500'}`}>
                Sprint {s.num}
              </span>
              <span className="font-mono text-[0.5rem] text-zinc-600 tabular-nums">
                {s.endDay - s.startDay + 1}d
              </span>
            </div>
            <h5 className={`font-display text-sm font-semibold mb-2 tracking-tight ${active === i ? 'text-white' : 'text-zinc-300'}`}>
              {s.title}
            </h5>
            <ul className="space-y-1">
              {s.deliverables.map((d) => (
                <li key={d} className={`text-[0.55rem] flex items-start gap-1 ${active === i ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  <span className={active === i ? 'text-[#1f3dbc]' : 'text-zinc-600'}>▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPrices, setShowPrices] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const slideIndex = useRef(0);

  useEffect(() => {
    // —— Anima orbes do background ambiente
    const orbs = ambientRef.current?.querySelectorAll('.ambient-orb') ?? [];
    const orbConfigs = [
      { x: '35vw', y: '40vh', dur: 28 },
      { x: '-30vw', y: '-25vh', dur: 34 },
      { x: '20vw', y: '-30vh', dur: 40 },
    ];
    orbs.forEach((orb, i) => {
      const cfg = orbConfigs[i] ?? orbConfigs[0];
      gsap.to(orb, {
        x: cfg.x, y: cfg.y, duration: cfg.dur,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    });

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
        yPercent: 100 * dFactor, scale: 0.97, duration: 0.9, ease: 'power3.inOut',
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
      if (direction === 1 && slideIndex.current < TOTAL_SLIDES - 1) gotoSection(slideIndex.current + 1, 1);
      else if (direction === -1 && slideIndex.current > 0) gotoSection(slideIndex.current - 1, -1);
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
    <>
      {/* === WAVE BACKGROUND (Three.js) — sibling fora do container === */}
      <WaveBackground intensity={0.5} bloomStrength={0.5} opacity={0.7} speed={0.55} />

      {/* === Vinheta para legibilidade dos slides === */}
      <div
        aria-hidden
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(7,9,13,0) 0%, rgba(7,9,13,0.35) 55%, rgba(7,9,13,0.7) 100%)',
        }}
      />

      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-transparent text-white font-sans antialiased">

        {/* Mantém referência ao ambientRef sem renderizar */}
        <div ref={ambientRef} className="hidden" aria-hidden="true" />

      {/* === BARRA DE PROGRESSO INFERIOR === */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1500] hidden md:flex items-center gap-4 pointer-events-none">
        <div className="flex items-center gap-3 rounded-full px-4 py-2 backdrop-blur-md border border-white/10 bg-[rgba(15,15,20,0.55)] pointer-events-auto">
          <Eyebrow>{SLIDE_TITLES[activeSlide]}</Eyebrow>
          <div className="h-[1px] w-44 bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#1f3dbc] transition-[width] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] shadow-[0_0_10px_rgba(31,61,188,0.7)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="font-mono text-xs text-zinc-300 tabular-nums">
            <span className="text-white font-semibold">{String(activeSlide + 1).padStart(2, '0')}</span>
            <span className="text-zinc-500"> / {TOTAL_SLIDES}</span>
          </span>
          <button
            onClick={() => goTo(Math.min(activeSlide + 1, TOTAL_SLIDES - 1))}
            className="ml-1 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            Próximo <ArrowDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* === DOTS LATERAIS === */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 z-[2000]">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i} onClick={() => goTo(i)}
            className={`block transition-all duration-300 rounded-full ${
              activeSlide === i ? 'w-1 h-5 bg-[#1f3dbc] shadow-[0_0_10px_rgba(31,61,188,0.8)]' : 'w-1 h-1 bg-white/15 hover:bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ════════════ 1 — CAPA ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[1000] bg-transparent overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-7xl">
            <div className="animate-item mb-10">
              <Eyebrow>Apresentação · Maio 2026</Eyebrow>
            </div>

            <h1 className="animate-item font-display text-[clamp(56px,9vw,170px)] font-semibold leading-[0.9] mb-6 tracking-[-0.04em] text-white">
              Plataforma<br />
              de Gestão<br />
              <span className="text-[#1f3dbc] font-light italic">para arenas de</span><br />
              Beach&nbsp;Tennis<span className="text-[#1f3dbc]">.</span>
            </h1>

            <div className="animate-item flex flex-wrap items-center gap-2 mt-12">
              <Tag>Multi-Arena</Tag>
              <Tag>Financeiro</Tag>
              <Tag>Self-service</Tag>
            </div>

            <div className="animate-item flex items-end justify-between mt-20 max-w-5xl">
              <div className="text-zinc-400 text-sm leading-relaxed">
                <Eyebrow>Apresentado por</Eyebrow>
                <div className="text-white font-medium text-lg mt-2">Fernando Almeida</div>
                <div className="text-zinc-500 text-sm">Head de Tecnologia e IA · Five Franchising</div>
              </div>
              <div className="hidden md:flex flex-col items-end gap-3">
                <Eyebrow>Role para descobrir</Eyebrow>
                <div className="w-[1px] h-16 bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 2 — SOBRE MIM ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[990] bg-transparent overflow-hidden">
        <SmallNum n={2} label={SLIDE_TITLES[1]} />
        <div className="relative z-10 h-full flex items-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[0.85fr_1.4fr] gap-20 items-center">
            <div className="animate-item flex flex-col items-start">
              <div className="relative w-44 h-44 mb-6 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#1f3dbc] via-[#22d3ee]/40 to-transparent opacity-60 blur-md group-hover:opacity-90 transition-opacity" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-[#1f3dbc]/50 transition-colors shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <img
                    src="/images/fernando.jpg"
                    alt="Fernando Almeida"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <Eyebrow>Head Tech & IA</Eyebrow>
              <h2 className="font-display text-2xl font-semibold mt-2">Fernando Almeida</h2>
              <div className="text-zinc-500 text-sm mt-1">Five Franchising</div>
            </div>
            <div>
              <div className="animate-item mb-5"><Eyebrow>Sobre mim</Eyebrow></div>
              <p className="animate-item font-display text-3xl md:text-[2.5rem] text-white leading-[1.15] font-medium mb-8 tracking-[-0.025em]">
                Construo produtos que conectam tecnologia, IA e resultado de negócio.
              </p>
              <div className="animate-item space-y-4 max-w-2xl">
                <p className="text-base text-zinc-400 leading-relaxed">
                  Mais de <span className="text-white font-medium">10 anos de marketing</span> aliados à liderança de tecnologia. Atuo da{' '}
                  <span className="text-white font-medium">ideia à entrega</span> — estratégia, produto e operação.
                </p>
                <p className="text-base text-zinc-400 leading-relaxed">
                  Lidero a vertical de automações e IA no Networking dos Irmãos —{' '}
                  <span className="text-white font-medium">+2.000 profissionais</span> de marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 3 — NÚMEROS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[980] bg-transparent overflow-hidden">
        <SmallNum n={3} label={SLIDE_TITLES[2]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Trajetória em números</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-14 tracking-[-0.03em] max-w-3xl">
              Resultados que falam por si.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden mb-10">
              {[
                { value: '+100', label: 'Projetos entregues' },
                { value: '+20', label: 'Em operação' },
                { value: '+10', label: 'Anos em marketing' },
                { value: '+2k', label: 'Profissionais liderados' },
              ].map((s, i) => (
                <div key={s.label} className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-7">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-5xl md:text-6xl font-semibold text-white leading-none mb-3 tracking-[-0.04em]">
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-6 flex gap-4">
                <Building2 className="w-6 h-6 text-zinc-300 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-white mb-1">Five Franchising</div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Head de Tecnologia — estratégia técnica, produtos digitais e IA aplicada.
                  </p>
                </div>
              </div>
              <div className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-6 flex gap-4">
                <Handshake className="w-6 h-6 text-zinc-300 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-white mb-1">Networking dos Irmãos</div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Líder de Automações e IA na comunidade de +2.000 profissionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 4 — METODOLOGIA ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[970] bg-transparent overflow-hidden">
        <SmallNum n={4} label={SLIDE_TITLES[3]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Metodologia</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-14 tracking-[-0.03em]">
              Como eu trabalho.
            </h2>
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                { num: '01', title: 'Da ideia à entrega', desc: 'Da estratégia ao desenvolvimento — participo de toda a concepção do produto.', icon: <Workflow className="w-5 h-5" strokeWidth={1.5} /> },
                { num: '02', title: 'Marketing + Tech', desc: '10+ anos de marketing aliados a IA — produtos que entendem o negócio.', icon: <Sparkles className="w-5 h-5" strokeWidth={1.5} /> },
                { num: '03', title: 'Foco em ROI', desc: 'Cada feature responde a uma métrica de negócio — construo o que move o ponteiro.', icon: <Target className="w-5 h-5" strokeWidth={1.5} /> },
              ].map((c) => (
                <div key={c.num} className="animate-item relative card-hover border border-white/10 rounded-2xl p-7 bg-[rgba(15,15,20,0.55)] backdrop-blur-md">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-6">
                    {c.num}
                  </div>
                  <div className="text-zinc-200 mb-5">{c.icon}</div>
                  <h4 className="font-display text-lg font-semibold mb-3">{c.title}</h4>
                  <p className="text-zinc-500 leading-relaxed text-sm">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="animate-item border-l border-zinc-700 pl-7 max-w-3xl">
              <p className="font-display text-2xl md:text-3xl text-white font-light leading-snug italic tracking-[-0.015em]">
                "Tecnologia bem aplicada é a que <span className="not-italic font-medium">faz a empresa do cliente crescer</span> — não a que tem a stack mais bonita."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 5 — TRANSIÇÃO PARTE 02 ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[960] bg-transparent overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-12"><Eyebrow>Parte Dois</Eyebrow></div>
            <h1 className="animate-item font-display text-[clamp(72px,12vw,220px)] font-semibold leading-[0.88] tracking-[-0.045em] mb-10 text-white">
              A solução<br />
              <span className="text-[#1f3dbc] font-light italic">proposta.</span>
            </h1>
            <p className="animate-item text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              Plataforma de Gestão para Arenas de Beach Tennis — desenhada do zero para o seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 6 — CENÁRIO ATUAL ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[950] bg-transparent overflow-hidden">
        <SmallNum n={6} label={SLIDE_TITLES[5]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5 flex items-center gap-3">
              <Eyebrow>Diagnóstico</Eyebrow>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-700 text-[0.62rem] font-mono uppercase tracking-[0.22em] text-zinc-400">
                <AlertCircle className="w-3 h-3" strokeWidth={1.8} />
                Hoje
              </span>
            </div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-5 tracking-[-0.03em]">
              O cenário atual <span className="text-[#1f3dbc] font-light italic">é caótico.</span>
            </h2>
            <p className="animate-item text-base text-zinc-500 mb-12 max-w-3xl leading-relaxed">
              Arenas operam, hoje, com uma combinação fragmentada de ferramentas que não conversam:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
              {[
                { icon: <ClipboardList className="w-5 h-5" strokeWidth={1.5} />, title: 'Agendamento', desc: 'Planilhas, cadernos físicos ou grupos de WhatsApp.' },
                { icon: <Banknote className="w-5 h-5" strokeWidth={1.5} />, title: 'Cobrança', desc: 'Pix avulso, boletos manuais — sem reconciliação automática.' },
                { icon: <Repeat className="w-5 h-5" strokeWidth={1.5} />, title: 'Reposições', desc: 'Controle manual sujeito a perdas e disputas com alunos.' },
                { icon: <BarChart3 className="w-5 h-5" strokeWidth={1.5} />, title: 'Financeiro', desc: 'Excel sem visão consolidada quando há múltiplas arenas.' },
              ].map((c, i) => (
                <div key={c.title} className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-7">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-zinc-300 mb-4">{c.icon}</div>
                  <h4 className="font-display text-base font-semibold mb-2">{c.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 7 — CUSTO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[940] bg-transparent overflow-hidden">
        <SmallNum n={7} label={SLIDE_TITLES[6]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Quanto custa</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-14 tracking-[-0.03em] max-w-4xl">
              O preço dessa <span className="text-[#1f3dbc] font-light italic">fragmentação.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
              {[
                { value: '8-15%', label: 'Inadimplência sobre faturamento' },
                { value: '2 dias', label: 'Para fechamento financeiro mensal' },
                { value: '~30%', label: 'Quadras ociosas em horários reativos' },
                { value: '+50%', label: 'Tempo do gestor em tarefas operacionais' },
              ].map((s, i) => (
                <div key={s.label} className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-7">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-5xl md:text-6xl font-semibold text-white leading-none mb-4 tracking-[-0.04em]">
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-500 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="animate-item text-sm text-zinc-600 italic flex items-center gap-3">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase not-italic">Nota</span>
              <Divider />
              <span className="whitespace-nowrap">Estimativas de mercado</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 8 — VISÃO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[930] bg-transparent overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 md:px-24">
          <div className="animate-item mb-10"><Eyebrow>Nossa proposta de valor</Eyebrow></div>
          <h1 className="animate-item font-display text-[clamp(48px,8vw,140px)] font-semibold leading-[0.95] tracking-[-0.04em] max-w-6xl mb-10 text-white">
            Tornar a operação<br />
            tão simples quanto<br />
            <span className="text-[#1f3dbc] font-light italic">agendar uma aula.</span>
          </h1>
          <p className="animate-item text-xl md:text-2xl text-zinc-500 max-w-3xl leading-relaxed">
            Um único sistema que conecta gestão multi-arena, financeiro automatizado e autonomia do aluno em uma experiência fluida — web e mobile.
          </p>
        </div>
      </section>

      {/* ════════════ 9 — 7 MÓDULOS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[920] bg-transparent overflow-hidden">
        <SmallNum n={9} label={SLIDE_TITLES[8]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>A plataforma</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-12 tracking-[-0.03em]">
              Sete módulos. <span className="text-[#1f3dbc] font-light italic">Um sistema.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
              {[
                { icon: <Building2 className="w-5 h-5" strokeWidth={1.5} />, title: 'Multi-Arena', desc: 'Gestão centralizada por unidade.' },
                { icon: <Wallet className="w-5 h-5" strokeWidth={1.5} />, title: 'Financeiro', desc: 'Fluxo de caixa e DRE consolidado.' },
                { icon: <Users className="w-5 h-5" strokeWidth={1.5} />, title: 'Alunos', desc: 'Cadastro, planos, presença.' },
                { icon: <CreditCard className="w-5 h-5" strokeWidth={1.5} />, title: 'Cobrança', desc: 'Recorrência via Asaas.' },
                { icon: <Calendar className="w-5 h-5" strokeWidth={1.5} />, title: 'Agendamento', desc: 'Calendário visual por quadra.' },
                { icon: <Repeat className="w-5 h-5" strokeWidth={1.5} />, title: 'Reposição', desc: 'Crédito automático com regras.' },
                { icon: <Smartphone className="w-5 h-5" strokeWidth={1.5} />, title: 'Portal Aluno', desc: 'Self-service total.' },
                { icon: <Zap className="w-5 h-5" strokeWidth={1.5} />, title: 'Integrado', desc: 'Tudo conversa, em tempo real.', highlight: true },
              ].map((m, i) => (
                <div
                  key={m.title}
                  className={`animate-item p-6 relative ${
                    m.highlight
                      ? 'bg-[#1f3dbc] text-white shadow-[0_0_60px_rgba(31,61,188,0.5)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_80px_rgba(31,61,188,0.7)]'
                      : 'cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={m.highlight ? 'text-white' : 'text-zinc-300'}>{m.icon}</div>
                    <span className={`font-mono text-[0.55rem] tracking-[0.3em] ${
                      m.highlight ? 'text-blue-200' : 'text-zinc-700'
                    }`}>
                      M{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold mb-1.5">{m.title}</h4>
                  <p className={`text-xs leading-relaxed ${m.highlight ? 'text-blue-100' : 'text-zinc-500'}`}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 10 — MULTI-ARENA ════════════ */}
      <ModuleSlide
        zIndex={910} bg="bg-black" n={10} label={SLIDE_TITLES[9]} moduleNum="01"
        title={<>Gestão <span className="text-[#1f3dbc] font-light italic">Multi-Arena.</span></>}
        bullets={[
          'Cadastro ilimitado de arenas com regras próprias',
          'Dashboard consolidado com KPIs por unidade',
          'Permissões granulares por arena e perfil',
          'Comparativo de performance entre unidades',
        ]}
        imageOnRight={false}
        mockup={<DeviceSwitcher desktop={<DashboardMockup />} mobile={<DashboardMobileMockup />} />}
      />

      {/* ════════════ 11 — FINANCEIRO ════════════ */}
      <ModuleSlide
        zIndex={900} bg="bg-zinc-950" n={11} label={SLIDE_TITLES[10]} moduleNum="02"
        title={<>Financeiro & <span className="text-[#1f3dbc] font-light italic">Fluxo de Caixa.</span></>}
        bullets={[
          'Fluxo de caixa diário, semanal e mensal por arena',
          'DRE simplificado consolidado e por unidade',
          'Centro de custos e categorização',
          'Conciliação automática via webhook Asaas',
          'Indicadores: ticket médio, LTV, inadimplência, ocupação',
        ]}
        imageOnRight
        mockup={<DeviceSwitcher desktop={<FinancialMockup />} mobile={<FinancialMobileMockup />} />}
      />

      {/* ════════════ 12 — ALUNOS ════════════ */}
      <ModuleSlide
        zIndex={890} bg="bg-black" n={12} label={SLIDE_TITLES[11]} moduleNum="03"
        title={<>Gestão de <span className="text-[#1f3dbc] font-light italic">Alunos.</span></>}
        bullets={[
          'Cadastro completo + vínculo com turma e professor',
          'Planos: mensal, trimestral, pacote, day-use',
          'Histórico de presença, reposições e pagamentos',
          'Régua de relacionamento (boas-vindas, aniversário, recuperação)',
          'Score de risco de churn por aluno',
        ]}
        imageOnRight={false}
        mockup={<DeviceSwitcher desktop={<StudentsMockup />} mobile={<StudentsMobileMockup />} />}
      />

      {/* ════════════ 13 — COBRANÇA ════════════ */}
      <ModuleSlide
        zIndex={880} bg="bg-zinc-950" n={13} label={SLIDE_TITLES[12]} moduleNum="04"
        title={<>Cobrança via <span className="text-[#1f3dbc] font-light italic">Asaas.</span></>}
        bullets={[
          'Recorrência automática a partir do plano do aluno',
          'Pix, boleto e cartão (parcelamento e recorrência)',
          'Régua de cobrança automática (lembrete, atraso, segunda via)',
          'Baixa automática via webhook',
          'Negativação opcional para inadimplentes crônicos',
        ]}
        imageOnRight
        mockup={<DeviceSwitcher desktop={<BillingMockup />} mobile={<BillingMobileMockup />} />}
      />

      {/* ════════════ 14 — AGENDAMENTO ════════════ */}
      <ModuleSlide
        zIndex={870} bg="bg-black" n={14} label={SLIDE_TITLES[13]} moduleNum="05"
        title={<>Agendamento & <span className="text-[#1f3dbc] font-light italic">Reservas.</span></>}
        bullets={[
          'Calendário visual por quadra (dia/semana/mês)',
          'Reserva para aulas regulares, avulsas e day-use',
          'Bloqueio de horários (manutenção, evento, clima)',
          'Lista de espera automática',
          'Notificações 24h e 2h antes',
        ]}
        imageOnRight={false}
        mockup={<DeviceSwitcher desktop={<CalendarMockup />} mobile={<CalendarMobileMockup />} />}
      />

      {/* ════════════ 15 — REPOSIÇÃO ════════════ */}
      <ModuleSlide
        zIndex={860} bg="bg-zinc-950" n={15} label={SLIDE_TITLES[14]} moduleNum="06"
        title={<>Reposição de <span className="text-[#1f3dbc] font-light italic">Aulas.</span></>}
        bullets={[
          'Registro de falta com regra de antecedência configurável',
          'Crédito de reposição automático',
          'Aluno escolhe horário disponível sem intervenção da recepção',
          'Auditoria completa: quem faltou, repôs e saldo',
          'Política configurável por arena (limite, validade)',
        ]}
        imageOnRight
        mockup={<DeviceSwitcher desktop={<MakeupMockup />} mobile={<MakeupMobileMockup />} />}
      />

      {/* ════════════ 16 — PORTAL ALUNO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[850] bg-transparent overflow-hidden">
        <SmallNum n={16} label={SLIDE_TITLES[15]} />
        <div className="relative z-10 h-full flex items-center px-8 md:px-12">
          <div className="max-w-[1600px] mx-auto w-full grid md:grid-cols-[1.7fr_1fr] gap-10 items-center">
            <div className="animate-item relative w-full aspect-[16/9] flex items-center justify-center">
              <PhoneMockup />
            </div>
            <div>
              <div className="animate-item flex items-center gap-3 mb-5">
                <Tag>Módulo 07</Tag>
                <Eyebrow>Mobile-first</Eyebrow>
              </div>
              <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-6 tracking-[-0.03em] leading-[1.05]">
                Portal do <span className="text-[#1f3dbc] font-light italic">Aluno.</span>
              </h2>
              <p className="animate-item text-lg text-zinc-400 mb-8 leading-relaxed max-w-md">
                Dê poder ao seu aluno e reduza o tempo da recepção em até{' '}
                <span className="text-white font-medium">70%.</span>
              </p>
              <ul className="space-y-3.5">
                {[
                  'Login simples (e-mail/celular)',
                  'Próximas aulas e saldo de reposições',
                  'Agendamento e reposição self-service',
                  'Faturas em aberto e segunda via',
                  'Notificações push, WhatsApp e e-mail',
                ].map((t) => (
                  <li key={t} className="animate-item flex items-start gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <span className="text-zinc-300">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 17 — ANTES vs DEPOIS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[840] bg-transparent overflow-hidden">
        <SmallNum n={17} label={SLIDE_TITLES[16]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Comparativo</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-12 tracking-[-0.03em]">
              Antes <span className="text-[#1f3dbc]/70 font-light">vs</span> <span className="text-[#1f3dbc] font-light italic">depois.</span>
            </h2>
            <div className="rounded-2xl border border-zinc-800 overflow-hidden">
              <div className="grid grid-cols-3 px-7 py-4 border-b border-zinc-800 bg-zinc-900/40">
                <Eyebrow>Hoje</Eyebrow>
                <Eyebrow>Com a plataforma</Eyebrow>
                <div className="text-right"><Eyebrow>Ganho</Eyebrow></div>
              </div>
              {[
                ['Cobrança manual de mensalidades', 'Recorrência automática + régua Asaas', '−30 a 50% inadimplência'],
                ['Agendamento por WhatsApp', 'Self-service no portal do aluno', '−70% tempo da recepção'],
                ['Reposição em caderno', 'Crédito automático com regras', 'Zero conflitos'],
                ['Fechamento financeiro de 2 dias', 'Conciliação automática + DRE em tempo real', '2 dias → minutos'],
                ['Visão fragmentada das arenas', 'Dashboard multi-arena consolidado', 'Decisão por dado'],
              ].map((row, i) => (
                <div key={i} className="animate-item row-hover grid grid-cols-3 px-7 py-5 border-b border-zinc-800/60 last:border-b-0">
                  <div className="text-zinc-500 text-sm flex items-start gap-3">
                    <span className="font-mono text-[0.6rem] text-zinc-700 mt-1 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span>{row[0]}</span>
                  </div>
                  <div className="text-zinc-200 text-sm">{row[1]}</div>
                  <div className="text-right font-display font-medium text-white text-sm">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 18 — PERFORMANCE ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[830] bg-transparent overflow-hidden">
        <SmallNum n={18} label={SLIDE_TITLES[17]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Performance</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-14 tracking-[-0.03em]">
              Confiabilidade <span className="text-[#1f3dbc] font-light italic">enterprise.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden mb-8">
              {[
                { value: '<2s', label: 'Carregamento em 4G', icon: <Zap className="w-5 h-5" strokeWidth={1.5} /> },
                { value: '10k+', label: 'Alunos sem degradação', icon: <Users className="w-5 h-5" strokeWidth={1.5} /> },
                { value: '99.5%', label: 'Disponibilidade SLA', icon: <TrendingUp className="w-5 h-5" strokeWidth={1.5} /> },
                { value: 'LGPD', label: 'Criptografia + 2FA', icon: <Shield className="w-5 h-5" strokeWidth={1.5} /> },
              ].map((s, i) => (
                <div key={s.label} className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-zinc-300">{s.icon}</div>
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] text-zinc-700">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="font-display text-4xl md:text-5xl font-semibold text-white leading-none mb-3 tracking-[-0.04em]">
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="animate-item text-zinc-500 max-w-2xl text-sm">
              Arquitetura escalável horizontalmente, com integração nativa ao{' '}
              <span className="text-zinc-200 font-medium">Asaas</span> e{' '}
              <span className="text-zinc-200 font-medium">WhatsApp Business</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 19 — KPIs DE SUCESSO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[820] bg-transparent overflow-hidden">
        <SmallNum n={19} label={SLIDE_TITLES[18]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>KPIs do projeto</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-12 tracking-[-0.03em]">
              Métricas de <span className="text-[#1f3dbc] font-light italic">sucesso.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  label: 'Do produto', icon: <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />,
                  items: [
                    '≥ 70% dos alunos logando 1x/mês',
                    '≥ 60% das aulas agendadas pelo aluno em 6 meses',
                    '≥ 95% das cobranças baixadas automaticamente',
                  ],
                },
                {
                  label: 'Do negócio', icon: <TrendingUp className="w-5 h-5" strokeWidth={1.5} />,
                  items: [
                    '−30% de inadimplência em 90 dias',
                    '+15% de ocupação das quadras',
                    '−50% do tempo administrativo do gestor',
                  ],
                },
              ].map((g) => (
                <div key={g.label} className="animate-item card-hover border border-white/10 rounded-2xl p-7 bg-[rgba(15,15,20,0.55)] backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-zinc-300">{g.icon}</div>
                    <Eyebrow>{g.label}</Eyebrow>
                  </div>
                  <ul className="space-y-3.5">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
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

      {/* ════════════ 20 — ROADMAP (Timeline 45 dias) ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[810] bg-transparent overflow-hidden">
        <SmallNum n={20} label={SLIDE_TITLES[19]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item flex items-center gap-3 mb-5">
              <Eyebrow>Cronograma · MVP</Eyebrow>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#1f3dbc]/40 bg-[#1f3dbc]/[0.10] text-[0.55rem] font-mono uppercase tracking-[0.25em] text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" />
                45 dias
              </span>
            </div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-3 tracking-[-0.03em]">
              Do zero à <span className="text-[#1f3dbc] font-light italic">entrega em 45 dias.</span>
            </h2>
            <p className="animate-item text-base text-zinc-400 mb-8 max-w-2xl">
              Cinco sprints semanais, entregas incrementais. Você acompanha cada fase com demos ao vivo e deploys contínuos.
            </p>

            <div className="animate-item">
              <RoadmapTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 21 — INVESTIMENTO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[805] bg-transparent overflow-hidden">
        <SmallNum n={21} label={SLIDE_TITLES[20]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5 flex items-center justify-between">
              <Eyebrow>Investimento</Eyebrow>
              <button
                onClick={() => setShowPrices(!showPrices)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 hover:border-[#1f3dbc]/50 hover:bg-[#1f3dbc]/[0.08] text-[0.6rem] font-mono uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-all"
              >
                {showPrices ? (
                  <>
                    <EyeOff className="w-3 h-3" strokeWidth={1.8} />
                    Ocultar valores
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" strokeWidth={1.8} />
                    Mostrar valores
                  </>
                )}
              </button>
            </div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-4 tracking-[-0.03em]">
              Pronto para <span className="text-[#1f3dbc] font-light italic">começar?</span>
            </h2>
            <p className="animate-item text-base text-zinc-400 mb-10 max-w-2xl">
              Dois pacotes desenhados para diferentes momentos do seu negócio. Cada um é um sistema completo, sem trade-offs.
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Pacote 1 — Web */}
              <div className="animate-item card-hover relative border border-white/10 rounded-2xl p-7 bg-[rgba(15,15,20,0.55)] backdrop-blur-md">
                <div className="flex items-center justify-between mb-5">
                  <Eyebrow>Pacote 01</Eyebrow>
                  <LayoutDashboard className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-1.5 tracking-tight">
                  Plataforma Web
                </h3>
                <p className="text-sm text-zinc-500 mb-6">
                  Sistema completo no navegador, web responsiva para gestor, professor e aluno.
                </p>

                <div className="rounded-xl bg-zinc-950/60 border border-white/5 p-4 mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500">Implantação</div>
                    <div className="text-[0.55rem] font-mono text-zinc-600">único</div>
                  </div>
                  <div className={`font-display text-3xl font-semibold tabular-nums tracking-tight transition-all duration-500 ${!showPrices ? 'blur-md select-none' : ''}`}>R$ 10.000</div>
                  <div className="h-px bg-zinc-800 my-3" />
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[0.6rem] uppercase tracking-widest text-zinc-500">Mensalidade</div>
                    <div className="text-[0.55rem] font-mono text-zinc-600">recorrente</div>
                  </div>
                  <div className={`font-display text-2xl font-semibold tabular-nums tracking-tight transition-all duration-500 ${!showPrices ? 'blur-md select-none' : ''}`}>
                    R$ 745<span className="text-sm text-zinc-500 font-normal ml-1">/mês</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    '7 módulos completos integrados',
                    'Multi-arena ilimitado',
                    'Portal do aluno (web responsivo)',
                    'Integração Asaas + WhatsApp Business',
                    'Suporte e manutenção contínuos',
                    'SLA 99.5% · LGPD · 2FA',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-zinc-800 pt-4 flex items-center justify-between">
                  <div className="text-[0.6rem] font-mono uppercase tracking-widest text-zinc-500">
                    Implantação · 0–3 meses
                  </div>
                  <button className="text-[0.6rem] font-mono uppercase tracking-widest text-zinc-300 hover:text-white inline-flex items-center gap-1 transition-colors">
                    Detalhes <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* Pacote 2 — Web + App Nativo (RECOMENDADO) */}
              <div className="animate-item card-hover relative border-2 border-[#1f3dbc]/60 rounded-2xl p-7 bg-gradient-to-br from-[#1f3dbc]/[0.14] to-[rgba(15,15,20,0.65)] backdrop-blur-md shadow-[0_0_60px_rgba(31,61,188,0.28)]">
                <span className="absolute -top-2.5 left-7 px-2.5 py-0.5 rounded-full bg-[#1f3dbc] text-white text-[0.55rem] font-mono uppercase tracking-[0.25em] shadow-[0_0_18px_rgba(31,61,188,0.6)]">
                  Recomendado
                </span>
                <div className="flex items-center justify-between mb-5">
                  <Eyebrow className="text-blue-300">Pacote 02</Eyebrow>
                  <div className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                    <Smartphone className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-1.5 tracking-tight">
                  Web + App Nativo
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Plataforma web completa <span className="text-white">+</span> apps iOS e Android nativos publicados nas lojas.
                </p>

                <div className="rounded-xl bg-zinc-950/70 border border-[#1f3dbc]/30 p-4 mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[0.6rem] uppercase tracking-widest text-blue-300">Implantação</div>
                    <div className="text-[0.55rem] font-mono text-zinc-500">único</div>
                  </div>
                  <div className={`font-display text-3xl font-semibold tabular-nums tracking-tight text-white transition-all duration-500 ${!showPrices ? 'blur-md select-none' : ''}`}>R$ 15.000</div>
                  <div className="h-px bg-[#1f3dbc]/30 my-3" />
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="text-[0.6rem] uppercase tracking-widest text-blue-300">Mensalidade</div>
                    <div className="text-[0.55rem] font-mono text-zinc-500">recorrente</div>
                  </div>
                  <div className={`font-display text-2xl font-semibold tabular-nums tracking-tight text-white transition-all duration-500 ${!showPrices ? 'blur-md select-none' : ''}`}>
                    R$ 1.245<span className="text-sm text-zinc-500 font-normal ml-1">/mês</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {[
                    'Tudo do Pacote 01',
                    'App iOS nativo · App Store',
                    'App Android nativo · Google Play',
                    'Push notifications + deep links',
                    'Modo offline básico',
                    'Identidade visual 100% customizada',
                  ].map((t, i) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className={i === 0 ? 'text-zinc-400 italic' : ''}>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#1f3dbc]/20 pt-4 flex items-center justify-between">
                  <div className="text-[0.6rem] font-mono uppercase tracking-widest text-blue-300">
                    Implantação · 0–6 meses
                  </div>
                  <button className="text-[0.6rem] font-mono uppercase tracking-widest text-blue-300 hover:text-white inline-flex items-center gap-1 transition-colors">
                    Detalhes <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>

            <div className="animate-item mt-6 flex items-center justify-center gap-2 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-zinc-500">
              <span>*</span>
              <span>Valores referenciais · proposta detalhada após o workshop de descoberta</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 22 — PRÓXIMOS PASSOS ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[800] bg-transparent overflow-hidden">
        <SmallNum n={22} label={SLIDE_TITLES[21]} />
        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="animate-item mb-5"><Eyebrow>Como começar</Eyebrow></div>
            <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-12 tracking-[-0.03em]">
              Próximos <span className="text-[#1f3dbc] font-light italic">passos.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden mb-12">
              {[
                { num: '01', title: 'Validação do PRD', desc: 'Alinhamento de escopo e prioridades.' },
                { num: '02', title: 'Workshop de descoberta', desc: 'Mapear regras das suas arenas.' },
                { num: '03', title: 'Aprovação do MVP', desc: 'Cronograma definitivo.' },
                { num: '04', title: 'Setup de ambiente', desc: 'Início do desenvolvimento.' },
              ].map((p) => (
                <div key={p.num} className="animate-item cell-hover bg-[rgba(15,15,20,0.55)] backdrop-blur-md p-6">
                  <div className="font-mono text-[0.6rem] tracking-[0.3em] text-zinc-600 mb-6">
                    {p.num}
                  </div>
                  <h4 className="font-display font-semibold mb-2 tracking-tight">{p.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="animate-item border-l border-zinc-700 pl-7 max-w-3xl">
              <p className="font-display text-2xl md:text-3xl text-white font-light leading-snug tracking-[-0.015em]">
                Pronto para transformar a gestão das suas arenas em uma{' '}
                <span className="font-medium">vantagem competitiva?</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 22 — CONTATO ════════════ */}
      <section className="slide absolute inset-0 w-full h-full z-[790] bg-transparent overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-12 md:px-24">
          <div className="animate-item mb-10"><Eyebrow>Vamos conversar</Eyebrow></div>
          <h1 className="animate-item font-display text-[clamp(80px,14vw,240px)] font-semibold leading-[0.85] tracking-[-0.045em] mb-12 text-white">
            Obrigado<span className="text-[#1f3dbc]">.</span>
          </h1>
          <div className="animate-item text-xl text-white font-display font-medium mb-1">
            Fernando Almeida
          </div>
          <div className="animate-item text-sm text-zinc-500 mb-12">
            Head de Tecnologia e IA · Five Franchising
          </div>
          <div className="animate-item flex flex-wrap justify-center gap-3 mb-12">
            <div className="chip-hover flex items-center gap-2 border border-zinc-800 px-5 py-2.5 rounded-full text-sm text-zinc-300">
              <Mail className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.8} />
              <span>contato@fernandoalmeida.dev</span>
            </div>
            <div className="chip-hover flex items-center gap-2 border border-zinc-800 px-5 py-2.5 rounded-full text-sm text-zinc-300">
              <Phone className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.8} />
              <span>+55 00 00000-0000</span>
            </div>
            <div className="chip-hover flex items-center gap-2 border border-zinc-800 px-5 py-2.5 rounded-full text-sm text-zinc-300">
              <LinkedinIcon className="w-3.5 h-3.5 text-zinc-500" />
              <span>linkedin.com/in/seu-perfil</span>
            </div>
          </div>
          <button className="animate-item btn-hover-primary group inline-flex items-center gap-2.5 bg-[#f0f2ff] hover:bg-white text-black font-medium text-base px-8 py-3.5 rounded-full active:scale-[0.99] shadow-[0_1px_2px_0_rgba(0,0,0,0.06),0_0_60px_rgba(31,61,188,0.4)]">
            <Rocket className="w-4 h-4" strokeWidth={1.8} />
            Iniciar Projeto MVP
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.8} />
          </button>
        </div>
      </section>
      </div>
    </>
  );
}

/** Slide reutilizável — versão minimalista */
function ModuleSlide({
  zIndex, bg, n, label, moduleNum, title, bullets, imageSrc, mockup, imageOnRight = true,
}: {
  zIndex: number; bg: string; n: number; label: string; moduleNum: string;
  title: React.ReactNode; bullets: string[]; imageSrc?: string; mockup?: React.ReactNode;
  imageOnRight?: boolean;
}) {
  const visual = imageSrc ? (
    <div className="animate-item rounded-2xl overflow-hidden border border-zinc-800">
      <img src={imageSrc} alt="" className="w-full h-auto block" />
    </div>
  ) : (
    <div className="animate-item">{mockup}</div>
  );

  const text = (
    <div>
      <div className="animate-item flex items-center gap-3 mb-5">
        <Tag>Módulo {moduleNum}</Tag>
        <Eyebrow>M{moduleNum} / 07</Eyebrow>
      </div>
      <h2 className="animate-item font-display text-5xl md:text-6xl font-semibold mb-8 tracking-[-0.03em] leading-[1.05]">
        {title}
      </h2>
      <ul className="space-y-3.5">
        {bullets.map((t) => (
          <li key={t} className="animate-item flex items-start gap-3">
            <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
            <span className="text-zinc-300">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className={`slide absolute inset-0 w-full h-full ${bg} overflow-hidden`} style={{ zIndex }}>
      <SmallNum n={n} label={label} />
      <div className="relative z-10 h-full flex items-center px-8 md:px-12">
        <div className={`max-w-[1600px] mx-auto w-full grid gap-10 items-center ${
          imageOnRight ? 'md:grid-cols-[1fr_1.7fr]' : 'md:grid-cols-[1.7fr_1fr]'
        }`}>
          {imageOnRight ? (<>{text}{visual}</>) : (<>{visual}{text}</>)}
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

export default AppHero;
