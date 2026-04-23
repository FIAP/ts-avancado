import { Acao } from "./domain/acao.js";
import { FundoImobiliario } from "./domain/fundo-imobiliario.js";
import type { Investimento } from "./domain/investimento.interface.js";
import { MemoryRepository } from "./repository/memory.repository.js";
import { InvestimentoService } from "./service/investimento.service.js";

const repo = new MemoryRepository<Investimento>();

const service = new InvestimentoService(repo);

service.adicionar(new Acao("Empresa X", 10000, 0.1));
service.adicionar(new FundoImobiliario("FII ABC", 5000));

console.log("Total de retorno:", service.calcularTotal());
