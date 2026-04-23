import { Animal } from "#app/domain/animal.js";

export class Vaca extends Animal {
  override emitirSom(): void {
    console.log(`${this.nome} mia: Muuu!`);
  }
}
