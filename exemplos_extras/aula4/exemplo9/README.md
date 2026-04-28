# Exemplo 9 — violação do DIP (Dependency Inversion)

**`ServicoSaqueAcoplado`** orquestra o caso de uso, mas **instancia** diretamente **`AuditoriaSaqueConsole`** e **`CalculadoraTarifaSaqueUmPorCento`**. O módulo de alto nível depende de detalhes de baixo nível; trocar auditoria ou política exige **alterar** o serviço.

## Diagramas de sequência

Ver **[`docs/diagramas-sequencia.md`](docs/diagramas-sequencia.md)** (Mermaid).

## Como rodar

```bash
cd exemplos_extras/aula4/exemplo9
npm install
npm start
```

Compare com o **exemplo10**, onde abstrações são injetadas na composição (borda da aplicação).
