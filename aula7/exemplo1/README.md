# Aula 7 — Exemplo 1: Arquitetura Limpa (Clean Architecture)

## Apresentação

Nesta aula prática, será demonstrada a implementação de um sistema utilizando os princípios da **Arquitetura Limpa (Clean Architecture)** no ecossistema **TypeScript** com **Node.js**, com foco na construção de aplicações robustas, desacopladas, testáveis e preparadas para evolução contínua.

Partindo dos conceitos trabalhados nas aulas anteriores — como POO, interfaces, generics, Inversão de Controle, Injeção de Dependência, SOLID, Arquitetura Hexagonal e Arquitetura em Cebola — a proposta desta aula é **consolidar** esses conhecimentos em uma estrutura arquitetural mais completa, inspirada no modelo apresentado por **Robert C. Martin (Uncle Bob)**.

A atividade consiste na construção e organização de uma aplicação em **camadas**, respeitando o princípio central da Arquitetura Limpa: as **regras de negócio** devem permanecer **independentes** de frameworks, banco de dados, interfaces e detalhes externos. O núcleo do sistema contém o conhecimento do **domínio** e dos **casos de uso**, sem depender diretamente de implementações concretas.

Durante a demonstração, serão apresentados os principais elementos da Arquitetura Limpa no contexto TypeScript:

| Elemento | Papel neste exemplo |
|----------|----------------------|
| **Entities (entidades)** | Conceitos centrais do domínio: `Investimento`, `Carteira`, `Acao`, `FundoImobiliario` e regras de cálculo. |
| **Use cases** | Orquestração: adicionar investimento, listar investimentos, calcular retorno total (coordenam entidades e portas). |
| **Interface adapters** | Conversão e integração: adaptadores de persistência (`RepositorioMemoriaAdapter`, `RepositorioVazioAdapter`) e presenter (`formatarResumoParaExibicao`). |
| **Frameworks e drivers** | Camada mais externa: **CLI** em `frameworks/cli` e detalhes de execução. |

Ao longo da prática, enfatiza-se que as **dependências apontam para dentro** (das camadas externas para as internas), tornando detalhes tecnológicos **substituíveis** e mantendo o núcleo **estável**.

A demonstração destaca ainda:

- **Interfaces** para contratos entre camadas (porta `RepositorioDeInvestimentos`).
- **Injeção de dependência** na composição (`composition/composicao.ts`).
- **Princípios SOLID** para organização, extensibilidade e testabilidade.
- **Separação de responsabilidades** entre domínio, aplicação, adaptadores e infraestrutura de entrega.

Ao final da atividade, o aluno será capaz de estruturar um sistema em TypeScript utilizando os princípios da Arquitetura Limpa, compreendendo como organizar **entidades**, **casos de uso**, **adaptadores** e **infraestrutura**, e como essa abordagem contribui para software de alta qualidade, manutenção facilitada e baixa dependência tecnológica.

## Documentação visual (diagramas)

Fluxogramas das **camadas**, **execução do CLI** e **diagramas de sequência** dos casos de uso estão em **[`../docs/fluxograma-e-sequencia.md`](../docs/fluxograma-e-sequencia.md)** (na pasta `aula7/docs`).

## Estrutura de pastas

```
src/
  domain/entities/           # entidades e regras centrais
  application/
    ports/                   # contratos de saída (gateways)
    use-cases/               # casos de uso
  adapters/
    persistence/             # implementações da porta de repositório
    presenters/              # formatação para a interface de saída (CLI)
  composition/               # composição (DI manual)
  frameworks/cli/            # ponto de entrada (driver)
```

## Como rodar

```bash
cd aula7/exemplo1
npm install
npm run start
```

## Pré-requisitos

Node.js 20+, npm 10+.
