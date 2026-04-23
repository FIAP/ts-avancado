import type { Ativo } from "../../../domain/ativo.interface.js";
import type { RepositorioDeAtivos } from "../../../application/ports/repositorio-ativos.port.js";

export class RepositorioMemoriaAdapter implements RepositorioDeAtivos {
  private readonly armazenamento: Ativo[] = [];

  salvar(ativo: Ativo): void {
    this.armazenamento.push(ativo);
  }

  listar(): readonly Ativo[] {
    return this.armazenamento;
  }
}
