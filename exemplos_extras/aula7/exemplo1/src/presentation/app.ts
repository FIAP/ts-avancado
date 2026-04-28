import { criarModuloDemonstracaoFinanceira } from "../composition/composicao.js";

const app = criarModuloDemonstracaoFinanceira();

const primeira = app.criarCarteiraInvestimentos.executar({ titular: "Marina Tavares" });
console.info("Nova carteira:", primeira.idDaCarteira);

app.adicionarLinhaAoCarteira.executar({
  carteiraId: primeira.idDaCarteira,
  configuracaoLinha: {
    tipo: "cdb",
    nomeResumido: "Liquidez DI",
    principalEmReais: 25000,
    taxaAnualDeclaradaPct: 12.75,
  },
});

app.adicionarLinhaAoCarteira.executar({
  carteiraId: primeira.idDaCarteira,
  configuracaoLinha: {
    tipo: "acao_ord",
    codigo: "PETR4",
    quantidadeDeCotas: 100,
    precoUnitarioAtualEmReais: 35.82,
    dividendYieldAnualEstimPct: 6,
  },
});

const panorama = app.obterPanoramaFinanceiro.executar({
  carteiraId: primeira.idDaCarteira,
});

console.info("Titular:", panorama.nomeTitular);
console.info("Linhas:");
for (const linha of panorama.visaoDasLinhas) {
  console.info(
    `  - ${linha.apelido} | Patrimônio (ref.) R$ ${linha.patrimonioEmReaisMostradoNaReferenciaAtual.toFixed(2)} | Fluxo mensal proj. R$ ${linha.projetadoRetornoOuDividendoMensalEmReais.toFixed(4)}`,
  );
}
console.info("Patrimônio total consolidado:", panorama.patrimonioTotalEmReais.toFixed(2));
console.info("Somatório dos fluxos mensais projetados:", panorama.somaDosFluxosMensaisProjEmReais.toFixed(4));
