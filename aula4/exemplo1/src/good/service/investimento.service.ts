import type { Investimento } from "../domain/investimento.interface.js";
import type { Repository } from "../repository/repository.interface.js";

export class InvestimentoService {
  constructor(private repo: Repository<Investimento>) {}

  adicionar(i: Investimento): void {
    this.repo.salvar(i);
  }

  calcularTotal(): number {
    return this.repo
      .obterTodos()
      .reduce((total, i) => total + i.calcularRetorno(), 0);
  }
}
