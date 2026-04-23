import type { Investimento } from "../domain/investimento.interface.js";
import type { Repository } from "../repository/repository.interface.js";

export class RelatorioPortfolioService {
  constructor(private readonly repo: Repository<Investimento>) {}

  linhaResumo(): string {
    const ativos = this.repo.obterTodos();
    const total = ativos.reduce((acc, i) => acc + i.calcularRetorno(), 0);
    return `${ativos.length} ativo(s); retorno agregado = ${total}`;
  }
}
