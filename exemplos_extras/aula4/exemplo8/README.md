# Exemplo 8 — ISP (interfaces segregadas)

Capacidades separadas: **`ContaConsultavel`**, **`ContaCredito`**, **`ContaDebitavel`**, **`ContaEmprestimoPreAprovado`**, **`ContaBloqueioJudicial`**. **`ServicoLinhaExtrato`** depende só de consulta; **`ServicoSaque`** só de **`ContaDebitavel`**. **`ContaSalarioCreditoFolha`** implementa apenas o que o produto tem (consulta + crédito).

## Diagramas de sequência

Ver **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo8
npm install
npm start
```
