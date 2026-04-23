import { Banco } from "./banco.js";
import { ContaCorrente } from "./conta-corrente.js";
import { ContaPoupanca } from "./conta-poupanca.js";

const banco = new Banco();

banco.cadastrar(new ContaCorrente("1001"));
banco.cadastrar(new ContaPoupanca("2002"));

banco.depositar("1001", 500);
banco.depositar("2002", 300);
banco.sacar("1001", 50);

console.log("Contas no banco:");
for (const linha of banco.listarContas()) {
  console.log(linha);
}
