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