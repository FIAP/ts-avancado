import type { ContaDebitavel } from "#app/domain/contratos/conta-debitavel.js";

/** Aceita só contas que honram débito — substituição por outra `ContaDebitavel` permanece segura (LSP). */
export class ServicoSaque {
  executar(conta: ContaDebitavel, valorSaqueEmReais: number): void {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const centavos = Math.round(valorSaqueEmReais * 100);
    conta.debitar(centavos);
  }
}
