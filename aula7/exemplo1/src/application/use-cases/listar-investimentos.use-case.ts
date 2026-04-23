import type { Investimento } from "../../domain/entities/investimento.interface.js";
import type { RepositorioDeInvestimentos } from "../ports/repositorio-investimentos.port.js";

export class ListarInvestimentosUseCase {
  constructor(private readonly repositorio: RepositorioDeInvestimentos) {}

  executar(): readonly Investimento[] {
    return this.repositorio.listar();
  }
}
