// OOP: entidade com estado controlado (validação no construtor, ISBN normalizado).
export class Livro {
  private static readonly COMPRIMENTO_MINIMO_ISBN = 10;
  private static readonly COMPRIMENTO_MINIMO_CAMPO_OBRIGATORIO = 1;

  readonly isbn: string;
  readonly titulo: string;
  readonly autor: string;

  constructor(isbn: string, titulo: string, autor: string) {
    this.isbn = Livro.normalizarIsbn(isbn);
    const tituloNormalizado = titulo.trim();
    const autorNormalizado = autor.trim();
    if (
      tituloNormalizado.length < Livro.COMPRIMENTO_MINIMO_CAMPO_OBRIGATORIO ||
      autorNormalizado.length < Livro.COMPRIMENTO_MINIMO_CAMPO_OBRIGATORIO
    ) {
      throw new Error("Título e autor são obrigatórios.");
    }
    this.titulo = tituloNormalizado;
    this.autor = autorNormalizado;
  }

  resumo(): string {
    return `${this.titulo} — ${this.autor} [${this.isbn}]`;
  }

  private static normalizarIsbn(isbn: string): string {
    const limpo = isbn.trim().replaceAll(/\s+/g, "");
    if (limpo.length < Livro.COMPRIMENTO_MINIMO_ISBN) {
      throw new Error("ISBN inválido (muito curto).");
    }
    return limpo;
  }
}
