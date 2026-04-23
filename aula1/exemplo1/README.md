# Exemplo 1 — POO com TypeScript

Documentação da OOP neste projeto (pilares, diagrama e fluxograma): [docs/oop.md](docs/oop.md).

Demonstração introdutória de **classes**, **herança**, **abstração**, **encapsulamento** (campo privado `#valor`), **polimorfismo** e **composição** (`Carteira`). Código em `src/`, com alias de importação `#app/`.

## Pré-requisitos

- Node.js 20 ou superior  
- npm 10 ou superior  

## Passo a passo

### 1. Entrar na pasta do projeto

```bash
cd aula1/exemplo1
```

(Ajuste o caminho se o repositório estiver em outro lugar.)

### 2. Instalar dependências

```bash
npm install
```

Instala TypeScript (beta, conforme `package.json`), `tsx` e `@types/node`.

### 3. Executar direto em TypeScript (recomendado para estudo)

```bash
npm start
```

Equivale a `tsx src/app.ts`. Você deve ver no terminal a saída sobre polimorfismo, carteira uniforme e projeção agregada.

### 4. (Opcional) Compilar e rodar o JavaScript gerado

Gera a pasta `dist/` com o código compilado:

```bash
npm run build
```

Executa o ponto de entrada compilado (usa `package.json` → `imports` para resolver `#app/*`):

```bash
npm run start:built
```

### 5. Limpeza

A pasta `dist/` é gerada pelo build e está listada no `.gitignore`. Pode apagá-la quando quiser:

```bash
rm -rf dist
```

Na próxima vez que rodar `npm run build`, ela será recriada.

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
    investimento.ts
    acao.ts
    fundo-imobiliario.ts
    carteira.ts
```
