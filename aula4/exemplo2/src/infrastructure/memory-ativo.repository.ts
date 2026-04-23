import type { AtivoFinanceiro } from "../domain/ativo-financeiro.interface.js";
import type { AtivoRepository } from "../application/ports/ativo.repository.port.js";

export class MemoryAtivoRepository implements AtivoRepository {
  readonly #itens: AtivoFinanceiro[] = [];

  salvar(ativo: AtivoFinanceiro): void {
    this.#itens.push(ativo);
  }

  listar(): readonly AtivoFinanceiro[] {
    return this.#itens;
  }
}
