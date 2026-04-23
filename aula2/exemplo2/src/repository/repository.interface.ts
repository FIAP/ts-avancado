import type { Identificavel } from "../domain/identificavel.interface.js";
import type { RepositoryEscrita } from "./repository-escrita.interface.js";
import type { RepositoryLeitura } from "./repository-leitura.interface.js";

export type Repository<T extends Identificavel> = RepositoryLeitura<T> &
  RepositoryEscrita<T>;
