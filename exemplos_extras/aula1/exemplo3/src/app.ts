import { Cachorro } from "#app/domain/cachorro.js";

function main(): void {
  const thor = new Cachorro("Thor", "marrom");

  // Método herdado de Animal:
  thor.dormir();

  // Método específico de Cachorro:
  thor.latir();

  // Propriedade herdada (nome) e a da subclasse (cor):
  console.log(`${thor.nome} é ${thor.cor}.`);
}

main();
