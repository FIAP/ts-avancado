// Função genérica: o tipo do retorno acompanha o tipo dos itens do array.
export function primeiroElemento<T>(itens: readonly T[]): T | undefined {
  return itens.at(0);
}
