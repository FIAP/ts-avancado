// Responsabilidade: manter identificador e saldo da conta (regra mínima de mutação).
export class ContaCorrente {
  constructor(
    public readonly numero: string,
    private saldoCentavos: number,
  ) {
    if (saldoCentavos < 0) {
      throw new Error("Saldo inicial não pode ser negativo.");
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
