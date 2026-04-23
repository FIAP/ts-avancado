import { Dinheiro } from "#app/domain/dinheiro.js";
import { Ordem } from "#app/domain/ordem.js";

export class OrdemCompra extends Ordem {
  constructor(
    id: string,
    clienteId: string,
    ativo: string,
    quantidade: number,
    precoUnitario: Dinheiro,
  ) {
    super(id, clienteId, ativo, quantidade, precoUnitario, "compra");
  }

  protected override validarNegocio(): void {
    if (this.quantidade <= 0) {
      throw new Error("Ordem de compra exige quantidade positiva.");
    }
    if (this.precoUnitario.emReais() <= 0) {
      throw new Error("Preço unitário deve ser maior que zero.");
    }
  }
}
