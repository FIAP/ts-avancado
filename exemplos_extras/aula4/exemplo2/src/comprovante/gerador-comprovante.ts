// Responsabilidade: formatação do comprovante (layout pode mudar sem tocar saldo nem tarifas).
export type DadosComprovante = {
  tipo: "DEPÓSITO" | "SAQUE";
  documentoCliente: string;
  valorCentavos: number;
  tarifaCentavos: number;
  saldoAposCentavos: number;
};

export class GeradorComprovanteXmlSimples {
  gerar(d: DadosComprovante): string {
    const fmt = (c: number) =>
      (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return [
      "<comprovante>",
      `  <tipo>${d.tipo}</tipo>`,
      `  <documento>${d.documentoCliente}</documento>`,
      `  <valor>${fmt(d.valorCentavos)}</valor>`,
      `  <tarifa>${fmt(d.tarifaCentavos)}</tarifa>`,
      `  <saldo_final>${fmt(d.saldoAposCentavos)}</saldo_final>`,
      "</comprovante>",
    ].join("\n");
  }
}
