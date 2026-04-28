import { Dinheiro } from "./dinheiro.js";
import type { LinhaInvestimento } from "./linha-investimento.interface.js";

/** Quantidade inteira de ações cotada com preço de mercado atual (referência). */
export class PosicaoAcaoOrdinaria implements LinhaInvestimento {
  constructor(
    public readonly id: string,
    private readonly codigoNegociacao: string,
    private readonly quantidadeCotas: number,
    private readonly precoUnitarioAtual: Dinheiro,
    private readonly dividendYieldAnualEstimativaPercentual?: number,
  ) {
    if (quantidadeCotas <= 0) {
      throw new Error("Quantidade deve ser maior que zero.");
    }
  }

  aliasCurto(): string {
    return `Ações — ${this.codigoNegociacao}`;
  }

  montanteOuValorMercadoReferencia(): Dinheiro {
    return this.precoUnitarioAtual.multiplicarInteiro(this.quantidadeCotas);
  }

  /** Dividend yield anual amortizado mensalmente, quando informado (opcional na demonstração). */
  estimativaFluxoFinanceiroRecorrentePorMes(): Dinheiro {
    const pct = this.dividendYieldAnualEstimativaPercentual;
    if (pct === undefined || pct <= 0) {
      return Dinheiro.zero();
    }
    return this.montanteOuValorMercadoReferencia().aplicarPorcentagemAnualAoLongoDosMeses(
      pct,
    );
  }
}
