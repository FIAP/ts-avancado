import type { LinhaInvestimento } from "./linha-investimento.interface.js";

export class CarteiraInvestimentos {
  private readonly linhas: LinhaInvestimento[] = [];

  constructor(
    public readonly id: string,
    public readonly titular: string,
  ) {
    if (titular.trim().length === 0) {
      throw new Error("Titular obrigatório.");
    }
  }

  registrarLinha(linha: LinhaInvestimento): void {
    this.linhas.push(linha);
  }

  todasAsLinhas(): ReadonlyArray<LinhaInvestimento> {
    return this.linhas;
  }
}
