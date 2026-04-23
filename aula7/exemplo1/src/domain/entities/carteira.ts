import type { Investimento } from "./investimento.interface.js";

export class Carteira {
  constructor(private readonly investimentos: readonly Investimento[]) {}

  quantidade(): number {
    return this.investimentos.length;
  }

  retornoBrutoTotal(): number {
    return this.investimentos.reduce(
      (acc, inv) => acc + inv.retornoBrutoEstimado(),
      0,
    );
  }
}
