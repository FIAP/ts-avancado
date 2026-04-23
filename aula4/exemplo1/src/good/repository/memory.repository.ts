import type { Repository } from "./repository.interface.js";

export class MemoryRepository<T> implements Repository<T> {
  private dados: T[] = [];

  salvar(item: T): void {
    this.dados.push(item);
  }

  obterTodos(): T[] {
    return this.dados;
  }
}
