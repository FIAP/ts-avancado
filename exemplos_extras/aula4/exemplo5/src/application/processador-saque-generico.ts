import type { ContaBancariaBase } from "#app/domain/conta-bancaria-base.js";

/** Assume qualquer ContaBancariaBase: **substituição** sem surpresa é o que o LSP pede. */
export class ProcessadorSaqueGenerico {
  executar(conta: ContaBancariaBase, valorSaqueEmReais: number): void {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const centavos = Math.round(valorSaqueEmReais * 100);
    conta.debitar(centavos);
  }
}
