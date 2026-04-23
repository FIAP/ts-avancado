import type { Repository } from "./repository.interface.js";

export class MemoryRepository<T> implements Repository<T> {
  private dados: T[] = [];

  salvar(entidade: T): void {
    this.dados.push(entidade);
  }

  obterTodos(): T[] {
    return this.dados;
  }
}
