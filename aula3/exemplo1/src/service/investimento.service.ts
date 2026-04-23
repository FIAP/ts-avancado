import type { Investimento } from "../domain/investimento.interface.js";
import type { Repository } from "../repository/repository.interface.js";

export class InvestimentoService {
  constructor(private readonly repo: Repository<Investimento>) {}

  adicionar(investimento: Investimento): void {
    this.repo.salvar(investimento);
  }

  calcularTotal(): number {
    return this.repo
      .obterTodos()
      .reduce((total, inv) => total + inv.calcularRetorno(), 0);
  }
}
