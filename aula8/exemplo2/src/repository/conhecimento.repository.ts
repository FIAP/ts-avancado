import type { Db } from "mongodb";

export type DocumentoConhecimento = {
  tema: string;
  texto: string;
};

const COLECAO = "conhecimento";

export async function garantirBaseConhecimento(db: Db): Promise<void> {
  const col = db.collection<DocumentoConhecimento>(COLECAO);
  const total = await col.countDocuments();
  if (total > 0) {
    return;
  }

  await col.insertMany([
    {
      tema: "TypeScript — tipagem",
      texto:
        "TypeScript adiciona tipos estáticos ao JavaScript. O modo strict (strict: true) exige anotações ou inferência consistente e reduz erros em tempo de compilação.",
    },
    {
      tema: "Node.js — módulos ES",
      texto:
        "Com type: module no package.json, use import/export. Arquivos .ts compilados para .js devem alinhar moduleResolution ao runtime (ex.: NodeNext).",
    },
    {
      tema: "LLM local — Ollama",
      texto:
        "Ollama expõe uma API HTTP compatível com clientes como LangChain. O modelo deve estar puxado localmente (ollama pull) antes das chamadas.",
    },
  ]);
}

/**
 * Busca trechos relacionados por palavras da pergunta (fluxo simples, sem vetor).
 * Para produção, use busca vetorial ou índice de texto no MongoDB.
 */
export async function montarContextoPorPergunta(
  db: Db,
  pergunta: string,
): Promise<string> {
  const col = db.collection<DocumentoConhecimento>(COLECAO);
  const palavras = pergunta
    .toLowerCase()
    .split(/\s+/)
    .filter((p) => p.length > 2);

  if (palavras.length === 0) {
    const todos = await col.find({}).limit(5).toArray();
    return formatarContexto(todos);
  }

  const filtro = {
    $or: palavras.flatMap((p) => [
      { tema: { $regex: p, $options: "i" } },
      { texto: { $regex: p, $options: "i" } },
    ]),
  };

  const docs = await col.find(filtro).limit(8).toArray();
  if (docs.length === 0) {
    const fallback = await col.find({}).limit(4).toArray();
    return formatarContexto(fallback);
  }
  return formatarContexto(docs);
}

function formatarContexto(docs: DocumentoConhecimento[]): string {
  if (docs.length === 0) {
    return "(Nenhum trecho encontrado na base.)";
  }
  return docs.map((d) => `## ${d.tema}\n${d.texto}`).join("\n\n");
}
