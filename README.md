# Marketplace API

<div align="center">
  </br>
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="Docker" src="https://img.shields.io/badge/Docker-3880FF?style=for-the-badge&logo=docker&logoColor=white">
    <img alt="NestJS" src="https://img.shields.io/badge/Nest.JS-EA284C?style=for-the-badge&logo=nestjs&logoColor=white">
    <img alt="Postgresql" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
    <img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white">
  </br>
</div></br>

API para marketplace criada para aprimorar minhas habilidades com NestJS e TypeORM.

O que essa api pode fazer:

- Criar lojas, atualizar dados da loja.
- Criar produtos e categorias para produtos
- Listar produtos
- Atualizar dados dos produtos
- Criação de Cupons

### Instruções para Execução

- [Docker](#docker)
- [Instalação de dependências](#instalação-de-dependencias)
- [Configuração das váriaveis de ambiente](#configuração-das-variáveis-de-ambiente)
- [Execução da aplicação](#execução-da-aplicação)
- [Endpoints]()

### Docker

Para executar o banco de dados utilize o comando:

```bash
docker-compose up -d --build
```

### Instalação de dependencias

Para instalar as dependências do projeto basta utilizar o comando:

```bash
  yarn install
  ## ou
  npm install
```

### Configuração das variáveis de ambiente

Para executar a aplicação é necessário realizar a configuração das váriaveis de ambiente

Você pode fazer isso entrando no [arquivo](./example.env) e criando um novo arquivo .env com a mesma estrutura do exemplo.

### Execução da aplicação

Após toda configuração das váriaveis de ambiente e a instalação das dependências utilize o comando para executar a aplicação.

```bash
  yarn start:dev
  ## ou
  npm run start:dev
```

### Endpoints

#### Criação de usuários

<details>
  <summary><code>POST</code> <code><b></b></code> <code>(Cria o usuário)</code></summary>

#### Estrutura da requisição

| Campo          | Tipo         | Descrição           |
| -------------- | ------------ | ------------------- |
| **`name`**     | **`String`** | Nome do usuário     |
| **`email`**    | **`String`** | Email do usuário    |
| **`password`** | **`String`** | Password do usuário |

#### Response

```json
{
  "user": {
    "name": "john doe",
    "email": "johndoe@teste.com",
    "id": "6671f327-bbad-4b31-bcc7-d570a354a6fd"
  }
}
```

</details>

#### Login

<details>
  <summary><code>POST</code> <code><b></b></code> <code>(Login)</code></summary>

#### Estrutura da requisição

| Campo          | Tipo         | Descrição           |
| -------------- | ------------ | ------------------- |
| **`email`**    | **`String`** | Email do usuário    |
| **`password`** | **`String`** | Password do usuário |

#### Response

```json
{
  "token": "TOKEN JWT"
}
```

</details>

#### Criação de Lojas

<details>
  <summary><code>POST</code> <code><b></b></code> <code>(Create Store)</code></summary>

#### Estrutura da requisição

| Campo             | Tipo         | Descrição                  |
| ----------------- | ------------ | -------------------------- |
| **`store_name`**  | **`String`** | Nome da loja               |
| **`description`** | **`String`** | Descrição da loja          |
| **`address`**     | **`String`** | Endereço da loja           |
| **`phone`**       | **`String`** | Numero de telefone da loja |

#### Response

```json
{
  {
	"id": "d3ab4e5b-1295-429e-a0d7-8befbab8447e",
	"store_name": "Nome da loja",
	"description": "Descrição da loja",
	"address": "Endereço da loja",
	"phone": "Numero de telefone da loja",
	"ownerId": "f2e0b0ce-2008-4134-8801-d4889f4cf6a8",
	"users": [
		{
			"id": "f2e0b0ce-2008-4134-8801-d4889f4cf6a8",
			"name": "johndoe",
			"email": "johndoe@teste.com"
		}
	]
}
}
```

</details>

#### Lojas do usuário

<details>
  <summary><code>GET</code> <code><b></b></code> <code>(Loja do usuário)</code></summary>

#### Estrutura da requisição

| Campo         | Tipo         | Descrição  |
| ------------- | ------------ | ---------- |
| **`storeId`** | **`String`** | Id da loja |

#### Response

```json
[
  {
    "id": "c7dabf73-72c0-468e-a728-3473ca8704a0",
    "ownerId": "f2e0b0ce-2008-4134-8801-d4889f4cf6a8",
    "users": [
      {
        "id": "f2e0b0ce-2008-4134-8801-d4889f4cf6a8",
        "name": "johndoe",
        "email": "johndoe@teste.com"
      }
    ]
  }
]
```

</details>

#### Pegar usuários da loja

<details>
  <summary><code>GET</code> <code><b></b></code> <code>(Usuários da loja)</code></summary>

#### Response

```json
[
  {
    "id": "d3ab4e5b-1295-429e-a0d7-8befbab8447e",
    "store_name": "Nome da loja",
    "description": "Descrição da loja",
    "address": "Endereço da loja",
    "phone": "Numero de telefone da loja",
    "ownerId": "f2e0b0ce-2008-4134-8801-d4889f4cf6a8"
  }
]
```

</details>

#### Adicionar usuário na loja

<details>
  <summary><code>PUT</code> <code><b></b></code> <code>(Adicionar usuário na loja)</code></summary>

#### Estrutura de requisição

| Campo          | Tipo           | Descrição                |
| -------------- | -------------- | ------------------------ |
| **`storeId`**  | **`String`**   | Id da loja               |
| **`usersIds`** | **`String[]`** | Array de ids de usuários |

#### Response

```
201
```

</details>

#### Atualizar dados da loja

<details>
  <summary><code>PUT</code> <code><b></b></code> <code>(Atualizar loja)</code></summary>

#### Estrutura de requisição

| Campo             | Tipo         | Descrição          |
| ----------------- | ------------ | ------------------ |
| **`storeId`**     | **`String`** | Id da loja         |
| **`address`**     | **`String`** | Endereço da loja   |
| **`description`** | **`String`** | Descrição da loja  |
| **`ownerId`**     | **`String`** | Id do dono da loja |
| **`phone`**       | **`String`** | Telefone da loja   |
| **`store_name`**  | **`String`** | Nome da loja       |

#### Response

```
201
```

</details>

#### Deletar loja

<details>
  <summary><code>DELETE</code> <code><b></b></code> <code>(Deletar loja)</code></summary>

#### Estrutura de requisição

| Campo         | Tipo         | Descrição  |
| ------------- | ------------ | ---------- |
| **`storeId`** | **`String`** | Id da loja |

#### Response

```
200
```

</details>

#### Remover usuário da loja

<details>
  <summary><code>DELETE</code> <code><b></b></code> <code>(Remover usuário)</code></summary>

#### Estrutura de requisição

| Campo         | Tipo         | Descrição     |
| ------------- | ------------ | ------------- |
| **`storeId`** | **`String`** | Id da loja    |
| **`userId`**  | **`String`** | Id de usuário |

#### Response

```
200
```

</details>

#### Criar categorias

<details>
  <summary><code>POST</code> <code><b></b></code> <code>(Criar categoria)</code></summary>

#### Estrutura de requisição

| Campo         | Tipo         | Descrição        |
| ------------- | ------------ | ---------------- |
| **`storeId`** | **`String`** | Id da loja       |
| **`name`**    | **`String`** | Nome da ctegoria |

#### Response

```json
{
  "id": "238af485-f6fc-4b5c-b15e-7a335b62cb9a",
  "name": "Nome da categoria",
  "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e"
}
```

</details>

#### Listar Categorias

<details>
  <summary><code>GET</code> <code><b></b></code> <code>(Listar categorias)</code></summary>

#### Estrutura de requisição

| Campo         | Tipo         | Descrição  |
| ------------- | ------------ | ---------- |
| **`storeId`** | **`String`** | Id da loja |

#### Response

```json
[
  {
    "id": "238af485-f6fc-4b5c-b15e-7a335b62cb9a",
    "name": "Nome da categoria",
    "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e"
  }
]
```

</details>

#### Atualizar categorias

<details>
  <summary><code>PUT</code> <code><b></b></code> <code>(Atualizar categorias)</code></summary>

#### Estrutura de requisição

| Campo             | Tipo         | Descrição          |
| ----------------- | ------------ | ------------------ |
| **`storeId`**     | **`String`** | Id da loja         |
| **`name`**        | **`String`** | nome da loja atual |
| **`updatedName`** | **`String`** | nome da loja       |

#### Response

```json
{
  "id": "238af485-f6fc-4b5c-b15e-7a335b62cb9a",
  "name": "new name",
  "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e"
}
```

</details>

#### Deletar categoria

<details>
  <summary><code>DELETE</code> <code><b></b></code> <code>(Deletar categoria)</code></summary>

#### Estrutura de requisição

| Campo         | Tipo         | Descrição    |
| ------------- | ------------ | ------------ |
| **`storeId`** | **`String`** | Id da loja   |
| **`name`**    | **`String`** | nome da loja |

#### Response

```
200
```

</details>

#### Criar Produto

<details>
  <summary><code>POST</code> <code><b></b></code> <code>(Criar produto)</code></summary>

#### Estrutura de requisição

| Campo             | Tipo         | Descrição            |
| ----------------- | ------------ | -------------------- |
| **`storeId`**     | **`String`** | Id da loja           |
| **`name`**        | **`String`** | Nome do produto      |
| **`description`** | **`String`** | Descrição do produto |
| **`price`**       | **`Number`** | Preço do produto     |
| **`currency`**    | **`String`** | Moeda do produto     |
| **`category`**    | **`String`** | Categoria do produto |

#### Response

```json
{
  "productId": "4a061732-3f10-4202-b14c-b383b9f53276",
  "productName": "nome do produto",
  "productDescription": "descrição do produto",
  "productPrice": 200,
  "currency": "BRL",
  "productCategories": [
    {
      "id": "d7dd2cb0-c115-4e9d-872f-2541a34e658e",
      "name": "new name",
      "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e"
    }
  ]
}
```

</details>

#### Atualizar produto

<details>
  <summary><code>PUT</code> <code><b></b></code> <code>(Atualizar produto)</code></summary>

#### Estrutura de requisição

```json
{
  "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e",
  "productId": "c0982cea-3f6b-45a2-b5fe-c5001e9ebdbc",
  "name": "Nome do produto",
  "description": "Descrição do produto",
  "categoriesIds": ["Categorias"],

  "productPrice": {
    "amount": 500,
    "currency": "USD"
  }
}
```

#### Response

```json
{
  "productId": "7f2682e0-deaa-4c47-97c8-3d0cba298d9a",
  "productName": "Nome da categoria",
  "description": "Descrição da categoria",
  "productPrice": 500,
  "currency": "USD",
  "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e",
  "categories": [
    {
      "id": "d7dd2cb0-c115-4e9d-872f-2541a34e658e",
      "name": "Nome da categoria",
      "storeId": "d3ab4e5b-1295-429e-a0d7-8befbab8447e"
    }
  ]
}
```

</details>

#### Pegar todos produtos da loja

<details>
  <summary><code>GET</code> <code><b></b></code> <code>(Produtos da loja)</code></summary>

#### Estrutura de requisição

| Campo          | Tipo         | Descrição                         |
| -------------- | ------------ | --------------------------------- |
| **`storeId`**  | **`String`** | Id da loja                        |
| **`page`**     | **`Number`** | Paginação da requisição           |
| **`pageSize`** | **`Number`** | Quantidade de produtos por pagina |

#### Response

```json
{
  "products": [
    {
      "id": "b909b4b1-cd92-48e7-8f5a-b5c783ca4455",
      "name": "Nome do produto",
      "description": "Descrição do produto",
      "productsPrice": {
        "id": "e92bd4cc-9a99-4766-aaf8-a736e60da52e",
        "amount": 200,
        "currency": "BRL"
      }
    }
  ],
  "total": 6
}
```

</details>

#### Pegar todos produtos da loja por categoria

<details>
  <summary><code>GET</code> <code><b></b></code> <code>(Produtos da loja por categoria)</code></summary>

#### Estrutura de requisição

| Campo              | Tipo         | Descrição                         |
| ------------------ | ------------ | --------------------------------- |
| **`storeId`**      | **`String`** | Id da loja                        |
| **`page`**         | **`Number`** | Paginação da requisição           |
| **`pageSize`**     | **`Number`** | Quantidade de produtos por pagina |
| **`categoryName`** | **`String`** | Nome da categoria                 |

#### Response

```json
{
  "products": [
    {
      "id": "e0e2bd79-bc8c-428a-a39d-a9e5549ee99c",
      "name": "Nome do produto",
      "description": "Descrição do Produto",
      "productsPrice": {
        "id": "18100cee-7f3b-4c4e-9f8f-d11db1496d45",
        "amount": 200,
        "currency": "BRL"
      }
    }
  ],
  "total": 1
}
```

</details>

#### Deletar Produto

<details>
  <summary><code>DELETE</code> <code><b></b></code> <code>(Deletar produto)</code></summary>

#### Estrutura de requisição

| Campo           | Tipo         | Descrição     |
| --------------- | ------------ | ------------- |
| **`storeId`**   | **`String`** | Id da loja    |
| **`productId`** | **`String`** | Id do produto |

#### Response

```
204
```

</details>

#### Atualizar Cargo do usuário

<details>
  <summary><code>PUT</code> <code><b></b></code> <code>(Atualizar Role)</code></summary>

#### Estrutura de requisição

| Campo           | Tipo         | Descrição                         |
| --------------- | ------------ | --------------------------------- |
| **`storeId`**   | **`String`** | Id da loja                        |
| **`updUserId`** | **`String`** | Id do usuário para ser atualizado |
| **`role`**      | **`String`** | Role do usuário                   |

#### Response

```
201
```

</details>
