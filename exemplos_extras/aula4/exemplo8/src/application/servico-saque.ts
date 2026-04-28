import type { ContaDebitavel } from "#app/domain/contratos/conta-debitavel.js";

export class ServicoSaque {
  executar(conta: ContaDebitavel, valorSaqueEmReais: number): void {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const centavos = Math.round(valorSaqueEmReais * 100);
    conta.debitar(centavos);
  }
}
