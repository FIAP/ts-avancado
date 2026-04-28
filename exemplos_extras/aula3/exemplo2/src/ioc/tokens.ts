export const TOKENS = {
  notificador: "Notificador",
  cadastroUsuario: "CadastroUsuario",
} as const;

export type Token = (typeof TOKENS)[keyof typeof TOKENS];
