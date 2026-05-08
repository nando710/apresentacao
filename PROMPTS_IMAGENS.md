# Prompts para Mockups da Apresentação

Estilo visual: **Dark mode premium**, neon cyan + neon green, tipografia Inter, cantos arredondados, sombra suave.
Cada mockup será inserido em um slide específico — salvar com o nome indicado em `images/`.

**Diretório esperado:** `apresentacao_visionario/images/`

---

## Configuração base (Midjourney)

Sufixo recomendado para todas as imagens (Midjourney v6/v7):

```
--ar 16:10 --style raw --stylize 250 --v 6.1
```

Para o portal mobile (mockup 07): `--ar 9:16` ou `--ar 3:4`.

### DALL-E 3 / GPT Image
Use os prompts integrais — DALL-E geralmente respeita melhor a UI do que Midjourney. Adicione no início:
> "Photorealistic high-fidelity SaaS dashboard UI mockup, dark theme, premium fintech aesthetic."

---

## Mockup 01 — Dashboard Multi-Arena
**Arquivo:** `images/mockup-01-dashboard-multiarena.png`
**Slide:** Módulo 01 — Gestão Multi-Arena

```
High-fidelity SaaS dashboard UI mockup for a multi-location beach tennis arena management platform.
Dark mode premium interface, deep navy background (#07090f), glass-morphism cards with subtle borders,
neon cyan (#00e5ff) and neon green (#00ff9d) accents.
Top header with logo "ArenaOS", user avatar, notification bell.
Left sidebar with icons: dashboard, arenas, students, finance, schedule, billing.
Main area shows: 4 large KPI cards at the top (Total Revenue R$ 487K, Active Students 1.284, Court Occupancy 78%, Inadimplência 4.2%),
below a comparative chart showing 5 arenas (Arena Barra, Arena Recreio, Arena Tijuca, Arena Niterói, Arena Copacabana) with bar graphs of monthly revenue,
on the right a small map of Brazil with location pins marking each arena.
Modern flat design, Inter typography, sharp data visualization, no clutter, professional fintech aesthetic.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 02 — Painel Financeiro / Fluxo de Caixa
**Arquivo:** `images/mockup-02-financeiro.png`
**Slide:** Módulo 02 — Financeiro

```
Premium dark-mode financial dashboard UI for a SaaS managing beach tennis arenas, focused on cash flow.
Deep dark background (#07090f), cards in dark navy (#0f1320) with thin borders.
Top: tab navigation "Fluxo de Caixa | DRE | Contas a Pagar | Conciliação".
Left: line chart showing 30-day cash flow with green income line and red expense line, in BRL currency, intersection points highlighted.
Right side: vertical stack of metric cards — "Saldo Atual R$ 142.380", "Receita Mensal R$ 87.200", "Despesas Mensais R$ 54.100", "Margem 38%".
Bottom: table of recent transactions with columns Data, Descrição, Categoria, Valor, Status (paid/pending), with green/yellow status pills.
Neon cyan accents on active filters, currency in Brazilian real (R$).
Clean fintech UI, Inter typography, data-rich but elegant.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 03 — Gestão de Alunos
**Arquivo:** `images/mockup-03-alunos.png`
**Slide:** Módulo 03 — Alunos

```
SaaS dashboard UI for student management at a beach tennis academy, dark mode premium.
Background dark (#07090f), cards in #0f1320 with subtle borders.
Left: sidebar with navigation. Center: student list table with avatar, name, plan badge (Mensal, Trimestral, Pacote 8 aulas), attendance percentage progress bar, status pill (Ativo, Inadimplente, Inativo), churn risk indicator (low/medium/high) with colored dots.
On the right: side panel showing a selected student's profile — photo placeholder, name "Mariana Costa", plan, frequency chart for last 8 weeks, next class date, "Saldo de reposições: 2".
Filters at the top: Arena, Plano, Status, Search bar.
Neon cyan and green accents, Brazilian Portuguese labels, modern flat design, Inter font.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 04 — Cobrança / Faturas (Asaas)
**Arquivo:** `images/mockup-04-cobranca-asaas.png`
**Slide:** Módulo 04 — Cobrança via Asaas

```
Dark mode premium UI mockup for billing and invoicing module of a SaaS, integrated with Brazilian payment gateway Asaas.
Background #07090f, cards in #0f1320.
Top section: 4 KPI cards — "Faturas em Aberto R$ 18.400", "Recebido este mês R$ 76.200", "Inadimplência 4.2%", "Próximos vencimentos 142".
Center: invoice table with columns Cliente (with avatar), Vencimento, Valor R$, Método (icons: Pix, Boleto, Cartão), Status (Pago, Aguardando, Vencido) as colored pills (green, yellow, red).
Right side: "Régua de Cobrança" panel showing automated reminders — D-3 lembrete WhatsApp, D+1 cobrança Pix, D+7 segunda via boleto.
Asaas logo discreet in the corner. Brazilian Portuguese, R$ currency.
Premium fintech aesthetic, neon cyan accents, Inter typography.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 05 — Calendário de Quadras / Agendamento
**Arquivo:** `images/mockup-05-agendamento.png`
**Slide:** Módulo 05 — Agendamento

```
Dark mode premium UI for a court scheduling calendar at a beach tennis arena.
Background #07090f, calendar grid with rows for hours (06:00 to 22:00) and columns for days of the week.
Each cell contains a colored block representing a class booking — neon cyan for regular classes, neon green for private lessons, purple for day-use, red blocks for blocked/maintenance.
Each block shows: instructor name, student count (3/4), court number ("Quadra 2").
Top filters: Arena dropdown ("Arena Barra"), Quadra (1, 2, 3), View toggle (Day/Week/Month — Week active).
Right side small panel: "Lista de Espera" with pending students. Bottom toolbar: "+ Novo agendamento".
Sleek modern interface, glass-morphism cards, sharp typography Inter, Brazilian Portuguese labels.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 06 — Reposição de Aulas
**Arquivo:** `images/mockup-06-reposicao.png`
**Slide:** Módulo 06 — Reposição

```
Dark mode SaaS UI mockup for a class makeup ("reposição") feature at a beach tennis academy.
Background #07090f, premium cards in #0f1320.
Header card showing: "Reposições — Controle de Créditos".
Center: table with columns Aluno (with avatar), Falta em (date), Reposta em (date or "Pendente" pill), Saldo de Créditos (number with cyan color), Validade do crédito (date), Status.
Right side: configuration panel "Política de Reposição" — toggles for "Antecedência mínima 4h", input "Limite mensal: 2 reposições", input "Validade: 30 dias".
Below: a small modal showing the student-side flow — "Você tem 2 créditos. Escolha um horário disponível" with available time slots in green.
Neon cyan and purple accents, Brazilian Portuguese, Inter typography, clean modern flat design.
--ar 16:10 --style raw --v 6.1
```

---

## Mockup 07 — Portal do Aluno (Mobile)
**Arquivo:** `images/mockup-07-portal-aluno.png`
**Slide:** Módulo 07 — Portal do Aluno

```
Dark mode premium mobile app UI mockup for a beach tennis student portal, shown inside a realistic iPhone 15 Pro frame.
Three phone screens side by side showing different sections of the app:
1) Home screen — greeting "Olá, Mariana 👋", card "Próxima aula: hoje 18h Quadra 2", quick actions (Agendar, Repor falta, Ver fatura), stats (Aulas no mês: 7, Saldo de reposições: 2).
2) Booking screen — calendar view with available time slots in neon cyan, selected slot highlighted in neon green, "Confirmar agendamento" button.
3) Financial screen — list of invoices ("Mensalidade Maio R$ 280 — Pago", "Mensalidade Junho R$ 280 — Vencimento 05/06"), large "Pagar com Pix" button, QR code preview.
Background dark gradient, app UI in #0f1320 with neon accents. Brazilian Portuguese, Inter font, modern, friendly, premium feel.
--ar 16:9 --style raw --v 6.1
```

---

## Dicas para gerar e usar

1. **Gere variações** (4 imagens cada) e escolha a que tem a UI mais limpa — Midjourney às vezes inventa textos ilegíveis.
2. **Para textos legíveis**, prefira DALL-E 3 ou GPT Image (Sora). Midjourney v6+ já melhorou bastante mas ainda erra.
3. **Pós-edição:** se o texto sair embaralhado, abra no Figma/Photoshop e cole textos reais por cima.
4. **Salve com os nomes exatos** indicados acima — a apresentação já está apontando para esses caminhos.
5. **Resolução:** suba os mockups para pelo menos 1600px de largura para boa exibição em telão.

## Fluxo recomendado

1. Crie a pasta `images/` ao lado de `apresentacao.html`.
2. Gere os 7 mockups com os prompts acima.
3. Salve cada um com o nome indicado.
4. Abra `apresentacao.html` no navegador — as imagens substituem automaticamente os placeholders.
5. Use **F** no navegador para entrar em fullscreen e **S** para abrir as notas do orador (se forem adicionadas depois).
