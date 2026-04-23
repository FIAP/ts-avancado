import type { Investimento } from "../../domain/entities/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../../application/ports/repositorio-investimentos.port.js";

export class RepositorioVazioAdapter implements RepositorioDeInvestimentos {
  salvar(_investimento: Investimento): void {}

  listar(): readonly Investimento[] {
    return [];
  }
}
