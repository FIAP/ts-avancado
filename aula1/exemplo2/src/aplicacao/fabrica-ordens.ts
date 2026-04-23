import { Dinheiro } from "#app/domain/dinheiro.js";
import { OrdemCompra } from "#app/domain/ordem-compra.js";
import { OrdemVenda } from "#app/domain/ordem-venda.js";
import type { Ordem } from "#app/domain/ordem.js";

export type OrdemDto =
  | {
      tipo: "compra";
      id: string;
      clienteId: string;
      ativo: string;
      quantidade: number;
      precoReais: number;
    }
  | {
      tipo: "venda";
      id: string;
      clienteId: string;
      ativo: string;
      quantidade: number;
      precoReais: number;
      posicaoDisponivel: number;
    };

export function ordemDeDto(dto: OrdemDto): Ordem {
  const preco = Dinheiro.emReais(dto.precoReais);
  switch (dto.tipo) {
    case "compra":
      return new OrdemCompra(
        dto.id,
        dto.clienteId,
        dto.ativo,
        dto.quantidade,
        preco,
      );
    case "venda":
      return new OrdemVenda(
        dto.id,
        dto.clienteId,
        dto.ativo,
        dto.quantidade,
        preco,
        dto.posicaoDisponivel,
      );
  }
}
