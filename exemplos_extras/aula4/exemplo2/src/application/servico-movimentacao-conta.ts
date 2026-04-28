import { ContaCorrente } from "#app/domain/conta-corrente.js";
import type { RegistradorAuditoria } from "#app/auditoria/registrador-auditoria.js";
import { CalculadoraTarifaSaque } from "#app/encargos/calculadora-tarifa-saque.js";
import { GeradorComprovanteXmlSimples } from "#app/comprovante/gerador-comprovante.js";
import { ValidadorDocumentoCliente } from "#app/validacao/validador-documento.js";
import { ValidadorValoresOperacao } from "#app/validacao/validador-valores-operacao.js";

/**
 * Orquestra o caso de uso: delega validação, tarifa, mutação da conta, auditoria e comprovante.
 * Esta classe só “coordena”; cada colaborador tem uma única razão típica para mudar (SRP).
 */
export class ServicoMovimentacaoConta {
  constructor(
    private readonly documentos: ValidadorDocumentoCliente,
    private readonly valores: ValidadorValoresOperacao,
    private readonly tarifas: CalculadoraTarifaSaque,
    private readonly auditoria: RegistradorAuditoria,
    private readonly comprovantes: GeradorComprovanteXmlSimples,
  ) {}

  executarDeposito(
    conta: ContaCorrente,
    valorEmReais: number,
    documentoInformado: string,
  ): string {
    const doc = this.documentos.normalizar(documentoInformado);
    this.documentos.garantirCpf11Digitos(doc);
    this.valores.garantirValorPositivoEmReais(valorEmReais, "Valor de depósito");
    const centavos = Math.round(valorEmReais * 100);
    this.auditoria.registrar(
      `depósito solicitado | saldo antes (centavos): ${conta.obterSaldoCentavos()}`,
    );
    conta.creditar(centavos);
    this.auditoria.registrar(
      `depósito concluído | saldo depois (centavos): ${conta.obterSaldoCentavos()}`,
    );
    return this.comprovantes.gerar({
      tipo: "DEPÓSITO",
      documentoCliente: doc,
      valorCentavos: centavos,
      tarifaCentavos: 0,
      saldoAposCentavos: conta.obterSaldoCentavos(),
    });
  }

  executarSaque(
    conta: ContaCorrente,
    valorEmReais: number,
    documentoInformado: string,
  ): string {
    const doc = this.documentos.normalizar(documentoInformado);
    this.documentos.garantirCpf11Digitos(doc);
    this.valores.garantirValorPositivoEmReais(valorEmReais, "Valor de saque");
    const valorCentavos = Math.round(valorEmReais * 100);
    const tarifaCentavos = this.tarifas.calcularTarifaCentavos(valorCentavos);
    this.tarifas.garantirSaldoParaSaqueComTarifa(conta, valorCentavos, tarifaCentavos);
    this.auditoria.registrar(
      `saque solicitado | saldo antes (centavos): ${conta.obterSaldoCentavos()}`,
    );
    conta.debitar(valorCentavos + tarifaCentavos);
    this.auditoria.registrar(
      `saque concluído | saldo depois (centavos): ${conta.obterSaldoCentavos()}`,
    );
    return this.comprovantes.gerar({
      tipo: "SAQUE",
      documentoCliente: doc,
      valorCentavos,
      tarifaCentavos,
      saldoAposCentavos: conta.obterSaldoCentavos(),
    });
  }
}
