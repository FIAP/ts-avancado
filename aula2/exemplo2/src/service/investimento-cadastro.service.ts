import type { Result } from "../core/result.js";
import type { Investimento } from "../domain/investimento.interface.js";
import type { Repository } from "../repository/repository.interface.js";

export class InvestimentoCadastroService {
  constructor(private readonly repo: Repository<Investimento>) {}

  registrar(investimento: Investimento): Result<void, string> {
    return this.repo.salvar(investimento);
  }
}
