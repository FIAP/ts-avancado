import { Caixa } from "#app/domain/caixa.js";
import { primeiroElemento } from "#app/domain/primeiro-elemento.js";

type Ponto = { x: number; y: number };

type Animal = { nome: string; idade: number };

function main(): void {
  const caixaNumero = new Caixa(2025);
  const caixaTexto = new Caixa("TypeScript");
  const caixaPonto = new Caixa<Ponto>({ x: 1, y: 2 });
  const caixaAnimal = new Caixa<Animal>({ nome: "Thor", idade: 3 });

  console.log("Caixa<number>:", caixaNumero.obterConteudo());
  console.log("Caixa<string>:", caixaTexto.obterConteudo());
  console.log("Caixa<Ponto>:", caixaPonto.obterConteudo());
  console.log("Caixa<Animal>:", caixaAnimal.obterConteudo());

  const numeros = [10, 20, 30];
  const nomes = ["Ana", "Bruno"];
  const vazio: number[] = [];

  console.log("primeiroElemento(numeros):", primeiroElemento(numeros));
  console.log("primeiroElemento(nomes):", primeiroElemento(nomes));
  console.log("primeiroElemento(vazio):", primeiroElemento(vazio));
}

main();
