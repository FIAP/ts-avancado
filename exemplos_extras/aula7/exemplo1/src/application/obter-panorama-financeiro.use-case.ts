import { Dinheiro } from "../domain/dinheiro.js";
import type { RepositorioDeCarteiras } from "../domain/repositorio-carteiras.interface.js";

export type VisaoFinanceiraPorLinha = {
  linhaId: string;
  apelido: string;
  patrimonioEmReaisMostradoNaReferenciaAtual: number;
  projetadoRetornoOuDividendoMensalEmReais: number;
};

export type ObterPanoramaFinanceiroSaida = {
  carteiraId: string;
  nomeTitular: string;
  visaoDasLinhas: VisaoFinanceiraPorLinha[];
  patrimonioTotalEmReais: number;
  somaDosFluxosMensaisProjEmReais: number;
};

export class ObterPanoramaFinanceiroUseCase {
  constructor(private readonly repositorio: RepositorioDeCarteiras) {}

  executar(entrada: { carteiraId: string }): ObterPanoramaFinanceiroSaida {
    const carteira = this.repositorio.obterPorId(entrada.carteiraId);
    if (!carteira) {
      throw new Error("Carteira informada não existe.");
    }

    let patrimonioTotal = Dinheiro.zero();
    let fluxoMensal = Dinheiro.zero();
    const visaoDasLinhas: VisaoFinanceiraPorLinha[] = [];

    for (const linha of carteira.todasAsLinhas()) {
      const montante = linha.montanteOuValorMercadoReferencia();
      const fluxo = linha.estimativaFluxoFinanceiroRecorrentePorMes();
      patrimonioTotal = patrimonioTotal.somar(montante);
      fluxoMensal = fluxoMensal.somar(fluxo);
      visaoDasLinhas.push({
        linhaId: linha.id,
        apelido: linha.aliasCurto(),
        patrimonioEmReaisMostradoNaReferenciaAtual: montante.valorEmReais(),
        projetadoRetornoOuDividendoMensalEmReais: fluxo.valorEmReais(),
      });
    }

    return {
      carteiraId: carteira.id,
      nomeTitular: carteira.titular,
      visaoDasLinhas,
      patrimonioTotalEmReais: patrimonioTotal.valorEmReais(),
      somaDosFluxosMensaisProjEmReais: fluxoMensal.valorEmReais(),
    };
  }
}
