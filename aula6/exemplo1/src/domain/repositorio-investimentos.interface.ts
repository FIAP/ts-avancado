import type { Investimento } from "./investimento.interface.js";

export interface RepositorioDeInvestimentos {
  salvar(investimento: Investimento): void;
  listar(): readonly Investimento[];
}
