import { Investimento } from "#app/domain/investimento.js";

export class FundoImobiliario extends Investimento {
  constructor(nome: string, valor: number) {
    super(nome, valor);
  }

  override calcularRetorno(): number {
    return this.valor * 0.06;
  }
}