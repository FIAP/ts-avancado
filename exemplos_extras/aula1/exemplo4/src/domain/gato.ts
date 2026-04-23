import { Animal } from "#app/domain/animal.js";

export class Gato extends Animal {
  override emitirSom(): void {
    console.log(`${this.nome} mia: Miau!`);
  }
}
