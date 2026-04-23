# Exemplo1 — OOP (classe `Cachorro`)

Demonstração em TypeScript: classe como molde e objeto como instância (ex.: Thor, marrom, 3 anos).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula1/exemplo1
   ```

2. **Instale as dependências** (só é necessário na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx` (roda o TypeScript direto, sem compilar antes):

   ```bash
   npm start
   ```

   Você deve ver no console os dados do objeto `Thor` e as mensagens de `latir`, `correr` e `dormir`.

## Execução alternativa (build + Node)

1. Na mesma pasta, compile o TypeScript:

   ```bash
   npm run build
   ```

2. Rode o JavaScript gerado em `dist/`:

   ```bash
   npm run start:built
   ```

## Scripts disponíveis

| Comando            | O que faz                                      |
| ------------------ | ---------------------------------------------- |
| `npm install`      | Instala dependências |
| `npm start`        | Executa `src/app.ts` com `tsx`                 |
| `npm run build`    | Compila para a pasta `dist/`                   |
| `npm run start:built` | Executa `dist/app.js` após o build |
