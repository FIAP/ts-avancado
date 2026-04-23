import type { Investimento } from "../../domain/entities/investimento.interface.js";

export interface RepositorioDeInvestimentos {
  salvar(investimento: Investimento): void;
  listar(): readonly Investimento[];
}
