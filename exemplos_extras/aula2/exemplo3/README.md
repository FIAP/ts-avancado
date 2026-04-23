# Exemplo3 — Generics simples (`Caixa<T>` e `primeiroElemento`)

Demonstração em TypeScript: **parâmetros de tipo** (`T`) em uma **classe** e em uma **função**, para reutilizar a mesma lógica com `number`, `string`, objetos (`Ponto`) e arrays, preservando inferência e segurança de tipos em tempo de compilação.

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/domain/caixa.ts` | Classe genérica `Caixa<T>` com `obterConteudo(): T`. |
| `src/domain/primeiro-elemento.ts` | Função genérica `primeiroElemento<T>(itens)` usando `itens.at(0)`. |
| `src/app.ts` | Três caixas (número, texto, ponto) e três chamadas a `primeiroElemento` (incluindo array vazio). |

## Diagrama de sequência

Fluxos de `Caixa` e `primeiroElemento` estão em **[`docs/diagrama-sequencia.md`](docs/diagrama-sequencia.md)** (Mermaid).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula2/exemplo3
   ```

2. **Instale as dependências** (na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx`:

   ```bash
   npm start
   ```

   No console devem aparecer os valores das três caixas e os resultados de `primeiroElemento` (incluindo `undefined` para o array vazio).

## Execução alternativa (build + Node)

1. Compile o TypeScript:

   ```bash
   npm run build
   ```

2. Execute o JavaScript gerado em `dist/`:

   ```bash
   npm run start:built
   ```

## Scripts disponíveis

| Comando               | O que faz                          |
| --------------------- | ---------------------------------- |
| `npm install`         | Instala dependências               |
| `npm start`           | Executa `src/app.ts` com `tsx`     |
| `npm run build`       | Compila para a pasta `dist/`       |
| `npm run start:built` | Executa `dist/app.js` após o build |
