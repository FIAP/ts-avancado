import type { CarteiraInvestimentos } from "../domain/carteira.entity.js";
import type { RepositorioDeCarteiras } from "../domain/repositorio-carteiras.interface.js";

export class RepositorioDeCarteirasEmMemoria implements RepositorioDeCarteiras {
  private readonly mapaPorId = new Map<string, CarteiraInvestimentos>();

  salvar(carteira: CarteiraInvestimentos): void {
    this.mapaPorId.set(carteira.id, carteira);
  }

  obterPorId(id: string): CarteiraInvestimentos | undefined {
    return this.mapaPorId.get(id);
  }
}
