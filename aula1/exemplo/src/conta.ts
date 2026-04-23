/**
 * Abstração: quem usa só enxerga o contrato da conta (número, crédito, débito, resumo).
 * Encapsulamento: o saldo é privado e só muda pelos métodos da própria classe.
 */
export abstract class Conta {
  private saldo = 0;

  constructor(public readonly numero: string) {}

  public creditar(valor: number): void {
    if (valor <= 0 || !Number.isFinite(valor)) {
      return;
    }
    this.saldo += valor;
  }

  public debitar(valor: number): boolean {
    if (valor <= 0 || !Number.isFinite(valor)) {
      return false;
    }
    if (valor > this.saldo) {
      return false;
    }
    this.saldo -= valor;
    return true;
  }

  public consultarSaldo(): number {
    return this.saldo;
  }

  /** Cada tipo de conta define como se apresenta (polimorfismo). */
  public abstract resumo(): string;
}
