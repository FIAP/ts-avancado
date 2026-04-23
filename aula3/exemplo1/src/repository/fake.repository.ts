import type { Repository } from "./repository.interface.js";

/**
 * Implementação mínima para testes ou demonstração:
 * não persiste nada de fato; `obterTodos` sempre retorna lista vazia.
 */
export class FakeRepository<T> implements Repository<T> {
  salvar(_entidade: T): void {}

  obterTodos(): T[] {
    return [];
  }
}
