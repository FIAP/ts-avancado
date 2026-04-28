# Aula 8 — Exemplo 2: LangChain + Ollama + MongoDB

Fluxo ponta a ponta em TypeScript:

1. **MongoDB** guarda uma base de conhecimento (texto) e o **histórico** de perguntas/respostas.
2. O programa **monta um contexto** a partir do Mongo (busca simples por palavras da pergunta).
3. **LangChain** monta o prompt e chama **Ollama** (LLM local, sem API proprietária paga).
4. A resposta é **persistida** na coleção `interacoes`.

## Pré-requisitos

- Node.js (LTS).
- **Ollama** em execução (ex.: `http://127.0.0.1:11434`) e modelo disponível (ex.: `ollama pull llama3.2`).
- **MongoDB** acessível. Você pode subir só o Mongo com Docker nesta pasta:

```bash
cd aula8/exemplo2
npm run docker:up
```

Se você já usa Mongo na porta `27017`, ajuste a porta no `docker-compose.yml` ou use sua instância e defina `MONGODB_URI`.

## Configuração

Variáveis opcionais (veja `.env.example`):

| Variável | Padrão |
|----------|--------|
| `MONGODB_URI` | `mongodb://127.0.0.1:27017` |
| `MONGODB_DB` | `ts_avancado_aula8_ex2` |
| `OLLAMA_BASE_URL` | `http://127.0.0.1:11434` |
| `OLLAMA_MODEL` | `llama3.2` |

Exemplo no terminal (macOS/Linux):

```bash
export OLLAMA_MODEL=llama3.2
npm start -- "Explique Ollama e LLM local"
```

Sem argumentos, o programa usa uma pergunta padrão sobre tipagem no TypeScript.

## Como rodar

```bash
cd aula8/exemplo2
npm install
npm run docker:up   # se precisar do Mongo via Docker
npm start
# ou com pergunta:
npm start -- "O que é strict no tsconfig?"
```

## Estrutura

```
src/
  app.ts                 # orquestra: Mongo → contexto → chain → Ollama → persistência
  config.ts
  chain/resposta-com-contexto.ts
  infra/mongo.ts
  repository/conhecimento.repository.ts   # seed + busca de trechos
  repository/interacoes.repository.ts     # histórico
```

## Coleções MongoDB

- `conhecimento`: documentos `{ tema, texto }`. **Carga inicial:** na primeira execução, se a coleção estiver **vazia**, o código insere automaticamente três trechos (TypeScript, Node/ES modules, Ollama). **Não é obrigatório** rodar script de carga separado. Para **forçar** nova carga de exemplo, apague a coleção ou o banco (ex.: `mongosh` → `use ts_avancado_aula8_ex2` → `db.conhecimento.drop()`) e rode `npm start` de novo.
- `interacoes`: `{ pergunta, resposta, modelo, criadoEm }`.

## Notas

- A recuperação de contexto é **por regex / palavras** (didática). Em produção, use **índice de texto** ou **embeddings + busca vetorial**.
- O exemplo usa **LLM local (Ollama)**; não é necessário chave de API de provedor comercial.
