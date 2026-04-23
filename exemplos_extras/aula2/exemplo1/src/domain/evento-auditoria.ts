import type { Registravel } from "#app/domain/registravel.js";

// Objeto literal também pode satisfazer a interface (sem `implements`).
export function criarEventoAuditoria(
  id: string,
  acao: string,
  detalhe: string,
): Registravel {
  return {
    id,
    resumoParaLog(): string {
      return `[Auditoria ${id}] ${acao}: ${detalhe}`;
    },
  };
}
