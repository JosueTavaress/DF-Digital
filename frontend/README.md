## Tecnologias utilizadas
- React
- TypeScript
- Vite
- chackra/ui

> Para rodar a aplicação é recomendado que seja executado dentro dos containers do docker siga as instruçõe clicando [aqui](/README.md)

# Instruções para Execução Local
Para executar esta aplicação localmente em sua máquina, siga os passos abaixo:

## Pré-requisitos

- Node.js instalado na máquina (versão 20.11)
- MySQL instalado e rodando

## Configuração do Banco de Dados

A aplicação no frontend requer um banco de dados MySQL em execução com um esquema específico. Utilizar o dump de construção de banco encontrado em `/backend/sql/dbcreation.sql`.

## Instalação das Dependências

1. Abra um terminal.
2. Navegue até o diretório `/frontend`.
3. Execute o seguinte comando para instalar as dependências do projeto:

```sh
npm install
```

## Execução da Aplicação
Após instalar as dependências, você pode iniciar a aplicação com o seguinte comando:


```sh
npm run dev
```

## Configuração ESLint

Se você estiver desenvolvendo uma aplicação de produção, recomendamos atualizar a configuração para habilitar regras de lint com conhecimento de tipo:

- Configure a propriedade `parserOptions` no nível superior assim:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```




