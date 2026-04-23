import {
  comporComPersistenciaEmMemoria,
  comporComRepositorioVazio,
} from "../composition/composicao.js";
import { Acao } from "../domain/acao.js";
import { FundoImobiliario } from "../domain/fundo-imobiliario.js";

console.log("=== Infraestrutura: repositório em memória ===");
const app = comporComPersistenciaEmMemoria();
app.adicionarInvestimento.executar(
  new Acao("a-1", "TechBr", 10_000, 0.08),
);
app.adicionarInvestimento.executar(
  new FundoImobiliario("f-1", "FII Logística", 20_000, 0.003),
);
console.log("Retorno total:", app.calcularRetornoTotal.executar());

console.log("");
console.log("=== Mesmos casos de uso, repositório que não persiste ===");
const demo = comporComRepositorioVazio();
demo.adicionarInvestimento.executar(new Acao("x", "Ignorado", 1, 1));
console.log("Retorno total:", demo.calcularRetornoTotal.executar());
