export interface Repository<T> {
  salvar(entidade: T): void;
  obterTodos(): T[];
}
