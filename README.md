# Delivery System

Sistema de delivery desenvolvido em Node.js com TypeScript que permite gerenciar restaurantes, categorias de produtos, produtos e pedidos. A API segue a especificação OpenAPI 3.0.2 e utiliza validação automática de requisições e respostas.

## 📋 Descrição

O Delivery System é uma API RESTful que oferece funcionalidades completas para gerenciamento de um sistema de delivery, incluindo:

- **Restaurantes**: Criação e listagem de restaurantes
- **Categorias**: Gerenciamento de categorias de produtos por restaurante, ordenadas por índice
- **Produtos**: Cadastro e listagem de produtos por categoria, com controle de disponibilidade
- **Pedidos**: Criação de pedidos, listagem por restaurante e atualização de status

A API utiliza validação automática baseada na especificação OpenAPI, garantindo que todas as requisições e respostas estejam em conformidade com o contrato definido.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **MongoDB** com **Mongoose** - Banco de dados
- **OpenAPI Validator** - Validação de requisições/respostas
- **Swagger UI** - Documentação interativa da API
- **Jest** - Framework de testes
- **MongoDB Memory Server** - Banco de dados em memória para testes

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **Yarn** (gerenciador de pacotes)
- **MongoDB** (instância local ou remota)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd delivery-system
```

2. Instale as dependências:
```bash
yarn install
```

## ⚙️ Configuração

1. Crie o diretório `environments` na raiz do projeto (se não existir):
```bash
mkdir -p environments
```

2. Crie um arquivo `.env` dentro do diretório `environments` com as seguintes variáveis:

```env
PORT=
DATABASE_URI=
DATABASE_NAME=
```

**Exemplo para MongoDB local:**
```env
PORT=3000
DATABASE_URI=mongodb://localhost:27017
DATABASE_NAME=delivery-system
```

**Exemplo para MongoDB Atlas (cloud):**
```env
PORT=3000
DATABASE_URI=mongodb+srv://usuario:senha@cluster.mongodb.net
DATABASE_NAME=delivery-system
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

Execute o projeto em modo de desenvolvimento com hot-reload:

```bash
yarn dev
```

O servidor estará disponível em `http://localhost:3000` (ou na porta configurada no `.env`).

### Build para Produção

1. Compile o TypeScript:
```bash
yarn build
```

2. Execute o projeto compilado:
```bash
yarn start
```

## 📚 Documentação da API

Após iniciar o servidor, a documentação interativa da API (Swagger UI) estará disponível em:

```
http://localhost:3000/api-docs
```

## 🐳 Rodando com Docker

Existem duas formas comuns de executar esta aplicação com Docker — escolha uma opção abaixo conforme sua necessidade:

- **Opção A — Build + Run (imagem única)**: gera uma imagem contendo todas as dependências (dev e prod) e executa o container manualmente. Útil para situações simples ou testes rápidos.

	Requisitos de ambiente (variáveis obrigatórias):
	- `PORT` — porta em que a aplicação vai escutar (ex.: `3000`)
	- `DATABASE_URI` — URI do MongoDB (ex.: `mongodb://host:27017`)
	- `DATABASE_NAME` — nome do banco de dados a ser usado

	Observação: não inclua segredos diretamente no repositório. Use um arquivo local `environments/.env` (adicionado ao `.gitignore`) ou um gerenciador de segredos na infraestrutura.

	Build da imagem Docker:

	```bash
	docker build -t delivery-system:latest .
	```

	Rodar o container com `--env-file`:

	```bash
	docker run --env-file environments/.env -p 3000:3000 delivery-system:latest
	```

- **Opção B — Docker Compose (recomendado para desenvolvimento/local)**: o `docker compose` facilita subir serviços dependentes, compartilhar um `env_file` e orquestrar múltiplos containers. É uma alternativa ao `docker run` e normalmente é a escolha mais prática para desenvolvimento local.

	Para subir com o Compose (o repositório já inclui `compose.yaml`):

	```bash
	docker compose up --build
	```

## 🧪 Testes

O projeto possui testes unitários e de integração:

### Executar todos os testes
```bash
yarn test
```

### Executar apenas testes unitários
```bash
yarn test:unit
```

### Executar apenas testes de integração
```bash
yarn test:int
```

Os testes de integração utilizam MongoDB Memory Server, não sendo necessário ter uma instância do MongoDB rodando para executá-los.

## 📁 Estrutura do Projeto

```
delivery-system/
├── src/
│   ├── application/          # Camada de aplicação (controllers, exceptions)
│   ├── configurations/       # Configurações e factories
│   ├── contracts/            # Especificação OpenAPI (contract.yaml)
│   ├── domain/               # Camada de domínio (entities, services, repositories)
│   ├── infrastructure/       # Camada de infraestrutura (database, adapters)
│   ├── __tests__/            # Testes unitários e de integração
│   ├── app.ts                # Configuração da aplicação Express
│   └── server.ts             # Ponto de entrada do servidor
├── environments/             # Arquivos de configuração (.env)
├── jest/                     # Configurações do Jest
└── dist/                     # Código compilado (gerado após build)
```

## 🔌 Principais Endpoints

### Restaurantes
- `GET /restaurants` - Lista todos os restaurantes
- `POST /restaurants` - Cria um novo restaurante

### Categorias
- `GET /restaurants/{restaurantId}/categories` - Lista categorias de um restaurante (ordenadas por índice)
- `POST /restaurants/{restaurantId}/categories` - Cria uma categoria para um restaurante

### Produtos
- `GET /categories/{categoryId}/products` - Lista produtos de uma categoria
- `POST /categories/{categoryId}/products` - Cria um produto em uma categoria

### Pedidos
- `POST /orders` - Cria um novo pedido
- `GET /restaurants/{restaurantId}/orders` - Lista pedidos de um restaurante
- `PATCH /orders/{orderId}/status` - Atualiza o status de um pedido

**Status de Pedidos disponíveis:**
- `PENDING` - Pendente
- `PREPARING` - Em preparação
- `OUT_FOR_DELIVERY` - Saiu para entrega
- `COMPLETED` - Concluído
- `CANCELED` - Cancelado

## 🛠️ Scripts Disponíveis

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o TypeScript para JavaScript
- `yarn start` - Inicia o servidor com o código compilado
- `yarn test` - Executa todos os testes (unitários + integração)
- `yarn test:unit` - Executa apenas testes unitários
- `yarn test:int` - Executa apenas testes de integração
- `yarn prettier` - Formata o código usando Prettier

