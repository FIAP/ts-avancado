import { ordemDeDto } from "#app/aplicacao/fabrica-ordens.js";
import {
  CorretagemComposta,
  CorretagemEscalonada,
  CorretagemPercentual,
  CorretagemValorFixo,
} from "#app/domain/corretagem.js";
import { Dinheiro } from "#app/domain/dinheiro.js";
import { MesaNegocios } from "#app/domain/mesa-negocios.js";

function main(): void {
  const limitePequenaOperacao = Dinheiro.emReais(50_000);

  const politicaInstitucional = new CorretagemEscalonada(
    limitePequenaOperacao,
    new CorretagemComposta([
      new CorretagemValorFixo(Dinheiro.emReais(29.9)),
      new CorretagemPercentual(0.0003),
    ]),
    new CorretagemComposta([
      new CorretagemValorFixo(Dinheiro.emReais(49.9)),
      new CorretagemPercentual(0.0008),
    ]),
  );

  const mesa = new MesaNegocios();

  mesa.inscrever((exec) => {
    console.log(
      `[auditoria] ${exec.tipo} ${exec.ativo} | notional ${exec.notional} | taxa ${exec.corretagem} | caixa cliente ${exec.fluxoDeCaixaCliente()}`,
    );
  });

  const dtos = [
    ordemDeDto({
      tipo: "compra",
      id: "o-001",
      clienteId: "c-7",
      ativo: "TSAV3",
      quantidade: 100,
      precoReais: 42.5,
    }),
    ordemDeDto({
      tipo: "compra",
      id: "o-002",
      clienteId: "c-7",
      ativo: "TSAV3",
      quantidade: 2_000,
      precoReais: 42.5,
    }),
    ordemDeDto({
      tipo: "venda",
      id: "o-003",
      clienteId: "c-12",
      ativo: "FIIT",
      quantidade: 400,
      precoReais: 108,
      posicaoDisponivel: 500,
    }),
  ] as const;

  for (const o of dtos) {
    mesa.enfileirar(o);
  }

  const relatorio = mesa.processar(politicaInstitucional);

  console.log("");
  console.log("--- Resumo da mesa ---");
  console.log(`Operações: ${relatorio.execucoes.length}`);
  console.log(`Soma notionals: ${relatorio.totalNotional}`);
  console.log(`Soma corretagens: ${relatorio.totalCorretagem}`);
}

main();
