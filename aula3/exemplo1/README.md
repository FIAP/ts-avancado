# Aula 3 — Exemplo 1: IoC, Injeção de Dependência e container

## 4. Procedimentos

### 4.1 Identificando o problema (sem DI)

**Objetivo:** perceber o acoplamento quando a dependência é criada **dentro** da classe.

**Exemplo errado (não use no código de produção):**

```typescript
class InvestimentoService {
  private repo = new MemoryRepository<Investimento>();

  calcularTotal() {
    return this.repo.obterTodos();
  }
}
```

**Problemas:** dependência de implementação concreta; difícil testar; difícil trocar persistência; alto acoplamento. **Não há Inversão de Controle (IoC)** aqui: a classe controla a criação do repositório.

### 4.2 Aplicando Inversão de Controle (IoC)

**Objetivo:** a classe **não** cria mais o repositório; só **recebe** via construtor.

Implementação real em `src/service/investimento.service.ts`: o serviço depende de `Repository<Investimento>` (contrato), não de `MemoryRepository`.

### 4.3 Aplicando Injeção de Dependência (DI)

**Objetivo:** a dependência é criada **fora** e **injetada** (construtor).

No `Container` ou no `app.ts`, instancia-se `MemoryRepository` e passa-se para `new InvestimentoService(repo)`.

### 4.4 Container simples de DI

**Objetivo:** centralizar a composição (similar à ideia de módulos no NestJS/Spring).

Arquivo: `src/container/container.ts` — método estático `getInvestimentoService()` monta `MemoryRepository` + `InvestimentoService`.

### 4.5 Aplicação usando o container

`src/app.ts` obtém o serviço com `Container.getInvestimentoService()` e não referencia `MemoryRepository` diretamente.

### 4.6 Substituição de implementação

**Objetivo:** trocar infraestrutura sem alterar `InvestimentoService`.

`FakeRepository<T>` implementa o mesmo `Repository<T>`, mas não persiste (útil para demonstrar total `0` após `adicionar`). O `Container.getInvestimentoServiceComRepositorioFake()` mostra a troca **só na composição**.

## Como rodar

```bash
cd aula3/exemplo1
npm install
npm run start
```

Saída esperada: total **1300** com memória e **0** com fake.

## Estrutura

```
src/
  app.ts
  container/container.ts
  domain/
  repository/   (interface, memory, fake)
  service/
```
