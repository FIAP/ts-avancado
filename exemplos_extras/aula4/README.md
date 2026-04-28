# Extras — Aula 4 (SOLID: SRP, OCP, LSP, ISP e DIP)

Material complementar em TypeScript sobre **SRP**, **OCP**, **LSP**, **ISP** e **DIP** (Dependency Inversion), no mesmo contexto financeiro (conta em centavos, saques).

## SRP — responsabilidade única

| Pasta | Tema |
|-------|------|
| [`exemplo1`](exemplo1/README.md) | **Violação** — gestor monolítico — [diagramas](exemplo1/docs/diagramas-sequencia.md) |
| [`exemplo2`](exemplo2/README.md) | **Refatorado** — colaboradores e serviço — [diagramas](exemplo2/docs/diagramas-sequencia.md) |

## OCP — aberto para extensão, fechado para modificação

| Pasta | Tema |
|-------|------|
| [`exemplo3`](exemplo3/README.md) | **Violação** — tarifa por `switch` / perfil fixo na mesma classe — [diagramas](exemplo3/docs/diagramas-sequencia.md) |
| [`exemplo4`](exemplo4/README.md) | **Refatorado** — interface `PoliticaEncargoSaque` + políticas em classes separadas (inclui VIP sem alterar `ServicoSaque`) — [diagramas](exemplo4/docs/diagramas-sequencia.md) |

Tarifas ilustrativas (sobre valor do saque): **1%** padrão, **0,5%** premium, **0%** isento; no exemplo4, **0,2%** VIP como extensão.

## LSP — substituição segura de subtipos

| Pasta | Tema |
|-------|------|
| [`exemplo5`](exemplo5/README.md) | **Violação** — `ContaBancariaBase` exige `debitar`; conta salário estende mas sempre falha — [diagramas](exemplo5/docs/diagramas-sequencia.md) |
| [`exemplo6`](exemplo6/README.md) | **Refatorado** — `ContaDebitavel` separado; conta salário não promete débito; `ServicoSaque` tipa o contrato certo — [diagramas](exemplo6/docs/diagramas-sequencia.md) |

## ISP — segregação de interface

| Pasta | Tema |
|-------|------|
| [`exemplo7`](exemplo7/README.md) | **Violação** — `ContaTodasOperacoes` gorda; extrato só precisa de saldo; conta salário forçada a métodos com `throw` — [diagramas](exemplo7/docs/diagramas-sequencia.md) |
| [`exemplo8`](exemplo8/README.md) | **Refatorado** — contratos por capacidade (`ContaConsultavel`, `ContaDebitavel`, etc.); extrato e saque dependem do mínimo — [diagramas](exemplo8/docs/diagramas-sequencia.md) |

## DIP — inversão de dependência

| Pasta | Tema |
|-------|------|
| [`exemplo9`](exemplo9/README.md) | **Violação** — `ServicoSaqueAcoplado` instancia tarifa 1% e auditoria em `console` diretamente — [diagramas](exemplo9/docs/diagramas-sequencia.md) |
| [`exemplo10`](exemplo10/README.md) | **Refatorado** — `PoliticaEncargoSaque` + `PortaAuditoriaSaque` injetadas; `infra` nas bordas — [diagramas](exemplo10/docs/diagramas-sequencia.md) |
