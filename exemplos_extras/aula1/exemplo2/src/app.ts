import { ContaCorrente } from "#app/domain/conta-corrente.js";

function main(): void {
  const conta = new ContaCorrente(500);
 
  
  console.log("Saldo inicial (via interface pública):", conta.obterSaldoEmReais());

  conta.depositar(120.5);
  console.log("Após depósito:", conta.obterSaldoEmReais());

  const saqueOk = conta.sacar(200);
  console.log("Saque de R$ 200,00 autorizado?", saqueOk, "| Saldo:", conta.obterSaldoEmReais());

  const saqueNegado = conta.sacar(1_000_000);
  console.log("Saque exagerado autorizado?", saqueNegado, "| Saldo:", conta.obterSaldoEmReais());

  // conta.saldoCentavos não compila: propriedade privada — detalhe interno escondido.
}

main();
