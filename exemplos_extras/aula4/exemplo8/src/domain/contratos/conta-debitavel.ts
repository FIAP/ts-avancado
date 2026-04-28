import type { ContaConsultavel } from "#app/domain/contratos/conta-consultavel.js";

export interface ContaDebitavel extends ContaConsultavel {
  debitar(centavos: number): void;
}
