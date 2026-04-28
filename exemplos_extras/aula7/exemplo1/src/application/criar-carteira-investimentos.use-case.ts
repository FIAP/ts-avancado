import { randomUUID } from "node:crypto";
import { CarteiraInvestimentos } from "../domain/carteira.entity.js";
import type { RepositorioDeCarteiras } from "../domain/repositorio-carteiras.interface.js";

export type CriarCarteiraSaida = {
  idDaCarteira: string;
};

export class CriarCarteiraInvestimentosUseCase {
  constructor(private readonly repositorio: RepositorioDeCarteiras) {}

  executar(entrada: { titular: string }): CriarCarteiraSaida {
    const idDaCarteira = randomUUID();
    const carteira = new CarteiraInvestimentos(idDaCarteira, entrada.titular.trim());
    this.repositorio.salvar(carteira);
    return { idDaCarteira };
  }
}
