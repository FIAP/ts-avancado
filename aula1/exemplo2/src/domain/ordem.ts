import type { PoliticaCorretagem } from "#app/domain/corretagem.js";
import type { Dinheiro } from "#app/domain/dinheiro.js";
import { ExecucaoOrdem, type TipoOrdem } from "#app/domain/execucao-ordem.js";

export abstract class Ordem {
  protected constructor(
    public readonly id: string,
    public readonly clienteId: string,
    public readonly ativo: string,
    public readonly quantidade: number,
    public readonly precoUnitario: Dinheiro,
    protected readonly tipo: TipoOrdem,
  ) {}

  notional(): Dinheiro {
    return this.precoUnitario.multiplicarInteiro(this.quantidade);
  }

  protected abstract validarNegocio(): void;

  executar(politica: PoliticaCorretagem): ExecucaoOrdem {
    this.validarNegocio();
    const bruto = this.notional();
    const taxa = politica.calcular(bruto);
    return ExecucaoOrdem.criar(
      this.id,
      this.clienteId,
      this.ativo,
      this.tipo,
      bruto,
      taxa,
    );
  }
}
