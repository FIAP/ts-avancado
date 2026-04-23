import { Dinheiro } from "#app/domain/dinheiro.js";
import { Ordem } from "#app/domain/ordem.js";

export class OrdemVenda extends Ordem {
  constructor(
    id: string,
    clienteId: string,
    ativo: string,
    quantidade: number,
    precoUnitario: Dinheiro,
    private readonly posicaoDisponivel: number,
  ) {
    super(id, clienteId, ativo, quantidade, precoUnitario, "venda");
  }

  protected override validarNegocio(): void {
    if (this.quantidade <= 0) {
      throw new Error("Ordem de venda exige quantidade positiva.");
    }
    if (this.quantidade > this.posicaoDisponivel) {
      throw new Error(
        `Venda de ${this.quantidade} excede posição disponível (${this.posicaoDisponivel}).`,
      );
    }
    if (this.precoUnitario.emReais() <= 0) {
      throw new Error("Preço unitário deve ser maior que zero.");
    }
  }
}
