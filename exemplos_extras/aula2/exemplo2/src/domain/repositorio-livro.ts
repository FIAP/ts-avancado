import type { Livro } from "#app/domain/livro.js";

// Interface: contrato de persistência; o domínio depende disso, não da implementação.
export interface RepositorioLivro {
  salvar(livro: Livro): void;
  buscarPorIsbn(isbn: string): Livro | undefined;
}
