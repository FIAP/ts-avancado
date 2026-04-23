import type { Identificavel } from "../domain/identificavel.interface.js";
import type { Result } from "../core/result.js";

export interface RepositoryEscrita<T extends Identificavel> {
  salvar(entidade: T): Result<void, string>;
  remover(id: string): Result<void, string>;
}
