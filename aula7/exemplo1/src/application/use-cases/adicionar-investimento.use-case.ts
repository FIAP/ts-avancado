import type { Investimento } from "../../domain/entities/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../ports/repositorio-investimentos.port.js";

export class AdicionarInvestimentoUseCase {
  constructor(private readonly repositorio: RepositorioDeInvestimentos) {}

  executar(investimento: Investimento): void {
    this.repositorio.salvar(investimento);
  }
}
