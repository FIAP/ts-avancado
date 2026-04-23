import type { Ativo } from "../../../domain/ativo.interface.js";
import type { RepositorioDeAtivos } from "../../../application/ports/repositorio-ativos.port.js";

export class RepositorioVazioAdapter implements RepositorioDeAtivos {
  salvar(_ativo: Ativo): void {}

  listar(): readonly Ativo[] {
    return [];
  }
}
