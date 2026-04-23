import { BibliotecaEmMemoria } from "#app/domain/biblioteca-memoria.js";
import { CatalogoBiblioteca } from "#app/domain/catalogo-biblioteca.js";
import { Livro } from "#app/domain/livro.js";

function main(): void {
  const repositorio = new BibliotecaEmMemoria();
  const catalogo = new CatalogoBiblioteca(repositorio);

  catalogo.cadastrar(
    new Livro("978-0132350884", "Clean Code", "Robert C. Martin"),
  );
  catalogo.cadastrar(
    new Livro("978-8550800653", "Domain-Driven Design", "Eric Evans"),
  );

  console.log(
    "Busca via serviço que só conhece a interface RepositorioLivro:",
  );
  console.log(catalogo.obterResumoPorIsbn("978-0132350884"));
  console.log(catalogo.obterResumoPorIsbn("978-8550800653"));
}

main();
