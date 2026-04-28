import { ContaBancariaBase } from "#app/domain/conta-bancaria-base.js";

/**
 * Anti-LSP: continua sendo `ContaBancariaBase`, mas **debitar** não cumpre a expectativa
 * de “se há saldo, o débito pode ocorrer”. Quem recebe `ContaBancariaBase` quebra ao substituir por este subtipo.
 */
export class ContaSalarioSemSaqueDireto extends ContaBancariaBase {
  constructor(saldoInicialCentavos: number) {
    super(saldoInicialCentavos);
  }

  override debitar(_centavos: number): void {
    throw new Error(
      "Conta salário: saque por débito não permitido neste produto (use folha ou canal autorizado).",
    );
  }
}
