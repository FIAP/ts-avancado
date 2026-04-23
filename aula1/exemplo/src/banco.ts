import type { Conta } from "./conta.js";

/**
 * O banco centraliza o cadastro. Por dentro guarda um mapa privado;
 * por fora só expõe operações de alto nível.
 */
export class Banco {
  private readonly contas = new Map<string, Conta>();

  public cadastrar(conta: Conta): boolean {
    if (this.contas.has(conta.numero)) {
      return false;
    }
    this.contas.set(conta.numero, conta);
    return true;
  }

  public depositar(numero: string, valor: number): boolean {
    const conta = this.contas.get(numero);
    if (!conta) {
      return false;
    }
    conta.creditar(valor);
    return true;
  }

  public sacar(numero: string, valor: number): boolean {
    const conta = this.contas.get(numero);
    if (!conta) {
      return false;
    }
    return conta.debitar(valor);
  }

  /** Polimorfismo: cada conta responde a resumo() à sua maneira. */
  public listarContas(): string[] {
    return [...this.contas.values()].map((c) => c.resumo());
  }
}
