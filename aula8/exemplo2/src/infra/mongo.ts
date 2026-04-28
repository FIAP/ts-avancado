import { MongoClient, type Db } from "mongodb";

export async function conectarMongo(uri: string): Promise<MongoClient> {
  const cliente = new MongoClient(uri);
  await cliente.connect();
  return cliente;
}

export function obterDb(cliente: MongoClient, nomeDb: string): Db {
  return cliente.db(nomeDb);
}
