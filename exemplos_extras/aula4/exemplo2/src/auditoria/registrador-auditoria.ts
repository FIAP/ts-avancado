// Responsabilidade: registrar eventos para auditoria (implementação pode virar arquivo/API).
export interface RegistradorAuditoria {
  registrar(linha: string): void;
}

export class AuditoriaConsole implements RegistradorAuditoria {
  registrar(linha: string): void {
    console.log(`[AUDITORIA] ${linha}`);
  }
}
