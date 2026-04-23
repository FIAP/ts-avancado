import type { AtivoFinanceiro } from "./ativo-financeiro.interface.js";

export class Acao implements AtivoFinanceiro {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    private readonly valorAplicado: number,
    private readonly percentualEsperado: number,
  ) {}

  estimarRetornoBruto(): number {
    return this.valorAplicado * this.percentualEsperado;
  }
}
