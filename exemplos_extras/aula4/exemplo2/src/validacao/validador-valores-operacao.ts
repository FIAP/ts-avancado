// Responsabilidade: validar valores de depósito e regras de saque (sem calcular tarifa).
export class ValidadorValoresOperacao {
  garantirValorPositivoEmReais(valorEmReais: number, rotulo: string): void {
    if (!Number.isFinite(valorEmReais) || valorEmReais <= 0) {
      throw new Error(`${rotulo} inválido.`);
    }
  }
}
