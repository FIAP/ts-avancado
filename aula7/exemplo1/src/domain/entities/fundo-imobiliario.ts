import type { Investimento } from "./investimento.interface.js";

export class FundoImobiliario implements Investimento {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    private readonly valorCota: number,
    private readonly rendimento: number,
  ) {}

  retornoBrutoEstimado(): number {
    return this.valorCota * this.rendimento;
  }
}
