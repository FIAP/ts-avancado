import type { AtivoFinanceiro } from "../domain/ativo-financeiro.interface.js";
import type { AtivoRepository } from "./ports/ativo.repository.port.js";
import type { Notificador } from "./ports/notificador.port.js";

export class RegistrarAtivoUseCase {
  constructor(
    private readonly repositorio: AtivoRepository,
    private readonly notificador: Notificador,
  ) {}

  executar(ativo: AtivoFinanceiro): void {
    this.repositorio.salvar(ativo);
    this.notificador.publicar(
      "carteira",
      `Ativo registrado: ${ativo.nome} (${ativo.id})`,
    );
  }
}
