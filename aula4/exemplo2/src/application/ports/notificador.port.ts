export interface Notificador {
  publicar(canal: string, mensagem: string): void;
}
