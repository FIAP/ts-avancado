// Referência do tipo Animal: trata todas as subclasses de forma uniforme (polimorfismo).
export abstract class Animal {
  constructor(public nome: string) {}

  abstract emitirSom(): void;

  dormir(): void {
    console.log(`${this.nome} está dormindo.`);
  }
}
