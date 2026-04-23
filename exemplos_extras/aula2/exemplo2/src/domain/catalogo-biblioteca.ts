import type { Livro } from "#app/domain/livro.js";
import type { RepositorioLivro } from "#app/domain/repositorio-livro.js";

// Serviço de aplicação: recebe apenas RepositorioLivro (interface), não BibliotecaEmMemoria.
export class CatalogoBiblioteca {
  constructor(private readonly livros: RepositorioLivro) {}

  cadastrar(livro: Livro): void {
    this.livros.salvar(livro);
  }

  obterResumoPorIsbn(isbn: string): string | undefined {
    const encontrado = this.livros.buscarPorIsbn(isbn);
    return encontrado?.resumo();
  }
}
