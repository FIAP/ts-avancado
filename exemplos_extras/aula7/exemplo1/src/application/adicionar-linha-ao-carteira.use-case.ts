import { randomUUID } from "node:crypto";
import { AplicacaoCdb } from "../domain/aplicacao-cdb.js";
import type { CarteiraInvestimentos } from "../domain/carteira.entity.js";
import { Dinheiro } from "../domain/dinheiro.js";
import { PosicaoAcaoOrdinaria } from "../domain/posicao-acao-ordinaria.js";
import type { RepositorioDeCarteiras } from "../domain/repositorio-carteiras.interface.js";

export type DadosNovaLinha =
  | {
      tipo: "cdb";
      nomeResumido: string;
      principalEmReais: number;
      taxaAnualDeclaradaPct: number;
    }
  | {
      tipo: "acao_ord";
      codigo: string;
      quantidadeDeCotas: number;
      precoUnitarioAtualEmReais: number;
      dividendYieldAnualEstimPct?: number;
    };

export type AdicionarLinhaInvestimentoSaida = {
  quantidadeLinhasNaCarteira: number;
};

export class AdicionarLinhaAoCarteiraUseCase {
  constructor(private readonly repositorio: RepositorioDeCarteiras) {}

  executar(entrada: { carteiraId: string; configuracaoLinha: DadosNovaLinha }): AdicionarLinhaInvestimentoSaida {
    const carteira = this.buscarOuFalhar(entrada.carteiraId);

    switch (entrada.configuracaoLinha.tipo) {
      case "cdb": {
        const id = randomUUID();
        carteira.registrarLinha(
          new AplicacaoCdb(
            id,
            entrada.configuracaoLinha.nomeResumido,
            Dinheiro.deReais(entrada.configuracaoLinha.principalEmReais),
            entrada.configuracaoLinha.taxaAnualDeclaradaPct,
          ),
        );
        break;
      }
      case "acao_ord": {
        const id = randomUUID();
        carteira.registrarLinha(
          new PosicaoAcaoOrdinaria(
            id,
            entrada.configuracaoLinha.codigo,
            entrada.configuracaoLinha.quantidadeDeCotas,
            Dinheiro.deReais(entrada.configuracaoLinha.precoUnitarioAtualEmReais),
            entrada.configuracaoLinha.dividendYieldAnualEstimPct,
          ),
        );
        break;
      }
    }

    return { quantidadeLinhasNaCarteira: carteira.todasAsLinhas().length };
  }

  private buscarOuFalhar(id: string): CarteiraInvestimentos {
    const c = this.repositorio.obterPorId(id);
    if (!c) {
      throw new Error(`Carteira ${id} não encontrada no repositório.`);
    }
    return c;
  }
}
