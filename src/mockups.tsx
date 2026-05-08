import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import {
  Building2, Users, CreditCard, Calendar, Repeat,
  BarChart3, ArrowUpRight, ArrowDownRight, Bell, Search,
  Loader2, MapPin, Award, Smartphone, ChevronRight, ChevronLeft,
  Check, ArrowLeft, Plus, Wifi, Activity, Zap, MoreHorizontal,
  MessageCircle, Download, Eye, Edit3, LayoutDashboard, Settings,
  Filter, Trophy, Inbox, FileText, Clock,
  ArrowUpDown, Sparkles, Star, Lock,
} from 'lucide-react';

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`font-mono text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 font-medium ${className}`}>
    {children}
  </div>
);

const LiveBadge = ({ label = 'Live', color = 'green' }: { label?: string; color?: 'green' | 'amber' }) => (
  <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-mono uppercase tracking-[0.2em] text-zinc-300">
    <span className={`relative w-1.5 h-1.5 rounded-full ${color === 'green' ? 'bg-blue-500 pulse-dot' : 'bg-amber-400 pulse-dot-amber'}`} />
    {label}
  </span>
);

function TabSwitch({ tabs, active, onChange, size = 'md' }: { tabs: string[]; active: number; onChange?: (i: number) => void; size?: 'sm' | 'md' }) {
  const px = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1';
  return (
    <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-md p-0.5 gap-0.5 relative">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange?.(i)}
          className={`${px} text-[0.6rem] font-mono uppercase tracking-wider rounded transition-colors duration-300 relative z-10 ${
            active === i ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {active === i && <span className="absolute inset-0 bg-[#1f3dbc] rounded -z-10 tab-pill-active shadow-[0_0_14px_rgba(31,61,188,0.5)]" />}
          {t}
        </button>
      ))}
    </div>
  );
}

function useTickingValue(base: number, range = 2, intervalMs = 2400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      const delta = Math.round((Math.random() - 0.5) * range * 2);
      setV(base + delta);
    }, intervalMs);
    return () => clearInterval(id);
  }, [base, range, intervalMs]);
  return v;
}

function useCycle(length: number, intervalMs = 2200) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (length <= 0) return;
    const id = setInterval(() => setI((v) => (v + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return i;
}

function Sparkline({ values, className = '', barClass = 'bg-zinc-500' }: {
  values: number[]; className?: string; barClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll<HTMLElement>('[data-bar]');
    bars.forEach((b, i) => {
      gsap.to(b, {
        scaleY: 0.85 + Math.random() * 0.3,
        duration: 1.4 + Math.random() * 0.8,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        delay: i * 0.08,
        transformOrigin: 'bottom',
      });
    });
  }, []);
  return (
    <div ref={ref} className={`flex items-end gap-0.5 ${className}`}>
      {values.map((h, i) => (
        <div key={i} data-bar className={`w-1 rounded-t ${barClass}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

/* ════════════ CHROME (Sidebar + Header + Frame) ════════════ */

type NavItem = { icon: React.ReactNode; label: string };

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Painel' },
  { icon: <Building2 className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Arenas' },
  { icon: <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Financeiro' },
  { icon: <Users className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Alunos' },
  { icon: <CreditCard className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Cobrança' },
  { icon: <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Agenda' },
  { icon: <Repeat className="w-3.5 h-3.5" strokeWidth={1.8} />, label: 'Reposição' },
];

function MiniSidebar({ active }: { active: number }) {
  return (
    <aside className="w-10 border-r border-zinc-800 bg-zinc-950/80 flex flex-col items-center py-2.5 gap-1.5 flex-shrink-0">
      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#1f3dbc] to-[#22d3ee] flex items-center justify-center text-white font-bold text-[0.6rem] shadow-[0_0_12px_rgba(31,61,188,0.5)] mb-1">V</div>
      {NAV_ITEMS.map((n, i) => (
        <button
          key={n.label}
          title={n.label}
          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 relative group ${
            active === i ? 'bg-[#1f3dbc]/20 text-blue-300' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'
          }`}
        >
          {active === i && <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#1f3dbc] rounded-r" />}
          {n.icon}
          <span className="absolute left-full ml-2 px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-[0.55rem] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            {n.label}
          </span>
        </button>
      ))}
      <div className="flex-1" />
      <button className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 transition-all">
        <Settings className="w-3.5 h-3.5" strokeWidth={1.8} />
      </button>
    </aside>
  );
}

function MockupHeader({ breadcrumb, search, badge, actions, notifs = 3 }: {
  breadcrumb: React.ReactNode;
  search?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  notifs?: number;
}) {
  return (
    <header className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/80 bg-zinc-950/60 flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <ChevronLeft className="w-3 h-3 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer" strokeWidth={2} />
        <ChevronRight className="w-3 h-3 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer" strokeWidth={2} />
        <div className="text-[0.65rem] text-zinc-400 font-medium tracking-tight flex items-center gap-1.5 truncate">
          {breadcrumb}
        </div>
        {badge}
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {search !== undefined && (
          <div className="hidden md:flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 hover:border-zinc-700 transition-colors w-44">
            <Search className="w-2.5 h-2.5 text-zinc-500" strokeWidth={1.8} />
            <span className="text-[0.55rem] text-zinc-500 truncate">{search}</span>
            <span className="ml-auto font-mono text-[0.5rem] text-zinc-600 tracking-widest">⌘K</span>
          </div>
        )}
        {actions}
        <button className="relative w-6 h-6 rounded-md hover:bg-zinc-900 flex items-center justify-center text-zinc-400 transition-colors">
          <Bell className="w-3 h-3" strokeWidth={1.8} />
          {notifs > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#1f3dbc] rounded-full text-[0.45rem] font-bold text-white flex items-center justify-center pulse-dot">
              {notifs}
            </span>
          )}
        </button>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center text-[0.55rem] font-bold text-zinc-200">FA</div>
      </div>
    </header>
  );
}

function MockupChrome({ activeNav, header, footer, children }: {
  activeNav: number;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.4)] mockup-frame w-full">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <MiniSidebar active={activeNav} />
        <div className="flex-1 flex flex-col min-w-0">
          {header}
          <div className="flex-1 min-h-0 overflow-hidden p-3">{children}</div>
        </div>
      </div>
      {footer && <div className="border-t border-zinc-800/80 px-3 py-1.5 bg-zinc-900/40 flex-shrink-0 text-[0.55rem] flex items-center justify-between">{footer}</div>}
    </div>
  );
}

function ActionToast({ icon, label, tone = 'blue' }: { icon: React.ReactNode; label: string; tone?: 'blue' | 'amber' | 'green' }) {
  const toneClass =
    tone === 'amber' ? 'border-amber-500/40 bg-amber-500/[0.08] text-amber-300' :
    tone === 'green' ? 'border-blue-500/40 bg-blue-500/[0.08] text-blue-300' :
    'border-[#1f3dbc]/50 bg-[#1f3dbc]/[0.12] text-[#a5b8ff]';
  return (
    <div className={`toast-anim absolute top-2 right-2 z-30 max-w-[240px] rounded-lg border ${toneClass} px-2 py-1 flex items-center gap-1.5 backdrop-blur-md shadow-xl`}>
      {icon}
      <span className="text-[0.58rem]">{label}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*               1. DASHBOARD MULTI-ARENA                       */
/* ════════════════════════════════════════════════════════════ */
export function DashboardMockup() {
  const periods = ['Hoje', 'Semana', 'Mês'] as const;
  const [period, setPeriod] = useState(2);

  const data = [
    { receita: 'R$ 24k', alunos: '124', ocupacao: '76%', nps: '8.4', trend: ['+5.1%', '+8%', '+2%', '+0.2'] },
    { receita: 'R$ 142k', alunos: '528', ocupacao: '78%', nps: '8.6', trend: ['+7.4%', '+12%', '−1%', '+0.3'] },
    { receita: 'R$ 412k', alunos: '847', ocupacao: '82%', nps: '9.1', trend: ['+8.2%', '+18%', '−1%', '+0.5'] },
  ];

  useEffect(() => {
    const id = setInterval(() => setPeriod((p) => (p + 1) % 3), 4500);
    return () => clearInterval(id);
  }, []);

  const cursor = useCycle(3, 2400);
  const [hoverArena, setHoverArena] = useState<number | null>(null);

  const toastEvents = [
    { msg: 'Nova reserva · Q2 · 19h', icon: <Calendar className="w-2.5 h-2.5" strokeWidth={2} /> },
    { msg: 'Cobrança baixada · R$ 280', icon: <Check className="w-2.5 h-2.5" strokeWidth={2.5} /> },
    { msg: 'Aluno novo · Sofia A.', icon: <Users className="w-2.5 h-2.5" strokeWidth={2} /> },
  ];
  const [toastIdx, setToastIdx] = useState(-1);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setToastIdx(i);
      i = (i + 1) % toastEvents.length;
    }, 4800);
    return () => clearInterval(id);
  }, []);

  const arenas = [
    { name: 'Vila Olímpia', city: 'SP · Zona Sul', kpi: 'R$ 168k', occ: '88%', delta: '+12%', up: true, sparkline: [40, 65, 50, 78, 55, 90], aulas: 142 },
    { name: 'Pinheiros', city: 'SP · Zona Oeste', kpi: 'R$ 142k', occ: '79%', delta: '+5%', up: true, sparkline: [50, 60, 55, 65, 70, 75], aulas: 118 },
    { name: 'Moema', city: 'SP · Zona Sul', kpi: 'R$ 102k', occ: '74%', delta: '−2%', up: false, sparkline: [70, 65, 60, 55, 50, 48], aulas: 96 },
  ];

  const current = data[period];
  const kpis = [
    { l: 'Receita', v: current.receita, trend: current.trend[0], up: true, icon: <BarChart3 className="w-3 h-3" strokeWidth={1.8} /> },
    { l: 'Alunos', v: current.alunos, trend: current.trend[1], up: true, icon: <Users className="w-3 h-3" strokeWidth={1.8} /> },
    { l: 'Ocupação', v: current.ocupacao, trend: current.trend[2], up: !current.trend[2].startsWith('−'), icon: <Calendar className="w-3 h-3" strokeWidth={1.8} /> },
    { l: 'NPS', v: current.nps, trend: current.trend[3], up: true, icon: <Star className="w-3 h-3" strokeWidth={1.8} /> },
  ];

  const activity = [
    { t: 'agora', icon: <Calendar className="w-2.5 h-2.5" strokeWidth={2} />, label: 'Reserva confirmada · Q2' },
    { t: 'há 2m', icon: <CreditCard className="w-2.5 h-2.5" strokeWidth={2} />, label: 'Pix recebido R$ 280' },
    { t: 'há 5m', icon: <Users className="w-2.5 h-2.5" strokeWidth={2} />, label: 'Sofia A. matriculou-se' },
    { t: 'há 12m', icon: <Repeat className="w-2.5 h-2.5" strokeWidth={2} />, label: 'Reposição agendada' },
    { t: 'há 24m', icon: <Trophy className="w-2.5 h-2.5" strokeWidth={2} />, label: 'Meta de receita atingida' },
  ];

  return (
    <MockupChrome
      activeNav={0}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Painel</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">Multi-Arena</span></>}
          search="Buscar arena, aluno, transação"
          badge={<TabSwitch tabs={[...periods]} active={period} onChange={setPeriod} size="sm" />}
          actions={
            <button className="action-ring inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1f3dbc] text-white text-[0.55rem] font-mono uppercase tracking-wider hover:bg-[#2a4dd3] transition-colors">
              <Plus className="w-2.5 h-2.5" strokeWidth={2.5} /> Arena
            </button>
          }
        />
      }
      footer={
        <>
          <div className="flex items-center gap-3 text-zinc-500"><LiveBadge label="Operacional" /><span>Sync há 2s</span><span className="text-zinc-700">·</span><span>3 arenas online</span></div>
          <button className="font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1">Ver detalhes <ChevronRight className="w-2.5 h-2.5" /></button>
        </>
      }
    >
      {toastIdx >= 0 && <ActionToast key={toastIdx} icon={toastEvents[toastIdx].icon} label={toastEvents[toastIdx].msg} />}

      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {kpis.map((x) => (
          <div key={x.l} className="cell-hover rounded-md border border-zinc-800 bg-zinc-900/40 p-2 group cursor-pointer relative">
            <div className="flex items-center justify-between mb-0.5">
              <div className="text-zinc-500">{x.icon}</div>
              <div className={`text-[0.5rem] inline-flex items-center gap-0.5 ${x.up ? 'text-blue-400' : 'text-amber-400'}`}>
                {x.up ? <ArrowUpRight className="w-2 h-2" strokeWidth={2.5} /> : <ArrowDownRight className="w-2 h-2" strokeWidth={2.5} />}
                {x.trend}
              </div>
            </div>
            <div className="text-[0.5rem] uppercase tracking-wider text-zinc-600">{x.l}</div>
            <div key={`${period}-${x.l}`} className="font-display text-base font-semibold text-white tracking-[-0.02em] tabular-nums number-morph">{x.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-2 flex-1 min-h-0">
        {/* Arenas list */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-zinc-800/80">
            <Eyebrow>Arenas · 3</Eyebrow>
            <button className="text-[0.55rem] font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1">
              <Filter className="w-2.5 h-2.5" strokeWidth={2} /> Filtrar
            </button>
          </div>
          <div className="flex-1 p-1.5 space-y-1 overflow-hidden">
            {arenas.map((a, i) => (
              <div
                key={a.name}
                onMouseEnter={() => setHoverArena(i)}
                onMouseLeave={() => setHoverArena(null)}
                className={`group flex items-center gap-2 rounded-md border bg-zinc-900/40 px-2 py-1.5 transition-all duration-500 cursor-pointer ${
                  cursor === i || hoverArena === i ? 'border-[#1f3dbc]/50 bg-[#1f3dbc]/[0.08]' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.up ? 'bg-blue-500' : 'bg-amber-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate flex items-center gap-1.5">
                    {a.name}
                    <span className="font-mono text-[0.5rem] text-zinc-500">· {a.aulas} aulas</span>
                  </div>
                  <div className="text-[0.55rem] text-zinc-500 flex items-center gap-1">
                    <MapPin className="w-2 h-2" strokeWidth={1.8} /> {a.city}
                  </div>
                </div>
                <Sparkline values={a.sparkline} className="h-5 hidden md:flex" barClass={a.up ? 'bg-zinc-400' : 'bg-zinc-600'} />
                <div className="text-right">
                  <div className="font-display text-xs font-semibold text-white tabular-nums">{a.kpi}</div>
                  <div className={`text-[0.5rem] font-mono ${a.up ? 'text-blue-400' : 'text-amber-400'}`}>{a.occ} · {a.delta}</div>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><Eye className="w-2.5 h-2.5 text-zinc-400" strokeWidth={1.8} /></button>
                  <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><MoreHorizontal className="w-2.5 h-2.5 text-zinc-400" strokeWidth={1.8} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-zinc-800/80">
            <div className="flex items-center gap-1.5">
              <Inbox className="w-2.5 h-2.5 text-zinc-500" strokeWidth={2} />
              <Eyebrow>Atividade ao vivo</Eyebrow>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" />
          </div>
          <div className="flex-1 px-1.5 py-1 space-y-0.5 overflow-hidden">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2 px-1.5 py-1 rounded hover:bg-white/[0.03] transition-colors">
                <div className="w-5 h-5 rounded bg-[#1f3dbc]/15 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.6rem] text-zinc-300 truncate">{a.label}</div>
                  <div className="text-[0.5rem] font-mono text-zinc-600">{a.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                     2. FINANCEIRO                            */
/* ════════════════════════════════════════════════════════════ */
export function FinancialMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const views = ['Diário', 'Semanal', 'Mensal'] as const;
  const [view, setView] = useState(0);
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const subTabs = ['Visão Geral', 'Receitas', 'Despesas', 'DRE'] as const;
  const [subTab, setSubTab] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSubTab((s) => (s + 1) % subTabs.length), 5800);
    return () => clearInterval(id);
  }, []);

  const datasets = [
    { heights: [40, 65, 50, 78, 55, 90, 72, 85, 60, 95, 70, 88], labels: ['1','3','5','7','9','11','13','15','17','19','21','23'], values: [4.8, 6.4, 5.0, 7.2, 5.5, 8.4, 6.9, 7.8, 6.0, 9.1, 6.7, 8.2] },
    { heights: [55, 70, 60, 80, 75, 92, 68], labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], values: [12, 16, 14, 18, 17, 21, 15] },
    { heights: [45, 60, 55, 70, 65, 80, 75, 88, 70, 85, 92, 80], labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'], values: [122, 148, 138, 167, 154, 184, 174, 198, 168, 192, 210, 184] },
  ];

  const kpisByView = [
    [{ l: 'Receita', v: 'R$ 8.4k', trend: '+4.1%', up: true }, { l: 'Despesa', v: 'R$ 3.2k', trend: '+1.2%', up: false }, { l: 'Líquido', v: 'R$ 5.2k', trend: '+6.8%', up: true }],
    [{ l: 'Receita', v: 'R$ 42k', trend: '+9.2%', up: true }, { l: 'Despesa', v: 'R$ 18k', trend: '+2.4%', up: false }, { l: 'Líquido', v: 'R$ 24k', trend: '+15.1%', up: true }],
    [{ l: 'Receita', v: 'R$ 184k', trend: '+12.4%', up: true }, { l: 'Despesa', v: 'R$ 92k', trend: '+3.1%', up: false }, { l: 'Líquido', v: 'R$ 92k', trend: '+18.7%', up: true }],
  ];

  useEffect(() => {
    const id = setInterval(() => setView((v) => (v + 1) % 3), 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll<HTMLElement>('[data-bar]');
    bars.forEach((b, i) => {
      const baseH = parseFloat(b.dataset.h ?? '50');
      gsap.fromTo(b, { height: '0%' }, { height: `${baseH}%`, duration: 0.7 + i * 0.04, ease: 'power3.out', delay: i * 0.04 });
    });
  }, [view]);

  const tx = [
    { l: '+R$ 280', who: 'Mariana S.', t: 'Pix' },
    { l: '+R$ 380', who: 'Rafael C.', t: 'Cartão' },
    { l: '−R$ 120', who: 'Aluguel', t: 'Despesa' },
    { l: '+R$ 320', who: 'Juliana R.', t: 'Pix' },
    { l: '+R$ 180', who: 'Day-use', t: 'Pix' },
  ];

  const heights = datasets[view].heights;
  const labels = datasets[view].labels;
  const values = datasets[view].values;
  const dayCursor = useCycle(heights.length, 2200);
  const activeBar = hoverBar !== null ? hoverBar : dayCursor;

  // Categorias de despesa
  const expenses = [
    { l: 'Aluguel', v: 'R$ 32k', pct: 34, color: 'bg-[#1f3dbc]' },
    { l: 'Folha', v: 'R$ 28k', pct: 30, color: 'bg-blue-400' },
    { l: 'Manutenção', v: 'R$ 14k', pct: 15, color: 'bg-cyan-400' },
    { l: 'Marketing', v: 'R$ 12k', pct: 13, color: 'bg-zinc-400' },
    { l: 'Outros', v: 'R$ 6k', pct: 8, color: 'bg-zinc-600' },
  ];

  return (
    <MockupChrome
      activeNav={2}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Financeiro</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">{subTabs[subTab]}</span></>}
          search="Buscar transação"
          actions={
            <button className="chip-hover inline-flex items-center gap-1 border border-zinc-700 rounded px-2 py-1 text-[0.55rem] font-mono uppercase tracking-wider text-zinc-400">
              <Download className="w-2.5 h-2.5" strokeWidth={2} /> CSV
            </button>
          }
        />
      }
      footer={
        <div className="overflow-hidden flex items-center gap-2 w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot flex-shrink-0" />
          <span className="font-mono text-[0.5rem] tracking-[0.25em] uppercase text-zinc-500 flex-shrink-0">Live</span>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-track gap-5">
              {[...tx, ...tx].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[0.55rem] whitespace-nowrap">
                  <span className={`font-display font-semibold tabular-nums ${t.l.startsWith('+') ? 'text-blue-400' : 'text-zinc-400'}`}>{t.l}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-300">{t.who}</span>
                  <span className="font-mono text-[0.45rem] text-zinc-600 uppercase tracking-wider">{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5 bg-zinc-900/60 border border-zinc-800 rounded-md p-0.5">
          {subTabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setSubTab(i)}
              className={`px-2 py-0.5 text-[0.55rem] font-mono uppercase tracking-wider rounded transition-colors ${
                subTab === i ? 'bg-[#1f3dbc] text-white shadow-[0_0_10px_rgba(31,61,188,0.4)]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <TabSwitch tabs={[...views]} active={view} onChange={setView} size="sm" />
      </div>

      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {kpisByView[view].map((x) => (
          <div key={x.l} className="cell-hover rounded-md border border-zinc-800 bg-zinc-900/40 p-2">
            <div className="text-[0.5rem] uppercase tracking-wider text-zinc-600 mb-0.5">{x.l}</div>
            <div key={`${view}-${x.l}`} className="font-display text-base font-semibold text-white tracking-[-0.02em] tabular-nums number-morph">{x.v}</div>
            <div className={`text-[0.5rem] mt-0.5 inline-flex items-center gap-0.5 ${x.up ? 'text-blue-400' : 'text-amber-400'}`}>
              {x.up ? <ArrowUpRight className="w-2 h-2" strokeWidth={2.5} /> : <ArrowDownRight className="w-2 h-2" strokeWidth={2.5} />}
              {x.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.6fr_1fr] gap-2 flex-1 min-h-0">
        {/* Bar chart */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-1.5">
            <Eyebrow>Receita {views[view].toLowerCase()}</Eyebrow>
            <div className="flex items-center gap-2 text-[0.5rem] font-mono text-zinc-400">
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-zinc-200" /> Real</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-[#1f3dbc]" /> Hoje</span>
            </div>
          </div>
          <div ref={ref} key={view} className="relative flex-1 min-h-[60px] flex items-end gap-1 mb-1">
            {/* Y-axis grid lines */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
              {[100, 75, 50, 25, 0].map((y) => (
                <div key={y} className="border-t border-zinc-800/40 relative">
                  <span className="absolute -left-0.5 -top-1.5 text-[0.45rem] font-mono text-zinc-700">{y}</span>
                </div>
              ))}
            </div>
            {heights.map((h, i) => (
              <div
                key={i}
                className="relative flex-1 flex flex-col justify-end h-full"
                onMouseEnter={() => setHoverBar(i)}
                onMouseLeave={() => setHoverBar(null)}
              >
                {activeBar === i && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 tooltip-pop bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-[0.5rem] font-mono whitespace-nowrap z-10 pointer-events-none shadow-lg">
                    R$ {values[i]}k
                  </div>
                )}
                <div
                  data-bar data-h={h}
                  className={`bar-hover w-full rounded-t transition-all duration-300 ${activeBar === i ? 'bg-[#1f3dbc] shadow-[0_0_12px_rgba(31,61,188,0.6)]' : 'bg-zinc-300/85'}`}
                  style={{ height: `${h}%`, opacity: activeBar === i ? 1 : 0.4 + i * 0.04 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between px-0.5">
            {labels.map((l, i) => (
              <span key={l} className={`text-[0.5rem] font-mono tabular-nums transition-colors ${activeBar === i ? 'text-white' : 'text-zinc-600'}`}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Despesas breakdown */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <Eyebrow>Despesas</Eyebrow>
            <span className="font-mono text-[0.55rem] text-zinc-400">R$ 92k</span>
          </div>
          <div className="flex h-1.5 rounded-full overflow-hidden mb-2 bg-zinc-800">
            {expenses.map((e) => (
              <div key={e.l} className={`${e.color} transition-all duration-700`} style={{ width: `${e.pct}%` }} />
            ))}
          </div>
          <div className="space-y-0.5 flex-1">
            {expenses.map((e) => (
              <div key={e.l} className="flex items-center justify-between text-[0.55rem] py-0.5 hover:bg-white/[0.03] rounded px-1 transition-colors cursor-pointer">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-1.5 h-1.5 rounded-sm ${e.color} flex-shrink-0`} />
                  <span className="text-zinc-300 truncate">{e.l}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="font-display text-zinc-200 tabular-nums">{e.v}</span>
                  <span className="font-mono text-zinc-600 w-7 text-right">{e.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                       3. ALUNOS                              */
/* ════════════════════════════════════════════════════════════ */
export function StudentsMockup() {
  const filters = ['Todos', 'Ativos', 'Em risco', 'Novos'] as const;
  const [filter, setFilter] = useState(0);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'plan'>('score');

  useEffect(() => {
    const id = setInterval(() => setFilter((f) => (f + 1) % filters.length), 4500);
    return () => clearInterval(id);
  }, []);

  const allStudents = [
    { name: 'Mariana Silva', plan: 'Mensal · 2x/sem', risk: 'Em dia', s: 'green' as const, score: 92, type: 'ativo', msgs: 0, since: '08/2024' },
    { name: 'Sofia Almeida', plan: 'Mensal · 1x/sem', risk: 'Novo', s: 'green' as const, score: 100, type: 'novo', msgs: 2, since: '12/2025' },
    { name: 'Carlos Mendes', plan: 'Pacote 8 aulas', risk: 'Renovar', s: 'amber' as const, score: 64, type: 'risco', msgs: 1, since: '03/2025' },
    { name: 'Juliana Rocha', plan: 'Trimestral', risk: 'Em dia', s: 'green' as const, score: 88, type: 'ativo', msgs: 0, since: '06/2024' },
    { name: 'Gustavo Lima', plan: 'Pacote 4', risk: 'Novo', s: 'green' as const, score: 100, type: 'novo', msgs: 1, since: '01/2026' },
    { name: 'Pedro Barros', plan: 'Mensal', risk: 'Atrasado', s: 'amber' as const, score: 42, type: 'risco', msgs: 3, since: '11/2024' },
    { name: 'Rafael Costa', plan: 'Day-use', risk: 'Em dia', s: 'green' as const, score: 78, type: 'ativo', msgs: 0, since: '02/2025' },
  ];

  const filterTypes = [null, 'ativo', 'risco', 'novo'];
  const visible = filter === 0 ? allStudents.slice(0, 5) : allStudents.filter((s) => s.type === filterTypes[filter]).slice(0, 5);

  const counts: Record<string, number> = {
    'Todos': allStudents.length,
    'Ativos': allStudents.filter((s) => s.type === 'ativo').length,
    'Em risco': allStudents.filter((s) => s.type === 'risco').length,
    'Novos': allStudents.filter((s) => s.type === 'novo').length,
  };

  return (
    <MockupChrome
      activeNav={3}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Alunos</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">Diretório</span></>}
          search="Buscar por nome, plano, status"
          actions={
            <button className="action-ring inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#1f3dbc] text-white text-[0.55rem] font-mono uppercase tracking-wider hover:bg-[#2a4dd3] transition-colors">
              <Plus className="w-2.5 h-2.5" strokeWidth={2.5} /> Aluno
            </button>
          }
        />
      }
      footer={
        <>
          <div className="flex items-center gap-2 text-zinc-500"><span>{visible.length} de {counts[filters[filter]]} alunos</span><span className="text-zinc-700">·</span><span>Pág 1/3</span></div>
          <div className="flex items-center gap-1">
            <button className="font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1"><Download className="w-2.5 h-2.5" /> Exportar</button>
          </div>
        </>
      }
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(i)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.55rem] font-mono uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                filter === i
                  ? 'bg-[#1f3dbc] text-white border border-[#1f3dbc] shadow-[0_0_14px_rgba(31,61,188,0.45)]'
                  : 'bg-zinc-900/60 text-zinc-500 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {f}
              <span className={`text-[0.5rem] tabular-nums ${filter === i ? 'text-blue-100' : 'text-zinc-600'}`}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[0.55rem] text-blue-400">+18% / mês</span>
        </div>
      </div>

      <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex-1 min-h-0 flex flex-col">
        {/* Table header */}
        <div className="grid grid-cols-[24px_1.6fr_1.2fr_60px_70px_70px_60px] gap-2 px-2 py-1 border-b border-zinc-800/80 text-[0.5rem] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
          <div></div>
          <button onClick={() => setSortBy('name')} className={`flex items-center gap-0.5 hover:text-zinc-200 transition-colors ${sortBy === 'name' ? 'text-zinc-200' : ''}`}>
            Nome <ArrowUpDown className="w-2 h-2" />
          </button>
          <button onClick={() => setSortBy('plan')} className={`flex items-center gap-0.5 hover:text-zinc-200 transition-colors ${sortBy === 'plan' ? 'text-zinc-200' : ''}`}>
            Plano <ArrowUpDown className="w-2 h-2" />
          </button>
          <div>Desde</div>
          <button onClick={() => setSortBy('score')} className={`flex items-center gap-0.5 hover:text-zinc-200 transition-colors ${sortBy === 'score' ? 'text-zinc-200' : ''}`}>
            Score <ArrowUpDown className="w-2 h-2" />
          </button>
          <div>Status</div>
          <div className="text-right">Ações</div>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-hidden">
          {visible.map((a, i) => (
            <div
              key={`${filter}-${a.name}`}
              onMouseEnter={() => setHoverRow(i)}
              onMouseLeave={() => setHoverRow(null)}
              className={`group grid grid-cols-[24px_1.6fr_1.2fr_60px_70px_70px_60px] gap-2 px-2 py-1.5 border-b border-zinc-800/40 last:border-b-0 number-morph cursor-pointer transition-all duration-300 items-center ${
                hoverRow === i ? 'bg-[#1f3dbc]/[0.08]' : ''
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-200 font-medium text-[0.55rem]">
                {a.name[0]}
                {a.msgs > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1f3dbc] text-white text-[0.4rem] rounded-full flex items-center justify-center font-bold">
                    {a.msgs}
                  </span>
                )}
              </div>
              <div className="text-[0.65rem] font-medium truncate flex items-center gap-1">
                {a.name}
                {a.type === 'novo' && <span className="text-[0.45rem] font-mono uppercase tracking-wider text-blue-400 bg-[#1f3dbc]/15 px-1 rounded">Novo</span>}
              </div>
              <div className="text-[0.55rem] text-zinc-500 truncate">{a.plan}</div>
              <div className="text-[0.55rem] font-mono text-zinc-400 tabular-nums">{a.since}</div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${a.score > 75 ? 'bg-blue-500' : 'bg-amber-400'}`} style={{ width: `${a.score}%` }} />
                </div>
                <span className="text-[0.55rem] font-mono text-zinc-300 tabular-nums">{a.score}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[0.5rem] font-mono uppercase tracking-wider text-zinc-400">
                <span className={`w-1.5 h-1.5 rounded-full ${a.s === 'green' ? 'bg-blue-500' : 'bg-amber-400'}`} />
                {a.risk}
              </span>
              <div className={`flex items-center justify-end gap-0.5 transition-opacity ${hoverRow === i ? 'opacity-100' : 'opacity-30'}`}>
                <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><MessageCircle className="w-2.5 h-2.5 text-zinc-400" strokeWidth={1.8} /></button>
                <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><Edit3 className="w-2.5 h-2.5 text-zinc-400" strokeWidth={1.8} /></button>
                <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center"><MoreHorizontal className="w-2.5 h-2.5 text-zinc-400" strokeWidth={1.8} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                      4. COBRANÇA                             */
/* ════════════════════════════════════════════════════════════ */
export function BillingMockup() {
  const total = useTickingValue(184320, 200, 2400);
  const [topState, setTopState] = useState(0);
  useEffect(() => {
    const seq = [{ wait: 2000, next: 1 }, { wait: 1800, next: 2 }, { wait: 3500, next: 0 }];
    let timer: ReturnType<typeof setTimeout>;
    const tick = (s: number) => {
      setTopState(s);
      timer = setTimeout(() => tick(seq[s].next), seq[s].wait);
    };
    tick(0);
    return () => clearTimeout(timer);
  }, []);

  const cobrancas = [
    { l: 'Cartão · Rafael Costa', v: 'R$ 380', s: 'Pago', c: 'emerald', method: 'card', when: 'há 4m' },
    { l: 'Boleto · Pedro Lima', v: 'R$ 240', s: 'Atraso', c: 'amber', method: 'boleto', retry: true, when: '5d' },
    { l: 'Pix · Juliana Rocha', v: 'R$ 320', s: 'Pago', c: 'emerald', method: 'pix', when: 'há 12m' },
    { l: 'Pix · Mariana Silva', v: 'R$ 280', s: 'Pago', c: 'emerald', method: 'pix', when: 'hoje' },
  ];

  const [showWebhook, setShowWebhook] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setShowWebhook(true);
      setTimeout(() => setShowWebhook(false), 1800);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Mini pie for payment methods
  const methods = [
    { l: 'Pix', pct: 64, color: 'bg-[#1f3dbc]' },
    { l: 'Cartão', pct: 26, color: 'bg-blue-400' },
    { l: 'Boleto', pct: 10, color: 'bg-zinc-500' },
  ];

  return (
    <MockupChrome
      activeNav={4}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Cobrança</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">Asaas · Maio</span></>}
          search="Buscar cobrança"
          badge={<LiveBadge label="95% baixa" />}
          actions={
            <button className="chip-hover inline-flex items-center gap-1 border border-zinc-700 rounded px-2 py-1 text-[0.55rem] font-mono uppercase tracking-wider text-zinc-400">
              <Plus className="w-2.5 h-2.5" strokeWidth={2.5} /> Cobrar
            </button>
          }
        />
      }
      footer={
        <>
          <div className="flex items-center gap-2 text-zinc-500">
            <Activity className="w-2.5 h-2.5 text-blue-400 webhook-flash" strokeWidth={2.5} />
            <span>Webhook Asaas · 200 OK</span>
            <span className="text-zinc-700">·</span>
            <span>Última msg há 6s</span>
          </div>
          <button className="font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1">Ver todas <ChevronRight className="w-2.5 h-2.5" /></button>
        </>
      }
    >
      {showWebhook && <ActionToast icon={<Activity className="w-2.5 h-2.5" strokeWidth={2.5} />} label="POST /webhook/asaas · payment.received" />}

      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[
          { l: 'Recebido', v: `R$ ${(total / 1000).toFixed(1)}k`, sub: '+R$ 280 hoje', up: true },
          { l: 'Pendente', v: 'R$ 8.4k', sub: '12 cobranças', up: false },
          { l: 'Atraso', v: 'R$ 2.1k', sub: '3 alunos', amber: true },
        ].map((x) => (
          <div key={x.l} className="cell-hover rounded-md border border-zinc-800 bg-zinc-900/40 p-2 cursor-pointer">
            <div className="flex items-center justify-between mb-0.5">
              <div className="text-[0.5rem] uppercase tracking-wider text-zinc-600">{x.l}</div>
              {x.amber && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot-amber" />}
            </div>
            <div className="font-display text-base font-semibold text-white tracking-[-0.02em] tabular-nums">{x.v}</div>
            <div className="text-[0.5rem] text-zinc-500 mt-0.5">{x.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-2 flex-1 min-h-0">
        {/* Lista cobranças */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 border-b border-zinc-800/80 flex items-center justify-between">
            <Eyebrow>Stream ao vivo</Eyebrow>
            <span className="text-[0.5rem] font-mono text-zinc-500">5 últimas</span>
          </div>
          <div className="flex-1 p-1.5 space-y-1 overflow-hidden">
            <div className={`group flex items-center gap-2 rounded-md border bg-zinc-900/60 px-2 py-1.5 text-xs transition-all duration-500 ${
              topState === 2 ? 'border-blue-500/50 bg-[#1f3dbc]/[0.08]' : 'border-zinc-700'
            }`}>
              <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[0.45rem] font-mono uppercase tracking-wider text-zinc-300">Pix</div>
              <div className="flex-1 text-zinc-200 truncate">Pix · Lucas Dias</div>
              <div className="font-display font-semibold text-white tabular-nums text-[0.7rem]">R$ 280</div>
              <span className="inline-flex items-center gap-1 text-[0.5rem] font-mono uppercase tracking-wider min-w-[78px] justify-end">
                {topState === 0 && (<><span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /><span className="text-zinc-400">Pendente</span></>)}
                {topState === 1 && (<><Loader2 className="w-2.5 h-2.5 text-zinc-300 spin-slow" strokeWidth={2.2} /><span className="text-zinc-300">Process...</span></>)}
                {topState === 2 && (<><span className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-dot" /><span className="text-blue-400">Pago</span></>)}
              </span>
              {topState === 2 && <span className="text-[0.5rem] font-mono text-blue-400 number-morph">há 1s</span>}
            </div>
            {cobrancas.map((c) => (
              <div key={c.l} className="group flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1.5 text-xs hover:border-[#1f3dbc]/40 hover:bg-[#1f3dbc]/[0.06] transition-all">
                <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[0.45rem] font-mono uppercase tracking-wider text-zinc-300">
                  {c.method === 'pix' ? 'Pix' : c.method === 'card' ? 'Card' : 'Bol'}
                </div>
                <div className="flex-1 text-zinc-300 truncate">{c.l}</div>
                <span className="text-[0.45rem] font-mono text-zinc-600">{c.when}</span>
                <div className="font-display font-semibold text-white tabular-nums text-[0.7rem]">{c.v}</div>
                <span className="inline-flex items-center gap-1 text-[0.5rem] font-mono uppercase tracking-wider text-zinc-400 min-w-[64px] justify-end">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    c.c === 'emerald' ? 'bg-blue-500 pulse-dot' :
                    c.c === 'amber' ? 'bg-amber-400 pulse-dot-amber' : 'bg-zinc-500'
                  }`} />
                  {c.s}
                </span>
                {c.retry && (
                  <button className="text-[0.45rem] font-mono uppercase tracking-wider text-amber-400 px-1.5 py-0.5 border border-amber-500/40 rounded hover:bg-amber-500/10 transition-colors opacity-0 group-hover:opacity-100">
                    Reenviar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Métodos de pagamento */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5 flex flex-col">
          <Eyebrow className="mb-2">Métodos</Eyebrow>
          <div className="flex h-1.5 rounded-full overflow-hidden mb-2 bg-zinc-800">
            {methods.map((m) => (
              <div key={m.l} className={`${m.color} transition-all duration-700`} style={{ width: `${m.pct}%` }} />
            ))}
          </div>
          <div className="space-y-1 flex-1">
            {methods.map((m) => (
              <div key={m.l} className="flex items-center justify-between text-[0.55rem] py-0.5 hover:bg-white/[0.03] rounded px-1 cursor-pointer transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-sm ${m.color}`} />
                  <span className="text-zinc-300">{m.l}</span>
                </div>
                <span className="font-mono text-zinc-400 tabular-nums">{m.pct}%</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-2 mt-2">
            <Eyebrow className="mb-1">Régua de cobrança</Eyebrow>
            <div className="space-y-0.5 text-[0.55rem]">
              {[
                { d: 'Lembrete', x: '−3 dias' },
                { d: 'Vencimento', x: 'D 0' },
                { d: 'Atraso 1', x: '+1 dia' },
                { d: 'Atraso 2', x: '+5 dias' },
              ].map((r) => (
                <div key={r.d} className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1"><Clock className="w-2 h-2" strokeWidth={2} />{r.d}</span>
                  <span className="font-mono text-zinc-500">{r.x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                    5. AGENDAMENTO                            */
/* ════════════════════════════════════════════════════════════ */
export function CalendarMockup() {
  const views = ['Dia', 'Semana'] as const;
  const [view, setView] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setView((v) => (v + 1) % views.length), 6500);
    return () => clearInterval(id);
  }, []);

  const cells = ['07h', '08h', '09h', '18h', '19h', '20h', '21h'];
  const courts = ['Q1', 'Q2', 'Q3', 'Q4'];
  const totalCells = cells.length * courts.length;
  const cursor = useCycle(totalCells, 1700);
  const [hover, setHover] = useState<number | null>(null);

  const [bookingCell, setBookingCell] = useState<number | null>(null);
  const [bookingEvent, setBookingEvent] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      const candidates: number[] = [];
      for (let i = 0; i < totalCells; i++) {
        const r = Math.floor(i / courts.length);
        const c = i % courts.length;
        if ((r + c) % 4 === 1) candidates.push(i);
      }
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      setBookingCell(pick);
      setBookingEvent(true);
      setTimeout(() => { setBookingCell(null); setBookingEvent(false); }, 1500);
    }, 4500);
    return () => clearInterval(id);
  }, [totalCells]);

  const waitlist = [
    { name: 'Sofia A.', want: 'Q2 · 19h', when: 'há 3m' },
    { name: 'Lucas D.', want: 'Q1 · 20h', when: 'há 8m' },
    { name: 'Camila R.', want: 'Q3 · 09h', when: 'há 15m' },
  ];

  return (
    <MockupChrome
      activeNav={5}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Agenda</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">Sex 14/05</span><span className="text-zinc-700 mx-1">·</span><span className="text-zinc-500">Vila Olímpia</span></>}
          search="Buscar reserva"
          badge={<LiveBadge label="87% ocup." />}
          actions={
            <>
              <div className="flex items-center bg-zinc-900/60 border border-zinc-800 rounded p-0.5 gap-0.5">
                <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-zinc-400"><ChevronLeft className="w-2.5 h-2.5" strokeWidth={2} /></button>
                <button className="px-1.5 text-[0.55rem] font-mono uppercase tracking-wider text-zinc-300 hover:text-white">Hoje</button>
                <button className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-zinc-400"><ChevronRight className="w-2.5 h-2.5" strokeWidth={2} /></button>
              </div>
              <TabSwitch tabs={[...views]} active={view} onChange={setView} size="sm" />
            </>
          }
        />
      }
      footer={
        <>
          <div className="flex items-center gap-2 text-zinc-500"><span>24 reservas hoje</span><span className="text-zinc-700">·</span><span>3 lista de espera</span><span className="text-zinc-700">·</span><span>2 bloqueios</span></div>
          <button className="font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1">Bloquear horário <Plus className="w-2.5 h-2.5" /></button>
        </>
      }
    >
      {bookingEvent && <ActionToast icon={<Plus className="w-2.5 h-2.5" strokeWidth={2.5} />} label="Nova reserva confirmada" />}

      <div className="grid grid-cols-[2fr_1fr] gap-2 flex-1 min-h-0">
        {/* Grid principal */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5 flex flex-col">
          <div className="grid grid-cols-[24px_repeat(4,1fr)] gap-1 text-xs flex-1">
            <div />
            {courts.map((c) => (
              <div key={c} className="text-center pb-1 font-mono text-[0.55rem] text-zinc-400 uppercase tracking-wider">{c}</div>
            ))}
            {cells.flatMap((h, row) => [
              <div key={`h-${h}`} className="text-zinc-600 py-0.5 font-mono text-[0.55rem]">{h}</div>,
              ...courts.map((_, col) => {
                const idx = row * courts.length + col;
                const filled = (row + col) % 4 !== 1;
                const isCursor = cursor === idx;
                const isHover = hover === idx;
                const isBooking = bookingCell === idx;
                return (
                  <div
                    key={`${h}-${col}`}
                    onMouseEnter={() => setHover(idx)}
                    onMouseLeave={() => setHover(null)}
                    className={`relative h-5 rounded transition-all duration-300 cursor-pointer ${
                      isBooking ? 'cell-booking border'
                        : isHover && !filled ? 'bg-[#1f3dbc]/30 ring-1 ring-[#1f3dbc] ring-inset'
                        : (isCursor || isHover) && filled ? 'bg-[#1f3dbc] ring-1 ring-[#1f3dbc] scale-110 shadow-[0_0_12px_rgba(31,61,188,0.6)]'
                        : filled ? 'bg-zinc-200/85'
                        : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {isHover && !filled && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 tooltip-pop bg-zinc-900 border border-zinc-700 rounded px-1 text-[0.5rem] font-mono whitespace-nowrap text-blue-300 z-10">
                        + Reservar
                      </span>
                    )}
                  </div>
                );
              }),
            ])}
          </div>
        </div>

        {/* Painel direito */}
        <div className="flex flex-col gap-2 min-h-0">
          {/* Stats */}
          <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5">
            <Eyebrow className="mb-1.5">Hoje</Eyebrow>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="rounded bg-zinc-900/40 p-1.5">
                <div className="text-[0.5rem] uppercase text-zinc-500">Reservas</div>
                <div className="font-display text-sm font-semibold tabular-nums">24</div>
                <div className="text-[0.5rem] text-blue-400">+3</div>
              </div>
              <div className="rounded bg-zinc-900/40 p-1.5">
                <div className="text-[0.5rem] uppercase text-zinc-500">Ocupação</div>
                <div className="font-display text-sm font-semibold tabular-nums">87%</div>
                <div className="text-[0.5rem] text-blue-400">+5%</div>
              </div>
            </div>
          </div>
          {/* Lista de espera */}
          <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="px-2.5 py-1.5 border-b border-zinc-800/80 flex items-center justify-between">
              <Eyebrow>Lista de espera</Eyebrow>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot-amber" />
            </div>
            <div className="flex-1 p-1.5 space-y-1 overflow-hidden">
              {waitlist.map((w, i) => (
                <div key={i} className="group flex items-center gap-1.5 rounded bg-zinc-900/40 px-1.5 py-1 hover:bg-[#1f3dbc]/[0.08] transition-colors cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[0.5rem] font-medium text-zinc-200">{w.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.55rem] font-medium truncate">{w.name}</div>
                    <div className="text-[0.45rem] font-mono text-zinc-500">{w.want} · {w.when}</div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-[0.45rem] font-mono uppercase tracking-wider text-blue-400 hover:text-white transition-all">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                     6. REPOSIÇÃO                             */
/* ════════════════════════════════════════════════════════════ */
export function MakeupMockup() {
  const slots = [
    { day: 'Seg', date: '15', time: '19:00', q: 'Q2 · Lucas', avail: true },
    { day: 'Qui', date: '18', time: '20:00', q: 'Q1 · Lucas', avail: true },
    { day: 'Sáb', date: '20', time: '09:00', q: 'Q3 · Camila', avail: true },
    { day: 'Sáb', date: '20', time: '11:00', q: 'Q1 · Camila', avail: false },
  ];
  const focused = useCycle(slots.length, 2300);
  const [hover, setHover] = useState<number | null>(null);

  const history = [
    { d: '12/05 · 19h', q: 'Q2 · Lucas', s: 'Confirmada', upcoming: true },
    { d: '08/05 · 20h', q: 'Q1 · Lucas', s: 'Realizada' },
    { d: '03/05 · 18h', q: 'Q3 · Camila', s: 'Realizada' },
    { d: '28/04 · 19h', q: 'Q1 · Lucas', s: 'Falta', amber: true },
  ];

  return (
    <MockupChrome
      activeNav={6}
      header={
        <MockupHeader
          breadcrumb={<><span className="text-zinc-500">Reposição</span><ChevronRight className="w-2.5 h-2.5 text-zinc-700" /><span className="text-zinc-200 font-semibold">Mariana Silva</span><span className="text-zinc-700 mx-1">·</span><span className="text-zinc-500">Mensal · 2x/sem</span></>}
          search="Outro aluno"
          badge={<LiveBadge label="Atualizado" />}
          actions={
            <button className="chip-hover inline-flex items-center gap-1 border border-zinc-700 rounded px-2 py-1 text-[0.55rem] font-mono uppercase tracking-wider text-zinc-400">
              <FileText className="w-2.5 h-2.5" /> Política
            </button>
          }
        />
      }
      footer={
        <>
          <div className="flex items-center gap-2 text-zinc-500"><span>Saldo válido até 14/06/2026</span><span className="text-zinc-700">·</span><span>Limite mensal: 4 reposições</span></div>
          <button className="font-mono uppercase tracking-wider text-zinc-400 hover:text-white inline-flex items-center gap-1">Histórico completo <ChevronRight className="w-2.5 h-2.5" /></button>
        </>
      }
    >
      <div className="grid grid-cols-[1fr_1.6fr_1fr] gap-2 flex-1 min-h-0">
        {/* Saldo card */}
        <div className="rounded-xl border border-[#1f3dbc]/30 bg-gradient-to-br from-[#1f3dbc]/15 to-zinc-950 p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="row-sweep absolute inset-0 pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between mb-1">
              <Eyebrow className="text-blue-300">Saldo</Eyebrow>
              <Award className="w-3.5 h-3.5 text-[#1f3dbc]" strokeWidth={1.5} />
            </div>
            <div className="font-display text-4xl font-semibold text-white tracking-[-0.05em] tabular-nums leading-none">02</div>
            <div className="text-[0.55rem] text-zinc-400 mt-0.5">disponíveis</div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-blue-500/20 rounded-md overflow-hidden relative">
            {[
              { l: 'Disp.', v: '02', accent: 'text-blue-300' },
              { l: 'Usadas', v: '04' },
              { l: 'Validade', v: '30d' },
            ].map((x) => (
              <div key={x.l} className="bg-zinc-950 p-1.5">
                <div className="text-[0.45rem] uppercase tracking-wider text-zinc-600">{x.l}</div>
                <div className={`font-display text-xs font-semibold tabular-nums ${x.accent || 'text-white'}`}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Slot picker */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 p-2.5 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <Eyebrow>Escolha um horário</Eyebrow>
            <span className="font-mono text-[0.55rem] text-zinc-500">{slots.filter((s) => s.avail).length} disponíveis</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
            {slots.map((s, i) => (
              <button
                key={i}
                disabled={!s.avail}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`text-left px-2 py-1.5 rounded-md border transition-all duration-300 relative ${
                  !s.avail ? 'border-zinc-800 bg-zinc-900/30 opacity-40'
                    : (hover === i || focused === i)
                    ? 'border-[#1f3dbc] bg-[#1f3dbc]/15 scale-[1.03] shadow-[0_0_20px_rgba(31,61,188,0.35)]'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-baseline justify-between mb-0.5">
                  <div className="text-[0.5rem] font-mono uppercase tracking-wider text-zinc-500">{s.day} · {s.date}/05</div>
                  {!s.avail && <span className="text-[0.45rem] text-zinc-600">Lotado</span>}
                  {(hover === i || focused === i) && s.avail && (
                    <span className="text-[0.45rem] font-mono text-blue-300 inline-flex items-center gap-0.5">
                      <Check className="w-2 h-2" strokeWidth={3} /> Confirmar
                    </span>
                  )}
                </div>
                <div className="font-display text-sm font-semibold text-white tracking-tight">{s.time}</div>
                <div className="text-[0.45rem] text-zinc-500 mt-0.5">{s.q}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Histórico timeline */}
        <div className="rounded-md border border-zinc-800 bg-zinc-900/30 overflow-hidden flex flex-col">
          <div className="px-2.5 py-1.5 border-b border-zinc-800/80 flex items-center justify-between">
            <Eyebrow>Histórico</Eyebrow>
            <Sparkles className="w-2.5 h-2.5 text-blue-400" strokeWidth={2} />
          </div>
          <div className="flex-1 p-1.5 space-y-1 overflow-hidden">
            {history.map((h, i, arr) => (
              <div key={i} className="flex items-start gap-1.5 relative">
                <div className="flex flex-col items-center pt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${h.upcoming ? 'bg-blue-500 pulse-dot' : h.amber ? 'bg-amber-400' : 'bg-zinc-600'}`} />
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-zinc-800 mt-0.5" style={{ minHeight: '14px' }} />}
                </div>
                <div className={`flex-1 rounded px-1.5 py-0.5 transition-colors ${h.upcoming ? 'bg-[#1f3dbc]/10' : 'hover:bg-white/[0.03]'}`}>
                  <div className="text-[0.55rem] font-medium flex items-center gap-1">
                    {h.d}
                    {h.upcoming && <span className="text-[0.45rem] font-mono uppercase text-blue-400">Próx</span>}
                  </div>
                  <div className="text-[0.45rem] text-zinc-500">{h.q}</div>
                  <div className={`text-[0.45rem] font-mono uppercase tracking-wider ${h.amber ? 'text-amber-400' : h.upcoming ? 'text-blue-400' : 'text-zinc-500'}`}>
                    {h.s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupChrome>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*                  PORTAL DO ALUNO (PHONE)                     */
/* ════════════════════════════════════════════════════════════ */
type Screen = 'home' | 'class' | 'billing';

export function PhoneMockup() {
  const [screen, setScreen] = useState<Screen>('home');
  const screenIdx = ['home', 'class', 'billing'].indexOf(screen);

  useEffect(() => {
    const seq: Screen[] = ['home', 'class', 'home', 'billing'];
    const durations = [6500, 5000, 5500, 5500];
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setScreen(seq[i]);
      timer = setTimeout(() => { i = (i + 1) % seq.length; tick(); }, durations[i]);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const [countdown, setCountdown] = useState({ h: 4, m: 32, s: 17 });
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => {
        let s = c.s - 1, m = c.m, h = c.h;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 4; m = 32; s = 17; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const [battery, setBattery] = useState(78);
  useEffect(() => {
    const id = setInterval(() => setBattery((b) => (b > 65 ? b - 1 : 78)), 5000);
    return () => clearInterval(id);
  }, []);

  const navMap: Record<Screen, number> = { home: 0, class: 0, billing: 2 };

  return (
    <div className="relative h-full mx-auto" style={{ aspectRatio: '9 / 19.5' }}>
      <div className="absolute -inset-4 bg-zinc-900/40 rounded-[3rem] blur-2xl pointer-events-none" />

      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-40 notif-anim w-[90%]">
        <div className="rounded-2xl bg-zinc-900/95 backdrop-blur border border-zinc-700 px-3.5 py-2.5 flex items-center gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-black flex-shrink-0">
            <Bell className="w-3.5 h-3.5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[0.65rem] font-semibold text-white">Visionário</div>
            <div className="text-[0.6rem] text-zinc-300 truncate">Sua aula começa em 30 minutos</div>
          </div>
          <span className="text-[0.55rem] font-mono text-zinc-500">agora</span>
        </div>
      </div>

      <div className="relative h-full rounded-[2.4rem] border-[3px] border-zinc-800 bg-black overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 border border-zinc-900" />

        <div className="px-7 pt-3 pb-1 flex items-center justify-between text-[0.6rem] font-mono text-zinc-300 relative z-10">
          <span className="font-semibold tabular-nums">09:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-[1.5px]">
              <div className="w-[2px] h-[3px] bg-zinc-300 rounded-sm" />
              <div className="w-[2px] h-[5px] bg-zinc-300 rounded-sm" />
              <div className="w-[2px] h-[7px] bg-zinc-300 rounded-sm" />
              <div className="w-[2px] h-[9px] bg-zinc-300 rounded-sm" />
            </div>
            <Wifi className="w-2.5 h-2.5 text-zinc-300" strokeWidth={2} />
            <div className="ml-0.5 w-5 h-2.5 border border-zinc-400 rounded-[2px] relative">
              <div className="absolute inset-y-[1px] left-[1px] bg-zinc-300 rounded-[1px] transition-[width] duration-700" style={{ width: `${battery}%` }} />
              <div className="absolute -right-[2px] top-[3px] w-[1px] h-[3px] bg-zinc-400 rounded-r" />
            </div>
          </div>
        </div>

        <div key={screen} className="screen-anim px-5 pt-5 pb-20">
          {screen === 'home' && <HomeScreen countdown={countdown} />}
          {screen === 'class' && <ClassDetailScreen />}
          {screen === 'billing' && <BillingScreen />}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800/80 bg-black/70 backdrop-blur-md px-6 py-3 flex items-center justify-between">
          {[Calendar, Repeat, CreditCard, Smartphone].map((Icon, i) => (
            <Icon key={i} className={`w-4 h-4 transition-colors duration-300 ${navMap[screen] === i ? 'text-white' : 'text-zinc-600'}`} strokeWidth={1.8} />
          ))}
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-700 rounded-full" />

        <div className="absolute top-12 right-4 z-20 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`block w-1 h-1 rounded-full transition-all duration-300 ${screenIdx === i ? 'bg-white w-3' : 'bg-zinc-700'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ countdown }: { countdown: { h: number; m: number; s: number } }) {
  return (
    <>
      <Eyebrow>Olá</Eyebrow>
      <h3 className="font-display text-2xl font-semibold mb-4 tracking-tight mt-1">
        Mariana<span className="text-blue-400">.</span>
      </h3>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 mb-3 relative overflow-hidden hover:border-[#1f3dbc]/40 transition-colors">
        <div className="row-sweep absolute inset-0 pointer-events-none" />
        <div className="flex items-center justify-between mb-2 relative">
          <Eyebrow>Próxima aula</Eyebrow>
          <LiveBadge label="Hoje" />
        </div>
        <div className="flex items-end gap-2 relative">
          <div className="font-display text-2xl font-semibold tracking-tight">19:00</div>
          <div className="text-[0.55rem] text-zinc-500 mb-1">14/05</div>
        </div>
        <div className="text-[0.65rem] text-zinc-500 mt-0.5 relative">Quadra 02 · Prof. Lucas</div>
        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between relative">
          <div className="text-[0.6rem] text-zinc-400 font-mono tabular-nums">
            Em <span className="text-white font-semibold">{String(countdown.h).padStart(2, '0')}:{String(countdown.m).padStart(2, '0')}:{String(countdown.s).padStart(2, '0')}</span>
          </div>
          <Calendar className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 hover:border-[#1f3dbc]/40 transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <Repeat className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
            <span className="text-[0.55rem] text-zinc-600 font-mono">REP</span>
          </div>
          <div className="font-display text-2xl font-semibold tracking-tight">02</div>
          <div className="text-[0.55rem] text-zinc-500 mt-0.5">Reposições</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 relative hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <CreditCard className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot-amber" />
          </div>
          <div className="font-display text-2xl font-semibold tracking-tight">01</div>
          <div className="text-[0.55rem] text-zinc-500 mt-0.5">Fatura aberta</div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden mb-3">
        <div className="px-3 py-2 border-b border-zinc-800/80 flex items-center justify-between">
          <Eyebrow>Próximas</Eyebrow>
          <ChevronRight className="w-3 h-3 text-zinc-600" strokeWidth={2} />
        </div>
        {[
          { d: 'Qui · 19h', t: 'Q1 · Prof. Camila' },
          { d: 'Sáb · 09h', t: 'Q3 · Prof. Lucas' },
        ].map((x) => (
          <div key={x.d} className="flex items-center justify-between px-3 py-2 text-[0.65rem] hover:bg-white/5 transition-colors">
            <span className="font-medium text-zinc-300">{x.d}</span>
            <span className="text-zinc-500">{x.t}</span>
          </div>
        ))}
      </div>

      <button className="w-full bg-[#1f3dbc] hover:bg-[#2a4dd3] text-white rounded-full py-2.5 text-[0.7rem] font-medium tracking-tight shadow-[0_0_24px_rgba(31,61,188,0.5)] transition-colors">
        Agendar nova aula
      </button>
    </>
  );
}

function ClassDetailScreen() {
  return (
    <>
      <button className="flex items-center gap-1.5 text-zinc-400 mb-4 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="text-[0.65rem]">Voltar</span>
      </button>

      <Eyebrow>Aula confirmada</Eyebrow>
      <div className="font-display text-5xl font-semibold tracking-[-0.04em] mt-2 mb-1 tabular-nums">19:00</div>
      <div className="text-zinc-500 text-xs mb-5">Sex · 14 de maio</div>

      <div className="rounded-2xl border border-blue-500/40 bg-[#1f3dbc]/[0.08] p-4 mb-3 relative">
        <div className="absolute top-3 right-3"><span className="w-2 h-2 rounded-full bg-blue-500 pulse-dot block" /></div>
        <Eyebrow>Status</Eyebrow>
        <div className="flex items-center gap-2 mt-1.5">
          <Check className="w-4 h-4 text-blue-400" strokeWidth={2.5} />
          <span className="font-display text-base font-semibold text-white">Confirmada</span>
        </div>
        <div className="text-[0.6rem] text-zinc-500 mt-1">Há 2 dias</div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 mb-3 space-y-3">
        <div className="flex items-center justify-between"><Eyebrow>Quadra</Eyebrow><span className="font-display text-sm font-semibold">Q2</span></div>
        <div className="h-px bg-zinc-800" />
        <div className="flex items-center justify-between"><Eyebrow>Professor</Eyebrow><div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-zinc-700 flex items-center justify-center text-[0.5rem] font-bold text-zinc-300">L</div><span className="font-display text-sm font-semibold">Lucas</span></div></div>
        <div className="h-px bg-zinc-800" />
        <div className="flex items-center justify-between"><Eyebrow>Arena</Eyebrow><span className="font-display text-sm font-semibold">Vila Olímpia</span></div>
        <div className="h-px bg-zinc-800" />
        <div className="flex items-center justify-between"><Eyebrow>Duração</Eyebrow><span className="font-display text-sm font-semibold">60 min</span></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="border border-zinc-800 bg-zinc-900/40 text-zinc-300 rounded-full py-2.5 text-[0.65rem] font-medium hover:border-zinc-700 transition-colors">Cancelar</button>
        <button className="bg-[#1f3dbc] hover:bg-[#2a4dd3] text-white rounded-full py-2.5 text-[0.65rem] font-medium shadow-[0_0_18px_rgba(31,61,188,0.4)] transition-colors">+ Calendário</button>
      </div>
    </>
  );
}

function BillingScreen() {
  return (
    <>
      <button className="flex items-center gap-1.5 text-zinc-400 mb-4 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="text-[0.65rem]">Voltar</span>
      </button>

      <Eyebrow>Faturas</Eyebrow>
      <div className="flex items-baseline gap-2 mt-1 mb-5">
        <div className="font-display text-3xl font-semibold tracking-[-0.04em] tabular-nums">R$ 240</div>
        <div className="text-[0.65rem] text-amber-400 font-mono">Em aberto</div>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] p-4 mb-3 relative">
        <div className="flex items-start justify-between mb-2">
          <Eyebrow className="text-amber-400">Boleto · Mai</Eyebrow>
          <span className="text-[0.55rem] font-mono text-amber-400">Vence em 3d</span>
        </div>
        <div className="font-display text-xl font-semibold tabular-nums">R$ 240</div>
        <div className="text-[0.6rem] text-zinc-500 mt-0.5">Mensalidade · 2x/sem</div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button className="bg-[#1f3dbc] hover:bg-[#2a4dd3] text-white rounded-full py-2 text-[0.6rem] font-medium flex items-center justify-center gap-1 shadow-[0_0_18px_rgba(31,61,188,0.45)] transition-colors">
            <Zap className="w-3 h-3" strokeWidth={2.5} /> Pix
          </button>
          <button className="border border-zinc-700 text-zinc-300 rounded-full py-2 text-[0.6rem] font-medium hover:border-zinc-600 transition-colors">Boleto</button>
        </div>
      </div>

      <Eyebrow className="mb-2">Histórico</Eyebrow>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        {[
          { d: 'Abr · 2026', v: 'R$ 240', s: 'Pago' },
          { d: 'Mar · 2026', v: 'R$ 240', s: 'Pago' },
          { d: 'Fev · 2026', v: 'R$ 240', s: 'Pago' },
        ].map((r, i) => (
          <div key={r.d} className={`flex items-center justify-between px-3 py-2 text-[0.65rem] hover:bg-white/5 transition-colors ${i > 0 ? 'border-t border-zinc-800/60' : ''}`}>
            <span className="font-medium text-zinc-300">{r.d}</span>
            <div className="flex items-center gap-2">
              <span className="font-display tabular-nums text-zinc-200">{r.v}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-wider text-blue-400">
                <span className="w-1 h-1 rounded-full bg-blue-500" />{r.s}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*               PHONE SHELL & DEVICE SWITCHER                  */
/* ════════════════════════════════════════════════════════════ */

function PhoneShell({ children, label = 'Visionário' }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="relative h-full mx-auto" style={{ aspectRatio: '9 / 19' }}>
      <div className="absolute -inset-4 bg-zinc-900/30 rounded-[2.8rem] blur-2xl pointer-events-none" />
      <div className="relative h-full rounded-[2.2rem] border-[3px] border-zinc-800 bg-black overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30 border border-zinc-900" />
        <div className="px-5 pt-2.5 pb-1 flex items-center justify-between text-[0.55rem] font-mono text-zinc-300 relative z-10">
          <span className="font-semibold tabular-nums">09:41</span>
          <span className="text-[0.5rem] tracking-[0.2em] uppercase text-zinc-500">{label}</span>
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-[1px]">
              <div className="w-[1.5px] h-[3px] bg-zinc-300 rounded-sm" />
              <div className="w-[1.5px] h-[5px] bg-zinc-300 rounded-sm" />
              <div className="w-[1.5px] h-[7px] bg-zinc-300 rounded-sm" />
            </div>
            <div className="ml-0.5 w-4 h-2 border border-zinc-400 rounded-[2px] relative">
              <div className="absolute inset-y-[1px] left-[1px] right-[3px] bg-zinc-300 rounded-[1px]" />
            </div>
          </div>
        </div>
        <div className="px-3.5 pt-3 pb-12 h-[calc(100%-22px)] overflow-hidden">
          {children}
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-zinc-700 rounded-full" />
      </div>
    </div>
  );
}

export function DeviceSwitcher({ desktop, mobile, intervalMs = 6500 }: { desktop: React.ReactNode; mobile: React.ReactNode; intervalMs?: number }) {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setView((v) => (v === 'desktop' ? 'mobile' : 'desktop')), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, paused]);

  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300';

  return (
    <div
      className="relative w-full aspect-[16/9]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={view} className="device-anim absolute inset-0 flex items-center justify-center">
        {view === 'desktop' ? desktop : mobile}
      </div>

      {/* Seta esquerda — vai para Desktop */}
      <button
        onClick={() => setView('desktop')}
        disabled={view === 'desktop'}
        aria-label="Mostrar versão desktop"
        title="Desktop"
        className={`${arrowBase} -left-1 md:left-2 ${
          view === 'desktop'
            ? 'opacity-25 border-zinc-800 bg-zinc-900/40 text-zinc-700 cursor-not-allowed'
            : 'border-[#1f3dbc]/50 bg-zinc-900/85 text-white hover:bg-[#1f3dbc] hover:scale-110 shadow-[0_0_22px_rgba(31,61,188,0.45)]'
        }`}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Seta direita — vai para Mobile */}
      <button
        onClick={() => setView('mobile')}
        disabled={view === 'mobile'}
        aria-label="Mostrar versão mobile"
        title="Mobile"
        className={`${arrowBase} -right-1 md:right-2 ${
          view === 'mobile'
            ? 'opacity-25 border-zinc-800 bg-zinc-900/40 text-zinc-700 cursor-not-allowed'
            : 'border-[#1f3dbc]/50 bg-zinc-900/85 text-white hover:bg-[#1f3dbc] hover:scale-110 shadow-[0_0_22px_rgba(31,61,188,0.45)]'
        }`}
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Indicador desktop / mobile */}
      <div className="absolute -top-7 right-0 flex items-center gap-2 font-mono text-[0.55rem] tracking-[0.25em] uppercase z-30">
        {paused && (
          <span className="lock-fade-in inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#1f3dbc]/40 bg-[#1f3dbc]/[0.12] text-blue-300">
            <Lock className="w-2 h-2" strokeWidth={2.5} />
            Pausado
          </span>
        )}
        <button
          onClick={() => setView('desktop')}
          className="inline-flex items-center gap-1 text-zinc-500 hover:text-white transition-colors"
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-all ${view === 'desktop' ? 'bg-[#1f3dbc] shadow-[0_0_8px_rgba(31,61,188,0.7)]' : 'bg-zinc-700'}`} />
          Desktop
        </button>
        <span className="text-zinc-700">/</span>
        <button
          onClick={() => setView('mobile')}
          className="inline-flex items-center gap-1 text-zinc-500 hover:text-white transition-colors"
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-all ${view === 'mobile' ? 'bg-[#1f3dbc] shadow-[0_0_8px_rgba(31,61,188,0.7)]' : 'bg-zinc-700'}`} />
          Mobile
        </button>
      </div>
    </div>
  );
}

/* ──────── DASHBOARD MOBILE ──────── */
export function DashboardMobileMockup() {
  const cursor = useCycle(3, 2400);
  const arenas = [
    { name: 'Vila Olímpia', kpi: 'R$ 168k', occ: '88%', up: true },
    { name: 'Pinheiros', kpi: 'R$ 142k', occ: '79%', up: true },
    { name: 'Moema', kpi: 'R$ 102k', occ: '74%', up: false },
  ];
  return (
    <PhoneShell label="Multi-Arena">
      <Eyebrow>Painel</Eyebrow>
      <h3 className="font-display text-lg font-semibold mt-1 mb-2.5 tracking-tight">Visão geral</h3>

      <div className="grid grid-cols-2 gap-1.5 mb-2.5">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 hover:border-[#1f3dbc]/40 transition-colors cursor-pointer">
          <div className="text-[0.5rem] uppercase tracking-wider text-zinc-500">Receita</div>
          <div className="font-display text-base font-semibold tracking-tight">R$ 412k</div>
          <div className="text-[0.5rem] text-blue-400 inline-flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-2 h-2" strokeWidth={2.5} />+8.2%
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2 hover:border-[#1f3dbc]/40 transition-colors cursor-pointer">
          <div className="text-[0.5rem] uppercase tracking-wider text-zinc-500">Alunos</div>
          <div className="font-display text-base font-semibold tracking-tight">847</div>
          <div className="text-[0.5rem] text-blue-400 inline-flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-2 h-2" strokeWidth={2.5} />+18%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <Eyebrow>Arenas · 3</Eyebrow>
        <button className="action-ring w-4 h-4 rounded-md bg-[#1f3dbc] text-white flex items-center justify-center"><Plus className="w-2.5 h-2.5" strokeWidth={2.5} /></button>
      </div>
      <div className="space-y-1">
        {arenas.map((a, i) => (
          <div key={a.name} className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 transition-all duration-300 cursor-pointer ${
            cursor === i ? 'border-[#1f3dbc]/50 bg-[#1f3dbc]/10' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}>
            <span className={`w-1 h-1 rounded-full flex-shrink-0 ${a.up ? 'bg-blue-500' : 'bg-amber-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="text-[0.65rem] font-medium truncate">{a.name}</div>
              <div className="text-[0.5rem] text-zinc-500">{a.occ} ocupação</div>
            </div>
            <div className="font-display text-[0.7rem] font-semibold tabular-nums">{a.kpi}</div>
          </div>
        ))}
      </div>

      <button className="w-full mt-2.5 bg-[#1f3dbc] hover:bg-[#2a4dd3] text-white rounded-full py-1.5 text-[0.6rem] font-medium shadow-[0_0_18px_rgba(31,61,188,0.45)] transition-colors">
        Adicionar arena
      </button>
    </PhoneShell>
  );
}

/* ──────── FINANCIAL MOBILE ──────── */
export function FinancialMobileMockup() {
  const heights = [55, 70, 60, 80, 75, 92, 68];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const bars = ref.current.querySelectorAll<HTMLElement>('[data-bar]');
    bars.forEach((b, i) => {
      const baseH = parseFloat(b.dataset.h ?? '50');
      gsap.fromTo(b, { height: '0%' }, { height: `${baseH}%`, duration: 0.7, ease: 'power3.out', delay: 0.15 + i * 0.06 });
    });
  }, []);
  return (
    <PhoneShell label="Financeiro">
      <Eyebrow>Maio · Líquido</Eyebrow>
      <div className="font-display text-2xl font-semibold tracking-[-0.04em] mt-1 tabular-nums">R$ 92k</div>
      <div className="text-[0.55rem] text-blue-400 inline-flex items-center gap-1 mt-0.5">
        <ArrowUpRight className="w-2.5 h-2.5" strokeWidth={2.5} /> +18.7%
      </div>

      <div className="grid grid-cols-2 gap-1.5 mt-3 mb-2">
        <div className="rounded-lg border border-blue-500/30 bg-[#1f3dbc]/10 p-2">
          <div className="text-[0.5rem] uppercase tracking-wider text-blue-300">Receita</div>
          <div className="font-display text-sm font-semibold tabular-nums">R$ 184k</div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-2">
          <div className="text-[0.5rem] uppercase tracking-wider text-zinc-500">Despesa</div>
          <div className="font-display text-sm font-semibold tabular-nums">R$ 92k</div>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-2.5">
        <Eyebrow className="mb-1.5">7 dias</Eyebrow>
        <div ref={ref} className="h-14 flex items-end gap-1">
          {heights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full">
              <div data-bar data-h={h} className="w-full rounded-t bg-zinc-200" style={{ opacity: 0.4 + i * 0.08 }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[0.45rem] font-mono text-zinc-600">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => <span key={d}>{d}</span>)}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/30 px-2 py-1.5 hover:border-[#1f3dbc]/40 transition-colors">
        <div>
          <div className="text-[0.55rem] font-medium">Pix · Mariana</div>
          <div className="text-[0.5rem] text-zinc-500">há 8s</div>
        </div>
        <div className="font-display text-[0.7rem] font-semibold text-blue-400 tabular-nums">+R$ 280</div>
      </div>
    </PhoneShell>
  );
}

/* ──────── STUDENTS MOBILE ──────── */
export function StudentsMobileMockup() {
  return (
    <PhoneShell label="Alunos">
      <div className="flex items-center justify-between mb-1.5">
        <Eyebrow>312 ativos</Eyebrow>
        <span className="font-mono text-[0.5rem] text-blue-400">+18%</span>
      </div>
      <h3 className="font-display text-lg font-semibold mb-2 tracking-tight">Alunos</h3>

      <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1 mb-2 hover:border-zinc-700 transition-colors">
        <Search className="w-2.5 h-2.5 text-zinc-500" strokeWidth={1.5} />
        <span className="text-[0.55rem] text-zinc-500">Buscar</span>
        <span className="ml-auto text-zinc-500 text-[0.55rem] blink-cursor">|</span>
      </div>

      <div className="flex gap-1 overflow-x-auto scrollbar-none mb-2">
        {['Todos', 'Ativos', 'Risco', 'Novos'].map((f, i) => (
          <span key={f} className={`px-1.5 py-0.5 rounded-full text-[0.5rem] font-mono uppercase tracking-wider whitespace-nowrap ${
            i === 1 ? 'bg-[#1f3dbc] text-white' : 'border border-zinc-800 bg-zinc-900/40 text-zinc-500'
          }`}>{f}</span>
        ))}
      </div>

      <div className="space-y-1">
        {[
          { name: 'Mariana Silva', plan: 'Mensal · 2x', score: 92, msgs: 0 },
          { name: 'Carlos Mendes', plan: 'Pacote 8', score: 64, msgs: 1, amber: true },
          { name: 'Juliana Rocha', plan: 'Trimestral', score: 88, msgs: 0 },
          { name: 'Rafael Costa', plan: 'Day-use', score: 78, msgs: 0 },
        ].map((a) => (
          <div key={a.name} className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1.5 hover:border-[#1f3dbc]/40 transition-colors cursor-pointer">
            <div className="relative w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[0.6rem] font-medium text-zinc-200">
              {a.name[0]}
              {a.msgs > 0 && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#1f3dbc] text-white text-[0.45rem] rounded-full flex items-center justify-center font-bold">{a.msgs}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.65rem] font-medium truncate">{a.name}</div>
              <div className="text-[0.5rem] text-zinc-500">{a.plan}</div>
            </div>
            <div className="w-7 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full ${a.amber ? 'bg-amber-400' : 'bg-blue-500'}`} style={{ width: `${a.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

/* ──────── BILLING MOBILE ──────── */
export function BillingMobileMockup() {
  const states = ['Pendente', 'Pago'] as const;
  const [topState, setTopState] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTopState((s) => (s + 1) % states.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <PhoneShell label="Cobranças">
      <Eyebrow>Recebido · maio</Eyebrow>
      <div className="font-display text-2xl font-semibold tracking-[-0.04em] mt-1 tabular-nums">R$ 184k</div>
      <div className="text-[0.55rem] text-blue-400 inline-flex items-center gap-1 mt-0.5">
        <Activity className="w-2.5 h-2.5 webhook-flash" strokeWidth={2.5} /> Webhook · 95%
      </div>

      <div className="grid grid-cols-3 gap-1 mt-3 mb-2">
        {[
          { l: 'Pago', v: '127', tone: 'blue' },
          { l: 'Pend.', v: '12', tone: 'zinc' },
          { l: 'Atraso', v: '03', tone: 'amber' },
        ].map((x) => (
          <div key={x.l} className={`rounded-md border p-1.5 ${
            x.tone === 'blue' ? 'border-blue-500/30 bg-[#1f3dbc]/10' :
            x.tone === 'amber' ? 'border-amber-500/30 bg-amber-500/5' :
            'border-zinc-800 bg-zinc-900/40'
          }`}>
            <div className="text-[0.45rem] uppercase tracking-wider text-zinc-500">{x.l}</div>
            <div className="font-display text-sm font-semibold tabular-nums">{x.v}</div>
          </div>
        ))}
      </div>

      <Eyebrow className="mb-1.5">Hoje</Eyebrow>
      <div className="space-y-1">
        <div className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 transition-colors duration-500 ${
          topState === 1 ? 'border-blue-500/40' : 'border-zinc-700'
        }`}>
          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[0.45rem] font-mono text-zinc-300">Pix</div>
          <div className="flex-1 min-w-0">
            <div className="text-[0.65rem] font-medium truncate">Lucas Dias</div>
            <div className="text-[0.5rem] text-zinc-500">há 2s</div>
          </div>
          <div className="font-display text-[0.7rem] font-semibold tabular-nums">R$ 280</div>
          <span className={`text-[0.45rem] font-mono uppercase tracking-wider ${topState === 1 ? 'text-blue-400' : 'text-zinc-400'}`}>{states[topState]}</span>
        </div>
        {[
          { l: 'Rafael C.', v: 'R$ 380', m: 'Card', s: 'Pago' },
          { l: 'Pedro L.', v: 'R$ 240', m: 'Bol', s: 'Atraso', amber: true },
        ].map((c) => (
          <div key={c.l} className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/40 px-2 py-1.5 hover:border-[#1f3dbc]/40 transition-colors">
            <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[0.45rem] font-mono text-zinc-300">{c.m}</div>
            <div className="flex-1 min-w-0 text-[0.65rem] font-medium truncate">{c.l}</div>
            <div className="font-display text-[0.65rem] font-semibold tabular-nums">{c.v}</div>
            <span className={`text-[0.45rem] font-mono uppercase tracking-wider ${c.amber ? 'text-amber-400' : 'text-blue-400'}`}>{c.s}</span>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

/* ──────── CALENDAR MOBILE ──────── */
export function CalendarMobileMockup() {
  const days = ['Qui', 'Sex', 'Sáb', 'Dom', 'Seg'];
  const dates = ['13', '14', '15', '16', '17'];
  const [activeDay, setActiveDay] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setActiveDay((d) => (d + 1) % days.length), 2800);
    return () => clearInterval(id);
  }, []);
  const slots = [
    { h: '07h', q1: true, q2: true, q3: false },
    { h: '08h', q1: true, q2: false, q3: true },
    { h: '09h', q1: false, q2: true, q3: true },
    { h: '18h', q1: true, q2: true, q3: true },
    { h: '19h', q1: true, q2: true, q3: false },
  ];
  return (
    <PhoneShell label="Agenda">
      <div className="flex items-center justify-between mb-1.5">
        <Eyebrow>Maio · 2026</Eyebrow>
        <span className="text-[0.5rem] font-mono text-blue-400">87% ocup.</span>
      </div>

      <div className="flex gap-1 mb-2 overflow-x-auto scrollbar-none">
        {days.map((d, i) => (
          <button key={d} className={`flex flex-col items-center px-2 py-1 rounded-md border transition-all duration-300 flex-shrink-0 ${
            activeDay === i ? 'border-[#1f3dbc] bg-[#1f3dbc] text-white' : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
          }`}>
            <div className="text-[0.45rem] font-mono uppercase tracking-wider">{d}</div>
            <div className="font-display text-xs font-semibold tabular-nums">{dates[i]}</div>
          </button>
        ))}
      </div>

      <Eyebrow className="mb-1.5">3 quadras · {days[activeDay]}</Eyebrow>
      <div className="space-y-0.5">
        {slots.map((s) => (
          <div key={s.h} className="flex items-center gap-1.5 rounded-md bg-zinc-900/30 px-2 py-1 hover:bg-zinc-900/60 transition-colors cursor-pointer">
            <span className="text-[0.55rem] font-mono text-zinc-500 w-6">{s.h}</span>
            <div className="flex-1 grid grid-cols-3 gap-1">
              {[s.q1, s.q2, s.q3].map((filled, idx) => (
                <div key={idx} className={`h-3 rounded ${filled ? 'bg-zinc-200' : 'bg-zinc-900 border border-zinc-800'}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-2 bg-[#1f3dbc] hover:bg-[#2a4dd3] text-white rounded-full py-1.5 text-[0.6rem] font-medium shadow-[0_0_18px_rgba(31,61,188,0.45)] transition-colors">
        Reservar quadra
      </button>
    </PhoneShell>
  );
}

/* ──────── MAKEUP MOBILE ──────── */
export function MakeupMobileMockup() {
  const slots = [
    { day: 'Seg 15', time: '19:00', q: 'Q2 · Lucas' },
    { day: 'Qui 18', time: '20:00', q: 'Q1 · Lucas' },
    { day: 'Sáb 20', time: '09:00', q: 'Q3 · Camila' },
  ];
  const focused = useCycle(slots.length, 2400);
  return (
    <PhoneShell label="Reposição">
      <Eyebrow>Mariana Silva</Eyebrow>
      <h3 className="font-display text-lg font-semibold mt-1 mb-3 tracking-tight">Reposições</h3>

      <div className="rounded-2xl border border-blue-500/30 bg-[#1f3dbc]/10 p-3 mb-3 relative overflow-hidden">
        <div className="row-sweep absolute inset-0 pointer-events-none" />
        <Eyebrow className="text-blue-300">Saldo</Eyebrow>
        <div className="font-display text-4xl font-semibold tracking-[-0.05em] mt-0.5 tabular-nums leading-none">02</div>
        <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t border-blue-500/20">
          <div><div className="text-[0.45rem] uppercase text-zinc-500">Usadas</div><div className="font-display text-xs font-semibold">04</div></div>
          <div><div className="text-[0.45rem] uppercase text-zinc-500">Validade</div><div className="font-display text-xs font-semibold">30d</div></div>
          <div><div className="text-[0.45rem] uppercase text-zinc-500">Próx.</div><div className="font-display text-xs font-semibold">12/05</div></div>
        </div>
      </div>

      <Eyebrow className="mb-1.5">Horários</Eyebrow>
      <div className="space-y-1">
        {slots.map((s, i) => (
          <button key={i} className={`w-full text-left rounded-md border px-2 py-1.5 transition-all duration-300 ${
            focused === i ? 'border-[#1f3dbc] bg-[#1f3dbc]/10 scale-[1.02] shadow-[0_0_18px_rgba(31,61,188,0.3)]' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[0.5rem] font-mono uppercase tracking-wider text-zinc-500">{s.day}</div>
                <div className="font-display text-xs font-semibold tracking-tight">{s.time}</div>
                <div className="text-[0.45rem] text-zinc-500">{s.q}</div>
              </div>
              {focused === i && <Check className="w-3 h-3 text-blue-400" strokeWidth={2.5} />}
            </div>
          </button>
        ))}
      </div>
    </PhoneShell>
  );
}
