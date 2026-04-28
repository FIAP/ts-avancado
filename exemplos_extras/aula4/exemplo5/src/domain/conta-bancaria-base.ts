/**
 * Base declara que **debitar** é parte do contrato de qualquer conta da hierarquia.
 * Subtipos devem poder substituir a base sem surpresas (LSP).
 */
export abstract class ContaBancariaBase {
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

  abstract debitar(centavos: number): void;
}
