// T = tipo do conteúdo; uma única classe, vários usos (number, string, objeto…).
export class Caixa<T> {
  constructor(private conteudo: T) {}

  obterConteudo(): T {
    return this.conteudo;
  }
}
