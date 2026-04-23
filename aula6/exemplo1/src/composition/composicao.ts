import { AdicionarInvestimentoUseCase } from "../application/adicionar-investimento.use-case.js";
import { CalcularRetornoTotalUseCase } from "../application/calcular-retorno-total.use-case.js";
import type { RepositorioDeInvestimentos } from "../domain/repositorio-investimentos.interface.js";
import { RepositorioMemoria } from "../infrastructure/persistencia/repositorio-memoria.js";
import { RepositorioVazio } from "../infrastructure/persistencia/repositorio-vazio.js";

export type Aplicacao = {
  adicionarInvestimento: AdicionarInvestimentoUseCase;
  calcularRetornoTotal: CalcularRetornoTotalUseCase;
};

export function comporComPersistenciaEmMemoria(): Aplicacao {
  const repositorio: RepositorioDeInvestimentos = new RepositorioMemoria();
  return {
    adicionarInvestimento: new AdicionarInvestimentoUseCase(repositorio),
    calcularRetornoTotal: new CalcularRetornoTotalUseCase(repositorio),
  };
}

export function comporComRepositorioVazio(): Aplicacao {
  const repositorio: RepositorioDeInvestimentos = new RepositorioVazio();
  return {
    adicionarInvestimento: new AdicionarInvestimentoUseCase(repositorio),
    calcularRetornoTotal: new CalcularRetornoTotalUseCase(repositorio),
  };
}
