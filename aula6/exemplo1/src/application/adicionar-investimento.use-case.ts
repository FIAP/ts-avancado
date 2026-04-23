import type { Investimento } from "../domain/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../domain/repositorio-investimentos.interface.js";

export class AdicionarInvestimentoUseCase {
  constructor(private readonly repositorio: RepositorioDeInvestimentos) {}

  executar(investimento: Investimento): void {
    this.repositorio.salvar(investimento);
  }
}
