import { ContaComSaldo } from "#app/domain/conta-com-saldo.js";

/** Crédito de folha / benefício; **não** é `ContaDebitavel` — uso incorreto é barrado em tempo de compilação. */
export class ContaSalarioApenasCredito extends ContaComSaldo {
  constructor(saldoInicialCentavos: number) {
    super(saldoInicialCentavos);
  }
}
