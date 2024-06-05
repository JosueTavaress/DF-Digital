### Tecnologias Utilizadas:
- **Backend e API:**
  - Express
  - Docker
  - TypeScript
  - JWT (jsonwebtoken)
  - Morgan
  - Bcrypt

- **Testes:**
  - Jest
  - Supertest

- **Validação de Dados:**
  - Zod

- **Outros:**
  - Nodemon
  - dotenv
  - Swagger UI Express

> Para rodar a aplicação é recomendado que seja executado dentro dos containers do docker siga as instruçõe clicando [aqui](/README.md)

## Instruções para Execução Local

Para executar esta aplicação localmente em sua máquina, siga os passos abaixo:

1. É necessário ter um banco de dados MySQL em execução. Configure as chaves de acesso conforme o exemplo em `.env.example` no arquivo principal, recomendação rodar o dump do banco em `src/sql/debcreation.sql`

2. Baixe as dependências de desenvolvimento com o comando:
```sh
npm install
```

3. Para rodar a aplicação, utilize o comando:
```sh
npm run dev
```

A documentação dos endpoints está disponível em `http://localhost:4000/docs`, criada com Swagger.

A API segue o padrão de autenticação JWT. Para efetuar login e obter um token de acesso para interagir com os endpoints, siga as instruções clicando [aqui](/README.md).


## O projeto utiliza padrões de aquitetura MSC
### Arvore de arquivos por [tree](https://www.geeksforgeeks.org/tree-command-unixlinux/)
```
 src
  ├── Dockerfile
  ├── sql
  │   └── dbcreation.sql
  ├── src
  │   ├── app.ts
  │   ├── controllers
  │   │   ├── auth-controller.ts
  │   │   ├── tag-controller.ts
  │   │   └── user-controller.ts
  │   ├── db
  │   │   └── connection.ts
  │   ├── errors
  │   │   └── errors-http.ts
  │   ├── libs
  │   │   └── rescue.ts
  │   ├── main.ts
  │   ├── middlewares
  │   │   ├── authorization.ts
  │   │   ├── body-validator.ts
  │   │   └── handler-error.ts
  │   ├── models
  │   │   ├── tags-model
  │   │   │   ├── interface.ts
  │   │   │   └── tag-model.ts
  │   │   └── user-model
  │   │       ├── interface.ts
  │   │       └── user-model.ts
  │   ├── routes
  │   │   ├── auth-route.ts
  │   │   ├── tag-route.ts
  │   │   └── user-route.ts
  │   ├── services
  │   │   ├── auth-service.ts
  │   │   ├── interface.ts
  │   │   ├── tag-service.ts
  │   │   ├── user-service.ts
  │   │   └── utils
  │   │       └── hash.ts
  │   ├── swagger.ts
  │   ├── test
  │   │   └── E2E
  │   │       └── users.test.ts
  │   └── validator
  │       ├── auth-body-validator.ts
  │       ├── index.ts
  │       ├── tag-body-validator.ts
  │       └── user-body-validator.ts
  └── tsconfig.json
```