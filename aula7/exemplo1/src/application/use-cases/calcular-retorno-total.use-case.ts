import { Carteira } from "../../domain/entities/carteira.js";
import type { RepositorioDeInvestimentos } from "../ports/repositorio-investimentos.port.js";

export type ResumoCarteira = {
  quantidadeInvestimentos: number;
  retornoBrutoTotal: number;
};

export class CalcularRetornoTotalUseCase {
  constructor(private readonly repositorio: RepositorioDeInvestimentos) {}

  executar(): ResumoCarteira {
    const investimentos = this.repositorio.listar();
    const carteira = new Carteira(investimentos);
    return {
      quantidadeInvestimentos: carteira.quantidade(),
      retornoBrutoTotal: carteira.retornoBrutoTotal(),
    };
  }
}
