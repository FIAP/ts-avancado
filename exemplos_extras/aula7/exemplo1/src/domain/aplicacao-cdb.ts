import { Dinheiro } from "./dinheiro.js";
import type { LinhaInvestimento } from "./linha-investimento.interface.js";

/** Renda fixa com taxa anual declarada para projeções educativas simplificadas (CDB, LF, LC). */
export class AplicacaoCdb implements LinhaInvestimento {
  constructor(
    public readonly id: string,
    private readonly nomeApelido: string,
    private readonly principalGuardado: Dinheiro,
    private readonly taxaAnualPercentualDeclarada: number,
  ) {
    if (taxaAnualPercentualDeclarada < 0) {
      throw new Error("Taxa anual deve ser maior ou igual a zero.");
    }
  }

  aliasCurto(): string {
    return `CDB — ${this.nomeApelido}`;
  }

  montanteOuValorMercadoReferencia(): Dinheiro {
    return this.principalGuardado;
  }

  /** Juros proporcionais a um mês, baseados na taxa anual declarada. */
  estimativaFluxoFinanceiroRecorrentePorMes(): Dinheiro {
    return this.principalGuardado.aplicarPorcentagemAnualAoLongoDosMeses(
      this.taxaAnualPercentualDeclarada,
    );
  }
}
