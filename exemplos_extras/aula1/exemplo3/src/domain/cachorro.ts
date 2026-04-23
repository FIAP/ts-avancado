import { Animal } from "#app/domain/animal.js";

// Herança: Cachorro herda propriedades e métodos de Animal e adiciona os seus.
export class Cachorro extends Animal {
  constructor(nome: string, public cor: string) {
    super(nome);
  }

  latir(): void {
    console.log(`${this.nome} está latindo.`);
  }
}
