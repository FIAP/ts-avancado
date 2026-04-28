import { ContaCorrente } from "#app/domain/conta-corrente.js";
import { AuditoriaSaqueConsole } from "#app/infra/auditoria-saque-console.js";
import { CalculadoraTarifaSaqueUmPorCento } from "#app/infra/calculadora-tarifa-saque-um-por-cento.js";

/**
 * Anti-DIP: módulo de alto nível (orquestração de saque) **conhece e cria** detalhes concretos.
 * Trocar auditoria (ex.: Splunk) ou política de tarifa exige **editar** esta classe.
 */
export class ServicoSaqueAcoplado {
  private readonly auditoria = new AuditoriaSaqueConsole();
  private readonly calculadoraTarifa = new CalculadoraTarifaSaqueUmPorCento();

  executar(
    conta: ContaCorrente,
    valorSaqueEmReais: number,
  ): { tarifaCentavos: number; totalDebitadoCentavos: number } {
    if (!Number.isFinite(valorSaqueEmReais) || valorSaqueEmReais <= 0) {
      throw new Error("Valor de saque inválido.");
    }
    const valorCentavos = Math.round(valorSaqueEmReais * 100);
    const tarifa = this.calculadoraTarifa.calcularTarifaCentavos(valorCentavos);
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
