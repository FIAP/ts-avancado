import type { Investimento } from "../domain/investimento.interface.js";
import type { Logger } from "../observabilidade/logger.interface.js";
import type { Repository } from "../repository/repository.interface.js";

export class InvestimentoService {
  constructor(
    private readonly repo: Repository<Investimento>,
    private readonly logger: Logger,
  ) {}

  adicionar(investimento: Investimento): void {
    this.logger.info(`Adicionando investimento: ${investimento.nome}`);
    this.repo.salvar(investimento);
  }

  calcularTotal(): number {
    this.logger.info("Calculando total de retornos");
    return this.repo
      .obterTodos()
      .reduce((total, inv) => total + inv.calcularRetorno(), 0);
  }
}
