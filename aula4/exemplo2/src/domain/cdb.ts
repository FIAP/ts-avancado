import type { AtivoFinanceiro } from "./ativo-financeiro.interface.js";

export class Cdb implements AtivoFinanceiro {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    private readonly principal: number,
    private readonly fatorDiario: number,
    private readonly dias: number,
  ) {}

  estimarRetornoBruto(): number {
    return this.principal * this.fatorDiario * this.dias;
  }
}
