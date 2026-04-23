# Aula 2 — Exemplo 2 (avançado): interfaces, generics e `Result`

Extensão do exemplo 1 com tópicos que aparecem muito em código TypeScript “de mercado”:

- **Tipo genérico `Result<T, E>`** para operações que podem falhar sem exceções.
- **Restrição `T extends Identificavel`** no repositório em memória.
- **Interseção de interfaces** (`Repository` = leitura + escrita) e **segregação**: o serviço de consulta depende só de `RepositoryLeitura<Investimento>`.
- **Função genérica** `projetarRetornoTotal<T extends Investimento>` e **`mapResult`** para transformar valores dentro de um `Result`.

## Estrutura

| Caminho | Papel |
|---------|--------|
| `src/core/result.ts` | `Result<T,E>`, `ok`, `err`, `emptyOk`, `mapResult` |
| `src/domain/identificavel.interface.ts` | Contrato `id` (base para constraint) |
| `src/domain/investimento.interface.ts` | `extends Identificavel` |
| `src/domain/acao.ts` / `fundo-imobiliario.ts` | Implementações com `id` |
| `src/repository/repository-leitura.interface.ts` | Apenas leitura |
| `src/repository/repository-escrita.interface.ts` | Apenas escrita (`T extends Identificavel`) |
| `src/repository/repository.interface.ts` | `Repository<T>` como interseção |
| `src/repository/memory.repository.ts` | `Map` por id, erros como `Result` |
| `src/service/investimento-cadastro.service.ts` | Depende de `Repository<Investimento>` |
| `src/service/portfolio-consulta.service.ts` | Depende só de `RepositoryLeitura<Investimento>` |
| `src/comum/projetar-retorno.ts` | Generic com `T extends Investimento` |
| `src/app.ts` | Cenário com sucesso, id duplicado e id inexistente |

## Como rodar

```bash
cd aula2/exemplo2
npm install
npm run start
```

## Comparar com o exemplo 1

| | Exemplo 1 | Exemplo 2 |
|---|-----------|-----------|
| Erros | Implícitos | `Result` tipado |
| Repositório | Lista simples | `Map` + id único |
| Dependência do serviço de leitura | Mesmo repositório completo | Só interface de leitura |

## Próximo passo natural

Substituir composição manual no `app.ts` por **container IoC / DI** (próxima aula).
