# Exemplo 2 — OOP avançado (mesa de negociação)

Documentação da OOP neste projeto (pilares, padrões, diagrama e fluxograma): [docs/oop.md](docs/oop.md).

Exemplo mais completo: **objeto de valor** (`Dinheiro`), **template method** em ordens, **Strategy** para corretagem (fixa, percentual, composta, escalonada), **Observer** na mesa, **fábrica** com DTO discriminado e agregação em relatório. Código em `src/` com alias `#app/`.

## Pré-requisitos

- Node.js 20 ou superior  
- npm 10 ou superior  

## Passo a passo

### 1. Entrar na pasta do projeto

```bash
cd aula1/exemplo2
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Executar direto em TypeScript (recomendado)

```bash
npm start
```

Roda `tsx src/app.ts`. A saída inclui linhas de auditoria por operação e o resumo da mesa (notionals e corretagens).

### 4. (Opcional) Compilar e rodar o JavaScript gerado

```bash
npm run build
npm run start:built
```

O `build` cria `dist/`. O `start:built` usa o Node com os `imports` definidos no `package.json`.

### 5. Limpeza

`dist/` é artefato de build e está no `.gitignore`. Para remover:

```bash
rm -rf dist
```

## Scripts disponíveis

| Script | O que faz |
|--------|-----------|
| `npm start` | Roda `src/app.ts` com `tsx` |
| `npm run build` | Compila com `tsc` para `dist/` |
| `npm run start:built` | Executa `node dist/app.js` (exige `build` antes) |

## Estrutura

```
src/
  app.ts
  domain/
    dinheiro.ts
    corretagem.ts
    execucao-ordem.ts
    ordem.ts
    ordem-compra.ts
    ordem-venda.ts
    mesa-negocios.ts
  aplicacao/
    fabrica-ordens.ts
```
