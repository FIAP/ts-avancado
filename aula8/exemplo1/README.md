# Aula 8 — LangChain + Ollama (local)

Integração de aplicações TypeScript com IA usando **LangChain.js** e **Ollama** em execução local, sem depender de API paga na fase inicial. O `@langchain/ollama` é a integração oficial; com o Ollama rodando, a API fica em `http://localhost:11434` (por padrão).

## Pré-requisitos

1. **Node.js** (recomendado 20+).
2. **Ollama** instalado e em execução.
3. Modelo local disponível (ex.: `llama3.2`):

```bash
ollama run llama3.2
```

(O comando baixa o modelo, se necessário, e permite testar no terminal.)

## Instalação

```bash
cd aula8/exemplo1
npm install
```

## Compilar

```bash
npm run build
```

## Executar os exemplos

```bash
npm run exemplo-01
npm run exemplo-02
npm run exemplo-03
```

Equivalente ao uso de `npx tsx src/exemplo-0X-....ts`.

## Arquivos

| Arquivo | Conteúdo |
|---------|-----------|
| `src/exemplo-01-chat.ts` | Primeira chamada ao modelo via `ChatOllama`. |
| `src/exemplo-02-prompt-template.ts` | `ChatPromptTemplate` com variável `{tema}`. |
| `src/exemplo-03-chain.ts` | Chain: prompt → modelo → `StringOutputParser`. |

Se o Ollama não estiver ativo ou o modelo não existir, os scripts falharão na chamada HTTP à API local.
