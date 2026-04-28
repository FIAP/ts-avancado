import type { ContaDebitavel } from "#app/domain/contratos/conta-debitavel.js";
import { ContaComSaldo } from "#app/domain/conta-com-saldo.js";

export class ContaCorrenteDebitavel extends ContaComSaldo implements ContaDebitavel {
  constructor(saldoInicialCentavos: number) {
    super(saldoInicialCentavos);
  }

  debitar(centavos: number): void {
    if (centavos <= 0) {
      throw new Error("Débito deve ser positivo.");
    }
    if (centavos > this.saldoCentavos) {
      throw new Error("Saldo insuficiente.");
    }
    this.saldoCentavos -= centavos;
  }
}
