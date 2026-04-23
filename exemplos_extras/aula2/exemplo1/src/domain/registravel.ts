// Interface = contrato: quem implementa garante estes membros (TypeScript usa tipagem estrutural).
export interface Registravel {
  readonly id: string;
  resumoParaLog(): string;
}
