import type { RepositorioDeCarteiras } from "../domain/repositorio-carteiras.interface.js";
import { RepositorioDeCarteirasEmMemoria } from "../infrastructure/repositorio-carteiras-memoria.js";
import { AdicionarLinhaAoCarteiraUseCase } from "../application/adicionar-linha-ao-carteira.use-case.js";
import { CriarCarteiraInvestimentosUseCase } from "../application/criar-carteira-investimentos.use-case.js";
import { ObterPanoramaFinanceiroUseCase } from "../application/obter-panorama-financeiro.use-case.js";

export type AplicacaoFinancas = {
  criarCarteiraInvestimentos: CriarCarteiraInvestimentosUseCase;
  adicionarLinhaAoCarteira: AdicionarLinhaAoCarteiraUseCase;
  obterPanoramaFinanceiro: ObterPanoramaFinanceiroUseCase;
};

/** Composição explícita (DI manual) mantendo fluxo de dependência para dentro (domain no centro). */
export function criarModuloDemonstracaoFinanceira(): AplicacaoFinancas {
  const repositorio: RepositorioDeCarteiras = new RepositorioDeCarteirasEmMemoria();
  return {
    criarCarteiraInvestimentos: new CriarCarteiraInvestimentosUseCase(repositorio),
    adicionarLinhaAoCarteira: new AdicionarLinhaAoCarteiraUseCase(repositorio),
    obterPanoramaFinanceiro: new ObterPanoramaFinanceiroUseCase(repositorio),
  };
}
