import type { Investimento } from "./investimento.interface.js";

export class Acao implements Investimento {
  constructor(private valor: number) {}

  calcularRetorno(): number {
    return this.valor * 0.1;
  }
}
