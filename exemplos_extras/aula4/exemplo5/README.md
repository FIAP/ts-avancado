# Exemplo 5 — violação do LSP (Substituição de Liskov)

Hierarquia com `ContaBancariaBase` que exige `debitar` para qualquer conta. `ContaSalarioSemSaqueDireto` estende a base, mas **sempre falha** em `debitar`, quebrando quem trata tudo como `ContaBancariaBase` (por exemplo `ProcessadorSaqueGenerico`).

## Diagramas de sequência

Fluxos de `tentarSaque` e `ProcessadorSaqueGenerico` estão em **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

Execute com `npm install` e `npm start`.
