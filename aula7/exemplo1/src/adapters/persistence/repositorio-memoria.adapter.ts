import type { Investimento } from "../../domain/entities/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../../application/ports/repositorio-investimentos.port.js";

export class RepositorioMemoriaAdapter implements RepositorioDeInvestimentos {
  private readonly armazenamento: Investimento[] = [];

  salvar(investimento: Investimento): void {
    this.armazenamento.push(investimento);
  }

  listar(): readonly Investimento[] {
    return this.armazenamento;
  }
}
