import { Investimento } from "#app/domain/investimento.js";

export class Acao extends Investimento {
  constructor(
    nome: string,
    valor: number,
    private readonly taxaRetorno: number,
  ) {
    super(nome, valor);
  }

  override calcularRetorno(): number {
    return this.valor * this.taxaRetorno;
  }
}
