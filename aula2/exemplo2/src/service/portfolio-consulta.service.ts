import { mapResult, type Result } from "../core/result.js";
import type { Investimento } from "../domain/investimento.interface.js";
import type { RepositoryLeitura } from "../repository/repository-leitura.interface.js";
import { projetarRetornoTotal } from "../comum/projetar-retorno.js";

export class PortfolioConsultaService {
  constructor(private readonly leitura: RepositoryLeitura<Investimento>) {}

  totalRetornosEsperados(): number {
    return projetarRetornoTotal(this.leitura.obterTodos());
  }

  resumoRetornoPorId(id: string): Result<string, string> {
    return mapResult(this.leitura.obterPorId(id), (inv) =>
      String(inv.calcularRetorno()),
    );
  }
}
