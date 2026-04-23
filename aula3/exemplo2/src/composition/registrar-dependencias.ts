import { DiContainer } from "../core/di-container.js";
import type { Investimento } from "../domain/investimento.interface.js";
import type { Logger } from "../observabilidade/logger.interface.js";
import { Tokens } from "../core/tokens.js";
import { ConsoleLogger } from "../observabilidade/console-logger.js";
import { SilentLogger } from "../observabilidade/silent-logger.js";
import { AuditedRepository } from "../repository/audited.repository.js";
import { MemoryRepository } from "../repository/memory.repository.js";
import { InvestimentoService } from "../service/investimento.service.js";
import { RelatorioPortfolioService } from "../service/relatorio-portfolio.service.js";
import { ContadorRequisicao } from "../infra/contador-requisicao.js";

export type PerfilExecucao = "desenvolvimento" | "teste";

export function registrarDependencias(
  container: DiContainer,
  perfil: PerfilExecucao,
): void {
  if (perfil === "teste") {
    container.registerSingleton(Tokens.logger, () => new SilentLogger());
  } else {
    container.registerSingleton(Tokens.logger, () => new ConsoleLogger());
  }

  container.registerSingleton(Tokens.repositoryInvestimento, () => {
    const logger = container.resolve<Logger>(Tokens.logger);
    const memoria = new MemoryRepository<Investimento>();
    return new AuditedRepository(memoria, logger, "Investimentos");
  });

  container.registerSingleton(Tokens.investimentoService, () => {
    return new InvestimentoService(
      container.resolve(Tokens.repositoryInvestimento),
      container.resolve(Tokens.logger),
    );
  });

  container.registerSingleton(Tokens.relatorioPortfolio, () => {
    return new RelatorioPortfolioService(
      container.resolve(Tokens.repositoryInvestimento),
    );
  });

  container.registerTransient(Tokens.contadorRequisicao, () => new ContadorRequisicao());
}
