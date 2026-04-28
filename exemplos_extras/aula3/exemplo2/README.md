# Exemplo2 — Inversão de controle (IoC) com container simples

Demonstração em TypeScript: um **`IocContainer`** registra **fábricas** por **token** e expõe **`resolve`**. O **`app`** não encadeia `new` manualmente para montar `CadastroUsuarioService`; a **composição** fica em `registrarModuloCadastro` / `criarContainerComConsole`. Trocar `ConsoleNotificador` por `SilentNotificador` é só mudar o registro passado ao módulo.

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/ioc/tokens.ts` | Tokens string (`Notificador`, `CadastroUsuario`). |
| `src/ioc/container.ts` | `registrarSingleton` + `resolve` com cache (singleton). |
| `src/ioc/registrar-modulo-app.ts` | `registrarModuloCadastro` e `criarContainerComConsole()`. |
| `src/domain/notificador.interface.ts` | Contrato `Notificador`. |
| `src/infra/console-notificador.ts` / `silent-notificador.ts` | Implementações. |
| `src/application/cadastro-usuario.service.ts` | Serviço com DI (recebe `Notificador`). |
| `src/app.ts` | Dois containers: console vs silencioso. |

## Diagramas de sequência

Registro no container, primeiro `resolve` (lazy) e `registrar(email)` estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula3/exemplo2
   ```

2. **Instale as dependências** (na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx`:

   ```bash
   npm start
   ```

   No console: primeiro cenário com `[ConsoleNotificador]`; segundo só com a linha de persistência fictícia (notificador silencioso).

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

## Relação com o exemplo1

No **exemplo1** o `main` injeta dependências com `new` explícito. No **exemplo2**, a montagem é **centralizada** no container e no módulo de registro (IoC na composição).
