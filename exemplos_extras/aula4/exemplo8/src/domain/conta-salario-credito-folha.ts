import type { ContaConsultavel } from "#app/domain/contratos/conta-consultavel.js";
import type { ContaCredito } from "#app/domain/contratos/conta-credito.js";

/** Só consulta + crédito de folha: não implementa débito, empréstimo ou bloqueio — e **não precisa**. */
export class ContaSalarioCreditoFolha implements ContaConsultavel, ContaCredito {
  private saldoCentavos: number;

  constructor(saldoInicialCentavos: number) {
    if (saldoInicialCentavos < 0) {
      throw new Error("Saldo inicial inválido.");
    }
    this.saldoCentavos = saldoInicialCentavos;
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
