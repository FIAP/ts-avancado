import { ContaCorrente } from "#app/domain/conta-corrente.js";

// Responsabilidade: calculo isolado da tarifa de saque (política pode mudar sem tocar validação ou comprovante).
export class CalculadoraTarifaSaque {
  constructor(private readonly percentual: number) {
    if (percentual < 0 || !Number.isFinite(percentual)) {
      throw new Error("Percentual de tarifa inválido.");
    }
  }

  /** valor e retorno em centavos inteiros */
  calcularTarifaCentavos(valorSaqueCentavos: number): number {
    return Math.round(valorSaqueCentavos * this.percentual);
  }

  garantirSaldoParaSaqueComTarifa(
    conta: ContaCorrente,
    valorSaqueCentavos: number,
    tarifaCentavos: number,
  ): void {
    const total = valorSaqueCentavos + tarifaCentavos;
    if (conta.obterSaldoCentavos() < total) {
      throw new Error("Saldo insuficiente (inclui tarifa).");
    }
  }
}
