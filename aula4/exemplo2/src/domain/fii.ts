import type { AtivoFinanceiro } from "./ativo-financeiro.interface.js";

export class FundoImobiliario implements AtivoFinanceiro {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    private readonly valorCota: number,
    private readonly rendimentoMensal: number,
  ) {}

  estimarRetornoBruto(): number {
    return this.valorCota * this.rendimentoMensal;
  }
}
