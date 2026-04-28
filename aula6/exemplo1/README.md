# Aula 6 — Exemplo 1: Arquitetura em Cebola (Onion Architecture)

## Apresentação

Nesta aula prática, será demonstrada a modelagem e implementação de um sistema utilizando a **Arquitetura em Cebola (Onion Architecture)** no ecossistema **TypeScript** com **Node.js**, com foco na construção de aplicações desacopladas, testáveis e alinhadas com práticas modernas de arquitetura de software.

A atividade consiste na **evolução** da aplicação desenvolvida nas aulas anteriores, **reorganizando** sua estrutura em camadas bem definidas, onde o **domínio** da aplicação é posicionado no **centro** e permanece **independente** de qualquer tecnologia externa. O objetivo é mostrar, de forma prática, como estruturar um sistema que possa evoluir com segurança, permitindo a **substituição de componentes** sem impacto na lógica de negócio.

Durante a demonstração, serão apresentados os principais elementos da Arquitetura em Cebola:

| Camada | Papel |
|--------|--------|
| **Domínio (core)** | Entidades, regras de negócio e contratos fundamentais. Não depende de frameworks, banco de dados ou bibliotecas externas. Exemplo: `Investimento`, regras de cálculo, interface de repositório no núcleo. |
| **Aplicação (use cases)** | Orquestra os fluxos utilizando o domínio. Casos de uso: adicionar investimento, calcular retorno total. Depende apenas do domínio e de abstrações (interfaces). |
| **Infraestrutura** | Detalhes externos: persistência em memória, futuramente banco ou APIs. Exemplo: `RepositorioMemoria`, `RepositorioVazio`. |
| **Interface (entrada)** | Ponto de entrada (aqui, CLI em `presentation/app.ts`). Recebe a execução e delega à camada de aplicação. |

Será enfatizado que as **dependências sempre apontam para o centro** (domínio), respeitando a **inversão de dependência**: a lógica de negócio não é impactada por mudanças externas, como troca de banco de dados ou framework.

Ao longo da prática, integram-se conceitos das aulas anteriores:

- **Interfaces e generics** para contratos (`Investimento`, `RepositorioDeInvestimentos`).
- **Injeção de dependência** na composição (`composition/composicao.ts`).
- **Princípios SOLID** na organização e extensibilidade.
- **Arquitetura Hexagonal** como base conceitual complementar (portas no domínio, adaptadores na infraestrutura).

Ao final da atividade, o aluno será capaz de estruturar aplicações em TypeScript seguindo a Arquitetura em Cebola, compreendendo como separar corretamente **domínio**, **aplicação** e **infraestrutura**, e como construir sistemas preparados para evolução contínua, testes automatizados e integração com diferentes tecnologias.

## Documentação visual

Fluxogramas da **arquitetura em cebola**, **fluxo de execução** do CLI e **diagramas de sequência** dos casos de uso estão em **[`docs/fluxograma-e-sequencia.md`](docs/fluxograma-e-sequencia.md)** (Mermaid).

## Estrutura de pastas (visão em cebola)

```
src/
  domain/                           # centro: entidades + contratos
  application/                      # casos de uso
  infrastructure/persistencia/      # implementações externas
  composition/                      # composição (DI manual)
  presentation/                     # entrada (CLI)
```

Dependências: **presentation** e **infrastructure** referenciam **application** e **domain**; **application** referencia apenas **domain**; **domain** não referencia camadas externas.

## Como rodar

```bash
cd aula6/exemplo1
npm install
npm run start
```

## Pré-requisitos

Node.js 20+, npm 10+.
