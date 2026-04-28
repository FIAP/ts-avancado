# Exemplo3 — Violação do OCP (tarifa com `switch` por perfil)

Demonstração: **`CalculadoraTarifaPorPerfilSwitch`** concentra todas as regras de tarifa em um **`switch`**. Incluir um novo perfil (ex.: **VIP**) exige **modificar** essa classe (e tipicamente o tipo `PerfilClienteEncargo`) — comportamento **fechado para extensão sem alteração**, o oposto do **Open/Closed Principle (OCP)**.

Mesmo universo financeiro dos exemplos 1 e 2: **`ContaCorrente`** em centavos, saque de **R$ 100,00**, saldo inicial **R$ 500,00** por demonstração.

## Diagramas de sequência

Fluxos de `demo` e `ServicoSaqueComPerfil` estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Arquivos

| Caminho | Papel |
|---------|--------|
| `src/domain/conta-corrente.ts` | Saldo e débito. |
| `src/encargos/calculadora-tarifa-por-perfil-switch.ts` | `switch` por perfil (anti-OCP). |
| `src/application/servico-saque-com-perfil.ts` | Orquestra saque + tarifa por perfil. |
| `src/app.ts` | Três perfis: PADRAO, PREMIUM, ISENTO. |

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo3
npm install
npm start
```

Compare com **`exemplo4`**, onde uma nova política VIP é só **uma classe nova**.
