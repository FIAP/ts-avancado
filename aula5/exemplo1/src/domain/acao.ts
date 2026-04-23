import type { Ativo } from "./ativo.interface.js";

export class Acao implements Ativo {
  constructor(
    public readonly id: string,
    public readonly nome: string,
    private readonly valorAplicado: number,
    private readonly percentual: number,
  ) {}

  retornoBrutoEstimado(): number {
    return this.valorAplicado * this.percentual;
  }
}
