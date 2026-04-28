import { ContaCorrente } from "#app/domain/conta-corrente.js";
import type { PoliticaEncargoSaque } from "#app/portas/politica-encargo-saque.js";
import type { PortaAuditoriaSaque } from "#app/portas/porta-auditoria-saque.js";

/**
 * DIP: política e auditoria são **abstrações** definidas pelo domínio (portas).
 * Infraestrutura concreta é **injetada**; o serviço permanece estável ao trocar console por fila, Splunk, etc.
 */
export class ServicoSaque {
  constructor(
    private readonly politicaEncargo: PoliticaEncargoSaque,
    private readonly auditoria: PortaAuditoriaSaque,
  ) {}

  executar(
    conta: ContaCorrente,
    valorSaqueEmReais: number,
  ): { tarifaCentavos: number; totalDebitadoCentavos: number } {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const valorCentavos = Math.round(valorSaqueEmReais * 100);
    const tarifa = this.politicaEncargo.calcularTarifaCentavos(valorCentavos);
    const total = valorCentavos + tarifa;
    this.auditoria.registrarEvento(
      `solicitado | conta=${conta.numero} | valor_centavos=${valorCentavos} | tarifa_centavos=${tarifa}`,
    );
    if (conta.obterSaldoCentavos() < total) {
      throw new Error("Saldo insuficiente (inclui tarifa).");
    }
    conta.debitar(total);
    this.auditoria.registrarEvento(
      `concluído | conta=${conta.numero} | total_debitado_centavos=${total} | saldo_restante=${conta.obterSaldoCentavos()}`,
    );
    return { tarifaCentavos: tarifa, totalDebitadoCentavos: total };
  }
}
