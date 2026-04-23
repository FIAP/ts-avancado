import type { Ativo } from "../../domain/ativo.interface.js";

export interface RepositorioDeAtivos {
  salvar(ativo: Ativo): void;
  listar(): readonly Ativo[];
}
