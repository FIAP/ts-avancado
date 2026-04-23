import type { Investimento } from "../domain/investimento.interface.js";
import { FakeRepository } from "../repository/fake.repository.js";
import { MemoryRepository } from "../repository/memory.repository.js";
import { InvestimentoService } from "../service/investimento.service.js";

export class Container {
  static getInvestimentoService(): InvestimentoService {
    const repo = new MemoryRepository<Investimento>();
    return new InvestimentoService(repo);
  }

  static getInvestimentoServiceComRepositorioFake(): InvestimentoService {
    const repo = new FakeRepository<Investimento>();
    return new InvestimentoService(repo);
  }
}
