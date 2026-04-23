import { Acao } from "./domain/acao.js";
import { FundoImobiliario } from "./domain/fundo-imobiliario.js";
import type { Investimento } from "./domain/investimento.interface.js";
import { MemoryRepository } from "./repository/memory.repository.js";
import { InvestimentoCadastroService } from "./service/investimento-cadastro.service.js";
import { PortfolioConsultaService } from "./service/portfolio-consulta.service.js";

const repo = new MemoryRepository<Investimento>();
const cadastro = new InvestimentoCadastroService(repo);
const consulta = new PortfolioConsultaService(repo);

const a1 = new Acao("inv-1", "Empresa X", 10_000, 0.1);
const f1 = new FundoImobiliario("inv-2", "FII ABC", 5_000);

console.log("Registro inv-1:", cadastro.registrar(a1));
console.log("Registro inv-2:", cadastro.registrar(f1));
console.log(
  "Tentativa duplicada (mesmo id):",
  cadastro.registrar(new Acao("inv-1", "Clone", 1, 1)),
);

console.log("");
console.log("Total de retornos (consulta só com interface de leitura):", consulta.totalRetornosEsperados());
console.log("Resumo por id inv-1:", consulta.resumoRetornoPorId("inv-1"));
console.log("Resumo por id inexistente:", consulta.resumoRetornoPorId("x"));
