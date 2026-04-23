import { Cachorro } from "#app/domain/cachorro.js";

function main(): void {
  // Classe: Cachorro. Objeto: Thor — marrom, 3 anos.
  const thor = new Cachorro("Thor", "marrom", 3);

  console.log("Objeto instanciado:", {
    nome: thor.nome,
    cor: thor.cor,
    idade: thor.idade,
  });

  thor.latir();
  thor.correr();
  thor.dormir();
}

main();
