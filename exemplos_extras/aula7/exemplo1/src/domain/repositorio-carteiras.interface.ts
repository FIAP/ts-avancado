import type { CarteiraInvestimentos } from "./carteira.entity.js";

export interface RepositorioDeCarteiras {
  salvar(carteira: CarteiraInvestimentos): void;
  obterPorId(id: string): CarteiraInvestimentos | undefined;
}
