# Exemplo1 — Violação do SRP (gestor financeiro monolítico)

Demonstração em TypeScript: **uma única classe** (`GestorFinanceiroMonolitico`) concentra validação de documento, regras de valor, cálculo de tarifa de saque, alteração de saldo, auditoria no `console` e formatação do comprovante. Isso **viola o Single Responsibility Principle (SRP)** do SOLID: qualquer mudança em layout, política de tarifa ou canal de auditoria tende a exigir alteração na mesma classe.

Cenário financeiro: depósito e saque com tarifa de **1%** sobre o valor do saque; saldo inicial **R$ 1.000,00** (exemplo didático).

## Diagramas de sequência

Fluxos de depósito e saque no monólito estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/domain/gestor-financeiro-monolitico.ts` | Classe “faz tudo” (anti-padrão). |
| `src/app.ts` | Depósito de R$ 250, saque de R$ 100, impressão do saldo final. |

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. Vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula4/exemplo1
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute:

   ```bash
   npm start
   ```

   Esperado: linhas de auditoria, dois comprovantes em XML simples e saldo final **R$ 1.149,00**.

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

## Próximo passo

Compare com **`exemplos_extras/aula4/exemplo2`**, onde as responsabilidades foram separadas seguindo o SRP.
