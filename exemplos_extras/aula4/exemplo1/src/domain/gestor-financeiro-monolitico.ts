/**
 * Anti-padrão (viola SRP): uma única classe conhece regras de negócio, validações,
 * cálculo de tarifa, persistência de estado, auditoria em console e formatação de comprovante.
 * Qualquer mudança em regra, layout ou canal de log exige editar esta classe.
 */
export class GestorFinanceiroMonolitico {
  private saldoEmReais = 1_000;

  processarDeposito(valorEmReais: number, documentoCliente: string): string {
    const doc = this.normalizarDocumento(documentoCliente);
    if (!this.documentoPareceValido(doc)) {
      throw new Error("Documento do cliente inválido.");
    }
    if (valorEmReais <= 0) {
      throw new Error("Valor de depósito inválido.");
    }
    console.log(`[AUDITORIA] depósito solicitado | saldo antes: ${this.formatarMoeda(this.saldoEmReais)}`);
    this.saldoEmReais += valorEmReais;
    console.log(`[AUDITORIA] depósito concluído | saldo depois: ${this.formatarMoeda(this.saldoEmReais)}`);
    return this.montarComprovanteHtml("DEPÓSITO", valorEmReais, 0, doc);
  }

  processarSaque(valorEmReais: number, documentoCliente: string): string {
    const doc = this.normalizarDocumento(documentoCliente);
    if (!this.documentoPareceValido(doc)) {
      throw new Error("Documento do cliente inválido.");
    }
    if (valorEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const tarifa = this.calcularTarifaSaque(valorEmReais);
    const debitoTotal = valorEmReais + tarifa;
    if (this.saldoEmReais < debitoTotal) {
      throw new Error("Saldo insuficiente (inclui tarifa).");
    }
    console.log(`[AUDITORIA] saque solicitado | saldo antes: ${this.formatarMoeda(this.saldoEmReais)}`);
    this.saldoEmReais -= debitoTotal;
    console.log(`[AUDITORIA] saque concluído | saldo depois: ${this.formatarMoeda(this.saldoEmReais)}`);
    return this.montarComprovanteHtml("SAQUE", valorEmReais, tarifa, doc);
  }

  obterSaldoEmReais(): number {
    return this.saldoEmReais;
  }

  private normalizarDocumento(doc: string): string {
    return doc.replaceAll(/\D/g, "");
  }

  private documentoPareceValido(apenasDigitos: string): boolean {
    return apenasDigitos.length === 11;
  }

  private calcularTarifaSaque(valor: number): number {
    return Math.round(valor * 0.01 * 100) / 100;
  }

  private formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  private montarComprovanteHtml(
    tipo: "DEPÓSITO" | "SAQUE",
    valor: number,
    tarifa: number,
    documento: string,
  ): string {
    const linhas = [
      "<comprovante>",
      `  <tipo>${tipo}</tipo>`,
      `  <documento>${documento}</documento>`,
      `  <valor>${this.formatarMoeda(valor)}</valor>`,
      `  <tarifa>${this.formatarMoeda(tarifa)}</tarifa>`,
      `  <saldo_final>${this.formatarMoeda(this.saldoEmReais)}</saldo_final>`,
      "</comprovante>",
    ];
    return linhas.join("\n");
  }
}
