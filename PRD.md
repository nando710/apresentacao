# PRD — Plataforma de Gestão de Arenas de Beach Tennis

**Documento de Requisitos do Produto — Apresentação ao Cliente**
Versão 1.0 — Maio/2026

---

## 1. Sumário Executivo

Plataforma SaaS multi-arena para gestão completa da operação de arenas de beach tennis, unificando em um único sistema o controle financeiro, a gestão de alunos, a cobrança recorrente via Asaas, o agendamento de aulas e arenas, e o controle de reposições.

A solução elimina o uso paralelo de planilhas, cadernos de agendamento, grupos de WhatsApp e múltiplas ferramentas de cobrança, oferecendo ao gestor uma visão consolidada do negócio e ao aluno autonomia total para agendar, repor aulas e regularizar pagamentos.

---

## 2. Problema e Contexto

### 2.1 Como o processo é feito hoje

Arenas de beach tennis operam, em sua maioria, com uma combinação fragmentada de ferramentas:

- **Agendamento**: planilhas, cadernos físicos ou grupos de WhatsApp.
- **Cobrança**: boletos manuais, Pix avulso, PicPay, transferências — sem reconciliação automática.
- **Reposição de aulas**: controle manual, sujeito a perdas e disputas com alunos.
- **Financeiro**: planilhas de Excel sem visão consolidada quando há mais de uma arena.
- **Comunicação com aluno**: WhatsApp pessoal do professor ou recepção.

### 2.2 Dores principais

| Dor | Impacto |
|-----|---------|
| Inadimplência alta por falta de cobrança automatizada | Perda direta de receita (estimativa de mercado: 8–15% do faturamento) |
| Reposições mal controladas geram conflito com alunos | Churn e desgaste da relação |
| Visão financeira fragmentada entre arenas | Decisões operacionais sem dados confiáveis |
| Tempo gasto em tarefas administrativas manuais | Sócios/gestores operando ao invés de escalar o negócio |
| Quadras ociosas por má distribuição de horários | Subutilização do ativo principal |

---

## 3. Visão do Produto

> **Tornar a operação de arenas de beach tennis tão simples quanto agendar uma aula — para o gestor, para o professor e para o aluno.**

Um único sistema, acessível por web e mobile, que conecta a **gestão multi-arena**, o **financeiro automatizado** e a **autonomia do aluno** em uma experiência fluida.

---

## 4. Público-Alvo

### 4.1 Cliente contratante (B2B)
- Proprietários e gestores de redes de arenas de beach tennis (2 a 20+ unidades).
- Arenas individuais que pretendem profissionalizar a gestão.

### 4.2 Usuários do sistema

| Perfil | Necessidades-chave |
|--------|--------------------|
| **Gestor / Sócio** | Visão consolidada de todas as arenas, fluxo de caixa, indicadores de performance |
| **Recepção / Administrativo** | Cadastro de alunos, agendamentos, conciliação de pagamentos |
| **Professor** | Agenda do dia, lista de presença, controle de reposições |
| **Aluno** | Agendar aulas, repor faltas, ver e pagar mensalidades |

---

## 5. Escopo Funcional

### 5.1 Módulo Multi-Arena (Gestão Centralizada)

- Cadastro e configuração ilimitada de arenas com regras próprias (horários, preços, quadras).
- Dashboard consolidado com KPIs por arena e visão agregada.
- Permissões granulares por arena e por perfil de usuário.
- Comparativo de performance entre unidades (ocupação, receita, inadimplência, churn).

### 5.2 Módulo Financeiro e Fluxo de Caixa

- **Fluxo de caixa por arena** com visões diária, semanal e mensal.
- **DRE simplificado** consolidado e segmentado por unidade.
- Controle de **receitas** (mensalidades, aulas avulsas, day-use, eventos) e **despesas** (folha, aluguel, manutenção, marketing).
- Categorização e centro de custos.
- **Conciliação automática** das cobranças do Asaas (Pix, boleto, cartão).
- Relatórios exportáveis (PDF/Excel) e indicadores: ticket médio, LTV, taxa de inadimplência, ocupação.

### 5.3 Módulo de Gestão de Alunos

- Cadastro completo (dados, plano, vínculo com turma/professor).
- **Planos**: mensal, trimestral, semestral, pacote de aulas, day-use.
- Histórico de presença, reposições, pagamentos e movimentações.
- Régua de relacionamento: boas-vindas, aniversário, lembretes, recuperação de inativos.
- Score de risco de churn baseado em frequência e pagamentos.

### 5.4 Módulo de Cobrança (Integração Asaas)

- Geração automática de cobranças recorrentes a partir do plano do aluno.
- Métodos: **Pix, boleto, cartão de crédito** (parcelamento e recorrência).
- **Régua de cobrança automática** (lembrete antes do vencimento, notificação no atraso, segunda via).
- Confirmação de pagamento via webhook Asaas → baixa automática no sistema.
- Negativação opcional via Asaas para inadimplentes crônicos.
- Split de pagamento (futuro): repasse automático para professores.

### 5.5 Módulo de Agendamento e Reservas

- **Calendário visual** por arena e por quadra (visões dia/semana/mês).
- Reserva de quadra para aulas regulares, aulas avulsas e day-use.
- Bloqueio de horários (manutenção, evento, clima).
- Lista de espera automática para horários cheios.
- Notificações automáticas (confirmação, lembrete 24h e 2h antes).

### 5.6 Módulo de Reposição de Aulas

- Registro de falta com regra de antecedência mínima configurável.
- **Crédito de reposição** automático respeitando políticas da arena (ex.: até 2 reposições/mês, validade de 30 dias).
- Aluno escolhe horário disponível para repor sem intervenção da recepção.
- Auditoria completa: quem faltou, quando repôs, saldo de créditos.

### 5.7 Portal do Aluno (Web + Mobile)

- Login simples (e-mail/celular).
- Visualização de turmas, próximas aulas e saldo de reposições.
- **Agendamento e reposição self-service**.
- **Área financeira**: faturas em aberto, histórico, segunda via, pagamento via Pix/cartão.
- Notificações push e por WhatsApp/e-mail.

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance
- Tempo de carregamento de telas principais **< 2s** em conexão 4G.
- Operação fluida com **até 10.000 alunos ativos** e **50 arenas** sem degradação perceptível.
- Disponibilidade alvo **99,5%** (SLA contratual a definir).

### 6.2 Segurança e Conformidade
- Conformidade **LGPD** com consentimento explícito e direito ao esquecimento.
- Criptografia em trânsito (TLS 1.3) e em repouso.
- Autenticação com 2FA para perfis administrativos.
- Logs de auditoria de operações financeiras e cadastrais.

### 6.3 Usabilidade
- Interface mobile-first para o aluno; desktop-first para gestor.
- Onboarding guiado para novos clientes (importação de base via planilha).
- Suporte a múltiplos usuários simultâneos por arena.

### 6.4 Integrações
- **Asaas** (cobrança) — obrigatória no MVP.
- **WhatsApp Business API** — notificações e régua de cobrança.
- Google/Apple Calendar — sincronização da agenda do aluno.
- Exportação contábil (futuro): integrações com Conta Azul, Omie.

---

## 7. Melhorias de Processo Esperadas

| Processo Atual | Como o sistema melhora | Ganho estimado |
|----------------|------------------------|----------------|
| Cobrança manual de mensalidades | Recorrência automática + régua de cobrança Asaas | **Redução de inadimplência de 30–50%** |
| Agendamento por WhatsApp | Self-service no portal do aluno | **Redução de 70% no tempo de recepção** com agenda |
| Reposição controlada em caderno | Crédito automático com regras configuráveis | **Eliminação de conflitos** e perda de reposições |
| Fechamento financeiro mensal manual | Conciliação automática + DRE em tempo real | **De 2 dias para minutos** no fechamento |
| Visão fragmentada das arenas | Dashboard multi-arena consolidado | **Decisão baseada em dados** em vez de intuição |
| Comunicação dispersa com aluno | Notificações automáticas por canal preferido | **Aumento de presença e engajamento** |

---

## 8. Métricas de Sucesso (KPIs)

### Métricas do produto
- **Adoção do portal do aluno**: ≥ 70% de alunos ativos logando ao menos 1x/mês.
- **Taxa de agendamento self-service**: ≥ 60% das aulas agendadas pelo próprio aluno em 6 meses.
- **Conciliação automática**: ≥ 95% das cobranças baixadas automaticamente via webhook.

### Métricas do negócio do cliente
- Redução da **taxa de inadimplência** em ≥ 30% nos primeiros 90 dias.
- Aumento da **taxa de ocupação** das quadras em ≥ 15%.
- Redução do **tempo gasto em tarefas administrativas** em ≥ 50%.
- Aumento do **NPS dos alunos** (a estabelecer baseline na implantação).

---

## 9. Roadmap Proposto

### Fase 1 — MVP (0–3 meses)
- Cadastro multi-arena, alunos e planos
- Agendamento de aulas e quadras
- Integração Asaas (cobrança recorrente + conciliação)
- Portal do aluno (agendar, repor, pagar)
- Fluxo de caixa básico por arena

### Fase 2 — Consolidação (3–6 meses)
- Dashboard multi-arena consolidado
- Régua de cobrança avançada
- Integração WhatsApp Business
- Relatórios gerenciais e exportações
- App mobile nativo (iOS/Android)

### Fase 3 — Escala (6–12 meses)
- Score de churn e régua de retenção
- Split de pagamento para professores
- Marketplace de torneios e eventos
- Integrações contábeis
- BI avançado e benchmarks de mercado

---

## 10. Premissas e Riscos

### Premissas
- Cliente possui conta ativa no Asaas (ou disposição para criar).
- Base de alunos atual passível de importação via planilha padronizada.
- Disponibilidade do cliente para validações quinzenais durante o MVP.

### Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| Resistência de alunos ao self-service | Onboarding assistido + canal de suporte humano nos primeiros 30 dias |
| Mudanças na API do Asaas | Camada de abstração + monitoramento ativo de webhooks |
| Adoção lenta pela recepção/professores | Treinamento dedicado + interface simples + métricas de uso |
| Picos de uso (finais de tarde/sábado) | Arquitetura escalável horizontalmente desde o início |

---

## 11. Próximos Passos

1. **Validação do PRD** com o cliente — alinhamento de escopo e prioridades.
2. **Workshop de descoberta** — mapear regras específicas das arenas do cliente.
3. **Aprovação do MVP** e cronograma definitivo.
4. **Setup de ambiente** e início do desenvolvimento.

---

*Documento preparado para apresentação ao cliente contratante.*
