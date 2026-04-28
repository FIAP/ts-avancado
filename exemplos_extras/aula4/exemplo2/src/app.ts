import { AuditoriaConsole } from "#app/auditoria/registrador-auditoria.js";
import { ServicoMovimentacaoConta } from "#app/application/servico-movimentacao-conta.js";
import { ContaCorrente } from "#app/domain/conta-corrente.js";
import { CalculadoraTarifaSaque } from "#app/encargos/calculadora-tarifa-saque.js";
import { GeradorComprovanteXmlSimples } from "#app/comprovante/gerador-comprovante.js";
import { ValidadorDocumentoCliente } from "#app/validacao/validador-documento.js";
import { ValidadorValoresOperacao } from "#app/validacao/validador-valores-operacao.js";

function main(): void {
  const conta = new ContaCorrente("0001-1", 100_000); // R$ 1.000,00

  const servico = new ServicoMovimentacaoConta(
    new ValidadorDocumentoCliente(),
    new ValidadorValoresOperacao(),
    new CalculadoraTarifaSaque(0.01),
    new AuditoriaConsole(),
    new GeradorComprovanteXmlSimples(),
  );

  const cpf = "12345678909";

  console.log(
    "Exemplo com SRP: classes separadas para documento, valores, tarifa, conta, auditoria e comprovante.\n",
  );

  console.log(servico.executarDeposito(conta, 250, cpf));
  console.log("");
  console.log(servico.executarSaque(conta, 100, cpf));
  console.log("");
  console.log("Saldo final (centavos):", conta.obterSaldoCentavos());
}

main();
