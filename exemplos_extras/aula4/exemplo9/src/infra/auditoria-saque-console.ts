/** Implementação concreta de auditoria — o serviço do exemplo9 referencia esta classe diretamente. */
export class AuditoriaSaqueConsole {
  registrarEvento(mensagem: string): void {
    console.log(`[AUDITORIA SAQUE] ${mensagem}`);
  }
}
