export interface Repository<T> {
  salvar(item: T): void;
  obterTodos(): T[];
}
