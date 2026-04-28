# Exemplo1 — Acoplamento vs injeção de dependência (DI)

Demonstração em TypeScript: **acoplamento** quando a classe de aplicação **cria** a dependência concreta (`new ConsoleNotificador()`), e como a **injeção de dependência** (receber `Notificador` no construtor) reduz esse acoplamento e facilita trocar implementação (console, silenciosa, e-mail, etc.) sem alterar a regra de cadastro.

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/domain/notificador.interface.ts` | Contrato `Notificador` com `enviar(mensagem)`. |
| `src/infra/console-notificador.ts` | Implementação que registra no `console`. |
| `src/infra/silent-notificador.ts` | Implementação sem saída visível (ex.: testes). |
| `src/application/cadastro-usuario-acoplado.ts` | Cadastro **acoplado** a `ConsoleNotificador`. |
| `src/application/cadastro-usuario-com-di.ts` | Cadastro com **DI**: depende só da interface. |
| `src/app.ts` | Compara os três cenários no console. |

## Diagramas de sequência

Fluxos do cenário acoplado e dos dois cenários com DI estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula3/exemplo1
   ```

2. **Instale as dependências** (na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx`:

   ```bash
   npm start
   ```

   No console aparecem: o fluxo acoplado, o mesmo cadastro com DI + console, e o cadastro com DI + notificador silenciosa (sem linha `[ConsoleNotificador]`).

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
