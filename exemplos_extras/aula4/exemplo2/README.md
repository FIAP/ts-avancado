# Exemplo2 — SRP aplicado (movimentação financeira refatorada)

Demonstração em TypeScript: o mesmo cenário financeiro do **exemplo1** (depósito, saque com tarifa de **1%**, saldo inicial equivalente a **R$ 1.000,00**), porém com **responsabilidades separadas** conforme o **Single Responsibility Principle (SRP)**. Uma classe (`ServicoMovimentacaoConta`) apenas **orquestra**; validações, tarifa, conta, auditoria e comprovante ficam em colaboradores dedicados.

## Diagramas de sequência

Montagem do serviço, `executarDeposito` e `executarSaque` com colaboradores estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/domain/conta-corrente.ts` | Saldo em centavos; creditar/debitar. |
| `src/validacao/validador-documento.ts` | Documento do cliente (CPF 11 dígitos). |
| `src/validacao/validador-valores-operacao.ts` | Valores positivos. |
| `src/encargos/calculadora-tarifa-saque.ts` | Tarifa percentual e regra de saldo com tarifa. |
| `src/auditoria/registrador-auditoria.ts` | Contrato + `AuditoriaConsole`. |
| `src/comprovante/gerador-comprovante.ts` | Texto do comprovante. |
| `src/application/servico-movimentacao-conta.ts` | Caso de uso: depósito e saque. |
| `src/app.ts` | Montagem das dependências e execução. |

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. Vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula4/exemplo2
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute:

   ```bash
   npm start
   ```

   Esperado: mesmo resultado numérico do exemplo1 (saldo final **114900** centavos = **R$ 1.149,00**), com auditoria exibindo valores em centavos.

## Execução alternativa (build + Node)

```bash
npm run build
npm run start:built
```

## Scripts disponíveis

| Comando               | O que faz                          |
| --------------------- | ---------------------------------- |
| `npm install`         | Instala dependências               |
| `npm start`           | Executa `src/app.ts` com `tsx`     |
| `npm run build`       | Compila para `dist/`               |
| `npm run start:built` | Executa `dist/app.js` após o build |

## Comparação com o exemplo1

| | Exemplo1 | Exemplo2 |
|---|----------|----------|
| SRP | Violação (classe monolítica) | Uma responsabilidade principal por classe |
| Saldo | `number` em reais | `ContaCorrente` em **centavos** (evita float em regra de negócio) |
| Evolução | Difícil trocar só auditoria ou só comprovante | Colaboradores substituíveis com menos impacto |

## Leitura complementar

Comece por **`exemplos_extras/aula4/exemplo1`** para ver o problema; use este projeto como referência de refatoração.
