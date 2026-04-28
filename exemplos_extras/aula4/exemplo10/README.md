# Exemplo 10 — DIP (Dependency Inversion)

**`ServicoSaque`** depende apenas de **`PoliticaEncargoSaque`** e **`PortaAuditoriaSaque`**. Classes em **`infra/`** implementam essas portas e são **compostas** em `app.ts` (ou num container). Trocar tarifa (1% vs isento) ou o destino da auditoria **não** exige editar o serviço.

## Diagramas de sequência

Ver **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo10
npm install
npm start
```
