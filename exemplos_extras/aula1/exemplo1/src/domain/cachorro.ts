// Classe = molde (atributos + métodos); objeto = instância concreta desse molde.
export class Cachorro {
  constructor(
    public nome: string,
    public cor: string,
    public idade: number,
  ) {}

  latir(): void {
    console.log(`${this.nome} está latindo.`);
  }

  correr(): void {
    console.log(`${this.nome} está correndo.`);
  }

  dormir(): void {
    console.log(`${this.nome} está dormindo.`);
  }
}
