import type { PoliticaCorretagem } from "#app/domain/corretagem.js";
import { Dinheiro } from "#app/domain/dinheiro.js";
import type { ExecucaoOrdem } from "#app/domain/execucao-ordem.js";
import type { Ordem } from "#app/domain/ordem.js";

export type OuvinteExecucao = (execucao: ExecucaoOrdem) => void;

export class RelatorioMesa {
  private constructor(
    public readonly execucoes: readonly ExecucaoOrdem[],
    public readonly totalNotional: Dinheiro,
    public readonly totalCorretagem: Dinheiro,
  ) {}

  static consolidar(execucoes: ExecucaoOrdem[]): RelatorioMesa {
    if (execucoes.length === 0) {
      return new RelatorioMesa([], Dinheiro.zero(), Dinheiro.zero());
    }
    const totalNotional = execucoes
      .slice(1)
      .reduce((a, e) => a.somar(e.notional), execucoes[0]!.notional);
    const totalCorretagem = execucoes
      .slice(1)
      .reduce((a, e) => a.somar(e.corretagem), execucoes[0]!.corretagem);
    return new RelatorioMesa(execucoes, totalNotional, totalCorretagem);
  }
}

export class MesaNegocios {
  readonly #fila: Ordem[] = [];
  readonly #ouvintes: OuvinteExecucao[] = [];

  inscrever(ouvinte: OuvinteExecucao): void {
    this.#ouvintes.push(ouvinte);
  }

  enfileirar(ordem: Ordem): void {
    this.#fila.push(ordem);
  }

  processar(politica: PoliticaCorretagem): RelatorioMesa {
    const execucoes: ExecucaoOrdem[] = [];
    for (const ordem of this.#fila) {
      const execucao = ordem.executar(politica);
      execucoes.push(execucao);
      for (const ouvinte of this.#ouvintes) {
        ouvinte(execucao);
      }
    }
    this.#fila.length = 0;
    return RelatorioMesa.consolidar(execucoes);
  }
}
