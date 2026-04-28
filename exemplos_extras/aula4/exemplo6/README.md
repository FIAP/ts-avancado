# Exemplo 6 — LSP (refatoração)

Separação de contratos: `ContaDebitavel` só onde o produto permite saque por débito. `ContaSalarioApenasCredito` estende `ContaComSaldo` sem prometer `debitar`, então `ServicoSaque` não aceita esse tipo — o chamador não depende de exceções em tempo de execução para descobrir o produto errado.

## Diagramas de sequência

Fluxos de `main` e `ServicoSaque` com **`ContaDebitavel`** estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

Execute com `npm install` e `npm start`.
