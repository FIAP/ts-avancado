import type { Dinheiro } from "./dinheiro.js";

/**
 * Contrato comum para qualquer tipo de linha na carteira (OCP/LSP).
 */
export interface LinhaInvestimento {
  readonly id: string;
  aliasCurto(): string;
  montanteOuValorMercadoReferencia(): Dinheiro;
  estimativaFluxoFinanceiroRecorrentePorMes(): Dinheiro;
}
