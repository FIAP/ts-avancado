import { formatarResumoParaExibicao } from "../../adapters/presenters/resumo-carteira.presenter.js";
import {
  comporComPersistenciaEmMemoria,
  comporComRepositorioVazio,
} from "../../composition/composicao.js";
import { Acao } from "../../domain/entities/acao.js";
import { FundoImobiliario } from "../../domain/entities/fundo-imobiliario.js";

console.log("=== Drivers: CLI + repositório em memória ===");
const app = comporComPersistenciaEmMemoria();
app.adicionarInvestimento.executar(
  new Acao("a-1", "TechBr", 10_000, 0.08),
);
app.adicionarInvestimento.executar(
  new FundoImobiliario("f-1", "FII Logística", 20_000, 0.003),
);
const resumo = app.calcularRetornoTotal.executar();
console.log("Resumo (presenter):", formatarResumoParaExibicao(resumo));
console.log("Listagem (caso de uso):", app.listarInvestimentos.executar());

console.log("");
console.log("=== Mesmos casos de uso, adaptador que não persiste ===");
const demo = comporComRepositorioVazio();
demo.adicionarInvestimento.executar(new Acao("x", "Ignorado", 1, 1));
console.log(
  "Resumo (presenter):",
  formatarResumoParaExibicao(demo.calcularRetornoTotal.executar()),
);
