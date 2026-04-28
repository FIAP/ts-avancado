/** Porta secundária: onde o domínio “avisou” eventos de saque sem conhecer stdout, fila, etc. */
export interface PortaAuditoriaSaque {
  registrarEvento(mensagem: string): void;
}
