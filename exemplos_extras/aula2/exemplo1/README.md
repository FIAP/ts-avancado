# Exemplo1 — Interface simples (`Registravel`)

Demonstração em TypeScript: uma **interface** define um contrato (`id` + `resumoParaLog()`); classes e objetos literais podem **cumprir** esse contrato e serem usados pela mesma função (`registrarNoPainel`).

## O que este exemplo mostra

- **`src/domain/registravel.ts`** — interface `Registravel`.
- **`src/domain/pedido.ts`** — classe `Pedido` com `implements Registravel`.
- **`src/domain/evento-auditoria.ts`** — função que retorna um objeto literal compatível com `Registravel` (tipagem estrutural, sem `implements`).
- **`src/app.ts`** — lista `Registravel[]` e registra cada item da mesma forma.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula2/exemplo1
   ```

2. **Instale as dependências** (na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx`:

   ```bash
   npm start
   ```

   No console devem aparecer duas linhas de log: uma do pedido e uma do evento de auditoria.

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

| Comando               | O que faz                              |
| --------------------- | -------------------------------------- |
| `npm install`         | Instala dependências                   |
| `npm start`           | Executa `src/app.ts` com `tsx`         |
| `npm run build`       | Compila para a pasta `dist/`           |
| `npm run start:built` | Executa `dist/app.js` após o build     |
