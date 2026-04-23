import { Animal } from "#app/domain/animal.js";

export class Cachorro extends Animal {
  override emitirSom(): void {
    console.log(`${this.nome} late: Au au!`);
  }
}
