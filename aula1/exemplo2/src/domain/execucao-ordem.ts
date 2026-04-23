import type { Dinheiro } from "#app/domain/dinheiro.js";

export type TipoOrdem = "compra" | "venda";

export class ExecucaoOrdem {
  private constructor(
    public readonly ordemId: string,
    public readonly clienteId: string,
    public readonly ativo: string,
    public readonly tipo: TipoOrdem,
    public readonly notional: Dinheiro,
    public readonly corretagem: Dinheiro,
  ) {}

  static criar(
    ordemId: string,
    clienteId: string,
    ativo: string,
    tipo: TipoOrdem,
    notional: Dinheiro,
    corretagem: Dinheiro,
  ): ExecucaoOrdem {
    return new ExecucaoOrdem(
      ordemId,
      clienteId,
      ativo,
      tipo,
      notional,
      corretagem,
    );
  }

  fluxoDeCaixaCliente(): Dinheiro {
    return this.tipo === "compra"
      ? this.notional.somar(this.corretagem)
      : this.notional.subtrair(this.corretagem);
  }
}
