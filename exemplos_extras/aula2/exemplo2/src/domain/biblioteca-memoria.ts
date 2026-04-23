import type { Livro } from "#app/domain/livro.js";
import type { RepositorioLivro } from "#app/domain/repositorio-livro.js";

// OOP + implements: uma implementação concreta do contrato (detalhe encapsulado no Map).
export class BibliotecaEmMemoria implements RepositorioLivro {
  private readonly porIsbn = new Map<string, Livro>();

  salvar(livro: Livro): void {
    this.porIsbn.set(livro.isbn, livro);
  }

  buscarPorIsbn(isbn: string): Livro | undefined {
    const chave = isbn.trim().replaceAll(/\s+/g, "");
    return this.porIsbn.get(chave);
  }
}
