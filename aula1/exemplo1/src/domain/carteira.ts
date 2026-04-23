import type { Investimento } from "#app/domain/investimento.js";

export class Carteira {
  readonly #ativos: Investimento[] = [];

  adicionar(ativo: Investimento): void {
    this.#ativos.push(ativo);
  }

  projecaoDeRetornoTotal(): number {
    return this.#ativos.reduce(
      (acumulado, ativo) => acumulado + ativo.calcularRetorno(),
      0,
    );
  }

  quantidadeDeAtivos(): number {
    return this.#ativos.length;
  }
}
