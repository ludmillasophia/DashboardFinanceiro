# Controle Financeiro

Aplicação web para acompanhar receitas, gastos, metas financeiras e movimentações por mês e ano. O projeto foi criado com HTML, CSS e JavaScript puro, com foco em uma interface moderna, responsiva e fácil de usar.

## Funcionalidades

- Cadastro de entradas e saídas financeiras
- Organização de gastos por categoria
- Gráfico de distribuição dos gastos
- Cadastro e acompanhamento de metas financeiras
- Filtro por mês e ano
- Alternância entre tema claro e escuro
- Opção de idioma em português e inglês
- Dados salvos no navegador com `localStorage`
- Layout responsivo para desktop e celular

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js para servidor local simples

## Como Rodar

Clone o repositório:

```bash
git clone https://github.com/ludmillasophia/DashboardFinanceiro.git
```

Entre na pasta do projeto:

```bash
cd DashboardFinanceiro
```

Inicie o servidor local:

```bash
node server.js
```

Abra no navegador:

```text
http://localhost:4321
```

## Estrutura

```text
DashboardFinanceiro/
├── index.html
├── styles.css
├── script.js
├── server.js
└── README.md
```

## Observação

Os dados cadastrados ficam salvos apenas no navegador da pessoa que está usando a aplicação. Se limpar os dados do navegador ou clicar em zerar, as informações serão removidas.
