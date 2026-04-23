import type { RepositorioDeInvestimentos } from "../domain/repositorio-investimentos.interface.js";

export type RetornoTotal = {
  quantidadeInvestimentos: number;
  retornoBrutoTotal: number;
};

export class CalcularRetornoTotalUseCase {
  constructor(private readonly repositorio: RepositorioDeInvestimentos) {}

  executar(): RetornoTotal {
    const investimentos = this.repositorio.listar();
    const retornoBrutoTotal = investimentos.reduce(
      (acc, inv) => acc + inv.retornoBrutoEstimado(),
      0,
    );
    return {
      quantidadeInvestimentos: investimentos.length,
      retornoBrutoTotal,
    };
  }
}
