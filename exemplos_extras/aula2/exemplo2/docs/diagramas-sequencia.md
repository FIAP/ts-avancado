# Diagramas de sequência — exemplo2 (OOP + interface `RepositorioLivro`)

Fluxos derivados de `src/app.ts`, `CatalogoBiblioteca`, `BibliotecaEmMemoria` e `Livro`. Visualização: [Mermaid](https://mermaid.js.org/) (GitHub, extensões de Markdown no editor).

---

## 1. Inicialização

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Repo as BibliotecaEmMemoria
    participant Cat as CatalogoBiblioteca

    Main->>Repo: new BibliotecaEmMemoria()
    Repo-->>Main: repositorio

    Main->>Cat: new CatalogoBiblioteca(repositorio)
    Note right of Cat: Dependência declarada como RepositorioLivro (interface).
    Cat-->>Main: catalogo
```

---

## 2. Cadastro de um livro (`cadastrar` → `salvar`)

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Livro
    participant Cat as CatalogoBiblioteca
    participant Repo as BibliotecaEmMemoria

    Main->>Livro: new Livro(isbn, título, autor)
    activate Livro
    Livro->>Livro: normalizarIsbn / validar título e autor
    Livro-->>Main: instância
    deactivate Livro

    Main->>Cat: cadastrar(livro)
    Cat->>Repo: salvar(livro)
    Repo->>Repo: porIsbn.set(isbn, livro)
    Repo-->>Cat: void
    Cat-->>Main: void
```

O fluxo repete para cada `catalogo.cadastrar(...)` no `app.ts`.

---

## 3. Consulta por ISBN (`obterResumoPorIsbn` → `buscarPorIsbn` → `resumo`)

Caminho em que o livro é encontrado (`encontrado` não é `undefined`):

```mermaid
sequenceDiagram
    autonumber
    participant Main as main()
    participant Cat as CatalogoBiblioteca
    participant Repo as BibliotecaEmMemoria
    participant Livro as Livro (instância)
    participant Out as console

    Main->>Cat: obterResumoPorIsbn(isbn)
    Cat->>Repo: buscarPorIsbn(isbn)
    Repo->>Repo: normalizar chave / Map.get
    Repo-->>Cat: livro | undefined

    alt livro encontrado
        Cat->>Livro: resumo()
        Livro-->>Cat: texto
        Cat-->>Main: string
    else não encontrado
        Cat-->>Main: undefined
    end

    Main->>Out: log(resultado)
```

---

## Leitura rápida

- **Interface** `RepositorioLivro`: `CatalogoBiblioteca` só conversa com esse contrato; não referencia `BibliotecaEmMemoria` por tipo.
- **OOP**: `Livro` encapsula regras de criação; `BibliotecaEmMemoria` encapsula o `Map` e a forma de indexar por ISBN.
