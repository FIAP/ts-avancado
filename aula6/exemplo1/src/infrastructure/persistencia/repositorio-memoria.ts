import type { Investimento } from "../../domain/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../../domain/repositorio-investimentos.interface.js";

export class RepositorioMemoria implements RepositorioDeInvestimentos {
  private readonly armazenamento: Investimento[] = [];

  salvar(investimento: Investimento): void {
    this.armazenamento.push(investimento);
  }

  listar(): readonly Investimento[] {
    return this.armazenamento;
  }
}
