import { DiContainer } from "./core/di-container.js";
import { Tokens } from "./core/tokens.js";
import {
  registrarDependencias,
  type PerfilExecucao,
} from "./composition/registrar-dependencias.js";
import { Acao } from "./domain/acao.js";
import { FundoImobiliario } from "./domain/fundo-imobiliario.js";
import type { SilentLogger } from "./observabilidade/silent-logger.js";
import type { ContadorRequisicao } from "./infra/contador-requisicao.js";
import type { InvestimentoService } from "./service/investimento.service.js";
import type { RelatorioPortfolioService } from "./service/relatorio-portfolio.service.js";

function executarCenario(perfil: PerfilExecucao, titulo: string): void {
  console.log("");
  console.log(`=== ${titulo} ===`);

  const container = new DiContainer();
  registrarDependencias(container, perfil);

  const a = container.resolve<ContadorRequisicao>(Tokens.contadorRequisicao);
  const b = container.resolve<ContadorRequisicao>(Tokens.contadorRequisicao);
  console.log(
    "Transient: duas resoluções do ContadorRequisicao → ids distintos?",
    a.id !== b.id,
    `(${a.id} vs ${b.id})`,
  );

  const service = container.resolve<InvestimentoService>(Tokens.investimentoService);
  service.adicionar(new Acao("Empresa X", 10000, 0.1));
  service.adicionar(new FundoImobiliario("FII ABC", 5000));

  console.log("Total:", service.calcularTotal());

  const relatorio = container.resolve<RelatorioPortfolioService>(
    Tokens.relatorioPortfolio,
  );
  console.log("Relatório:", relatorio.linhaResumo());

  if (perfil === "teste") {
    const logger = container.resolve(Tokens.logger) as SilentLogger;
    console.log("Logs capturados (SilentLogger):", logger.mensagens.length, "linhas");
  }
}

executarCenario("desenvolvimento", "Perfil desenvolvimento (ConsoleLogger + repositório auditado)");
executarCenario("teste", "Perfil teste (SilentLogger — inspeção programática)");
