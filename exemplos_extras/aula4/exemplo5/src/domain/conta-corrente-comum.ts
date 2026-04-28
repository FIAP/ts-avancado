import { ContaBancariaBase } from "#app/domain/conta-bancaria-base.js";

export class ContaCorrenteComum extends ContaBancariaBase {
  constructor(saldoInicialCentavos: number) {
    super(saldoInicialCentavos);
  }

  override debitar(centavos: number): void {
    if (centavos <= 0) {
      throw new Error("Débito deve ser positivo.");
    }
    if (centavos > this.saldoCentavos) {
      throw new Error("Saldo insuficiente.");
    }
    this.saldoCentavos -= centavos;
  }
}
