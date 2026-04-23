export abstract class Investimento {
  public readonly nome: string;
  #valor: number;

  constructor(nome: string, valorInicial: number) {
    this.nome = nome;
    this.#valor = Investimento.#exigePositivo(valorInicial);
  }

  static #exigePositivo(v: number): number {
    if (v <= 0) {
      throw new Error("O valor do investimento deve ser positivo.");
    }
    return v;
  }

  get valor(): number {
    return this.#valor;
  }

  protected atualizarValor(novoValor: number): void {
    this.#valor = Investimento.#exigePositivo(novoValor);
  }

  abstract calcularRetorno(): number;
}
