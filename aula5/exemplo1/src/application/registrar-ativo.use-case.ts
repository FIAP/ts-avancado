import type { Ativo } from "../domain/ativo.interface.js";
import type { RepositorioDeAtivos } from "./ports/repositorio-ativos.port.js";

export class RegistrarAtivoUseCase {
  constructor(private readonly repositorio: RepositorioDeAtivos) {}

  executar(ativo: Ativo): void {
    this.repositorio.salvar(ativo);
  }
}
