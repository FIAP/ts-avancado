import type { Identificavel } from "../domain/identificavel.interface.js";
import { emptyOk, err, ok, type Result } from "../core/result.js";
import type { Repository } from "./repository.interface.js";

export class MemoryRepository<T extends Identificavel> implements Repository<T> {
  readonly #porId = new Map<string, T>();

  salvar(entidade: T): Result<void, string> {
    if (this.#porId.has(entidade.id)) {
      return err(`Já existe entidade com id "${entidade.id}".`);
    }
    this.#porId.set(entidade.id, entidade);
    return emptyOk();
  }

  obterPorId(id: string): Result<T, string> {
    const e = this.#porId.get(id);
    return e !== undefined ? ok(e) : err(`Não encontrado: "${id}".`);
  }

  obterTodos(): readonly T[] {
    return [...this.#porId.values()];
  }

  remover(id: string): Result<void, string> {
    if (!this.#porId.delete(id)) {
      return err(`Não encontrado para remoção: "${id}".`);
    }
    return emptyOk();
  }
}
