import type { ContaConsultavel } from "#app/domain/contratos/conta-consultavel.js";

/** Produtos com saque por débito explícito. Contas só de crédito (ex.: salário) não implementam isso. */
export interface ContaDebitavel extends ContaConsultavel {
  debitar(centavos: number): void;
}
