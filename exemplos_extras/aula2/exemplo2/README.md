# Exemplo2 — OOP + interface (`RepositorioLivro`)

Demonstração em TypeScript: **classes** (`Livro`, `BibliotecaEmMemoria`, `CatalogoBiblioteca`) com encapsulamento e uma **interface** (`RepositorioLivro`) que define o contrato de persistência. O catálogo depende só da interface, não da implementação em memória.

## O que este exemplo mostra

| Arquivo | Papel |
|--------|--------|
| `src/domain/livro.ts` | Entidade: validação/normalização de ISBN, `resumo()`. |
| `src/domain/repositorio-livro.ts` | Interface `RepositorioLivro` (`salvar`, `buscarPorIsbn`). |
| `src/domain/biblioteca-memoria.ts` | `BibliotecaEmMemoria implements RepositorioLivro` (Map privado). |
| `src/domain/catalogo-biblioteca.ts` | Serviço que recebe `RepositorioLivro` no construtor. |
| `src/app.ts` | Cenário: cadastrar dois livros e exibir resumos por ISBN. |

## Diagramas de sequência

Fluxos de inicialização, cadastro e consulta estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada).

## Passo a passo

1. **Abra o terminal** e vá até a pasta deste exemplo:

   ```bash
   cd exemplos_extras/aula2/exemplo2
   ```

2. **Instale as dependências** (na primeira vez ou após mudanças no `package.json`):

   ```bash
   npm install
   ```

3. **Execute o projeto** com `tsx`:

   ```bash
   npm start
   ```

   No console devem aparecer o cabeçalho e duas linhas com o resumo de cada livro (Clean Code e Domain-Driven Design).

## Execução alternativa (build + Node)

1. Compile o TypeScript:

   ```bash
   npm run build
   ```

2. Execute o JavaScript gerado em `dist/`:

   ```bash
   npm run start:built
   ```

## Scripts disponíveis

| Comando               | O que faz                          |
| --------------------- | ---------------------------------- |
| `npm install`         | Instala dependências               |
| `npm start`           | Executa `src/app.ts` com `tsx`     |
| `npm run build`       | Compila para a pasta `dist/`       |
| `npm run start:built` | Executa `dist/app.js` após o build |
