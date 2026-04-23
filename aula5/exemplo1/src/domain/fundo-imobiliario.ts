import type { Ativo } from "./ativo.interface.js";

export class FundoImobiliario implements Ativo {
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
