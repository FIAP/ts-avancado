import type { Investimento } from "../domain/investimento.interface.js";

export function projetarRetornoTotal<T extends Investimento>(
  itens: readonly T[],
): number {
  return itens.reduce((acc, item) => acc + item.calcularRetorno(), 0);
}
