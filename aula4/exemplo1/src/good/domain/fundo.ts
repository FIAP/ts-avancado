import type { Investimento } from "./investimento.interface.js";

export class FundoImobiliario implements Investimento {
  constructor(private valor: number) {}

  calcularRetorno(): number {
    return this.valor * 0.06;
  }
}
