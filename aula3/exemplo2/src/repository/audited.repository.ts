import type { Logger } from "../observabilidade/logger.interface.js";
import type { Repository } from "./repository.interface.js";

/**
 * Decorator de repositório: delega a outro `Repository` e registra operações.
 * Demonstra composição de infraestrutura sem alterar o domínio.
 */
export class AuditedRepository<T> implements Repository<T> {
  constructor(
    private readonly inner: Repository<T>,
    private readonly logger: Logger,
    private readonly nome: string,
  ) {}

  salvar(entidade: T): void {
    this.logger.info(`[${this.nome}] salvar`);
    this.inner.salvar(entidade);
  }

  obterTodos(): T[] {
    this.logger.info(`[${this.nome}] obterTodos`);
    return this.inner.obterTodos();
  }
}
