import type { Db } from "mongodb";

const COLECAO = "interacoes";

export type RegistroInteracao = {
  pergunta: string;
  resposta: string;
  modelo: string;
  criadoEm: Date;
};

export async function salvarInteracao(
  db: Db,
  registro: RegistroInteracao,
): Promise<void> {
  await db.collection<RegistroInteracao>(COLECAO).insertOne(registro);
}

export async function listarUltimasInteracoes(
  db: Db,
  limite: number,
): Promise<RegistroInteracao[]> {
  return db
    .collection<RegistroInteracao>(COLECAO)
    .find({})
    .sort({ criadoEm: -1 })
    .limit(limite)
    .toArray();
}
