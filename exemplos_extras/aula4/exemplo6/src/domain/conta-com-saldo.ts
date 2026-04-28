/** Operações comuns: saldo e crédito. Débito fica em `ContaDebitavel` / `ContaCorrenteDebitavel`. */
export class ContaComSaldo {
  constructor(protected saldoCentavos: number) {
    if (saldoCentavos < 0) {
      throw new Error("Saldo inicial inválido.");
    }
  }

  obterSaldoCentavos(): number {
    return this.saldoCentavos;
  }

  creditar(centavos: number): void {
    if (centavos <= 0) {
      throw new Error("Crédito deve ser positivo.");
    }
    this.saldoCentavos += centavos;
  }
}
