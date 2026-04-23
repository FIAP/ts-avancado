import type { Result } from "../core/result.js";

export interface RepositoryLeitura<T> {
  obterPorId(id: string): Result<T, string>;
  obterTodos(): readonly T[];
}
