// Classe base: define atributos e comportamentos comuns a todos os animais.
export class Animal {
  constructor(public nome: string) {}

  dormir(): void {
    console.log(`${this.nome} está dormindo.`);
  }
}
