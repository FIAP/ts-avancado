import type { Investimento } from "./investimento.interface.js";

export class Acao implements Investimento {
  constructor(
    public nome: string,
    private readonly valor: number,
    private readonly taxa: number,
  ) {}

  calcularRetorno(): number {
    return this.valor * this.taxa;
  }
}
