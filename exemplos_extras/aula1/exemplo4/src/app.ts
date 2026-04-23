import type { Animal } from "#app/domain/animal.js";
import { Cachorro } from "#app/domain/cachorro.js";
import { Gato } from "#app/domain/gato.js";
import { Vaca } from "#app/domain/vaca.js";

// Mesma assinatura para qualquer Animal: em tempo de execução o método certo é escolhido.
function fazerEmitirSom(animal: Animal): void {
  animal.emitirSom();
}

function main(): void {
  const animais: Animal[] = [new Cachorro("Thor"), new Gato("Mingau"), new Vaca("Bella")];

  console.log("Polimorfismo: uma lista de Animal, comportamentos diferentes ao chamar emitirSom():");
  for (const animal of animais) {
    fazerEmitirSom(animal);
  }

  console.log("Comportamento comum herdado:");
  animais[0]?.dormir();
}

main();
