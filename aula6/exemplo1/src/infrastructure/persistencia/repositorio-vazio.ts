import type { Investimento } from "../../domain/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../../domain/repositorio-investimentos.interface.js";

export class RepositorioVazio implements RepositorioDeInvestimentos {
  salvar(_investimento: Investimento): void {}

  listar(): readonly Investimento[] {
    return [];
  }
}
