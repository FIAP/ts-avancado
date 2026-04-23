import type { RepositorioDeInvestimentos } from "../application/ports/repositorio-investimentos.port.js";
import { AdicionarInvestimentoUseCase } from "../application/use-cases/adicionar-investimento.use-case.js";
import { CalcularRetornoTotalUseCase } from "../application/use-cases/calcular-retorno-total.use-case.js";
import { ListarInvestimentosUseCase } from "../application/use-cases/listar-investimentos.use-case.js";
import { RepositorioMemoriaAdapter } from "../adapters/persistence/repositorio-memoria.adapter.js";
import { RepositorioVazioAdapter } from "../adapters/persistence/repositorio-vazio.adapter.js";

export type Aplicacao = {
  adicionarInvestimento: AdicionarInvestimentoUseCase;
  listarInvestimentos: ListarInvestimentosUseCase;
  calcularRetornoTotal: CalcularRetornoTotalUseCase;
};

function criarAplicacao(repositorio: RepositorioDeInvestimentos): Aplicacao {
  return {
    adicionarInvestimento: new AdicionarInvestimentoUseCase(repositorio),
    listarInvestimentos: new ListarInvestimentosUseCase(repositorio),
    calcularRetornoTotal: new CalcularRetornoTotalUseCase(repositorio),
  };
}

export function comporComPersistenciaEmMemoria(): Aplicacao {
  return criarAplicacao(new RepositorioMemoriaAdapter());
}

export function comporComRepositorioVazio(): Aplicacao {
  return criarAplicacao(new RepositorioVazioAdapter());
}
