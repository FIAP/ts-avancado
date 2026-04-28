import type { PortaAuditoriaSaque } from "#app/portas/porta-auditoria-saque.js";

export class AuditoriaSaqueConsole implements PortaAuditoriaSaque {
  registrarEvento(mensagem: string): void {
    console.log(`[AUDITORIA SAQUE] ${mensagem}`);
  }
}
