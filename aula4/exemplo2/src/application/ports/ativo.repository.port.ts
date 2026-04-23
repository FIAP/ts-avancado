import type { AtivoFinanceiro } from "../../domain/ativo-financeiro.interface.js";

export interface AtivoRepository {
  salvar(ativo: AtivoFinanceiro): void;
  listar(): readonly AtivoFinanceiro[];
}
