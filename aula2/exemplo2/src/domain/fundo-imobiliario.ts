import type { Investimento } from "./investimento.interface.js";

export class FundoImobiliario implements Investimento {
  constructor(
    public readonly id: string,
    public nome: string,
    private readonly valor: number,
  ) {}

  calcularRetorno(): number {
    return this.valor * 0.06;
  }
}
