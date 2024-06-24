# Customer Management System - Back-end

Este projeto é um sistema simples de gerenciamento de clientes desenvolvido em Node.js, com uma base de dados MySQL para armazenar informações de clientes e suas respectivas tags.

## Pré-requisitos

Certifique-se de ter as seguintes dependências instaladas antes de iniciar:

Opção 1

-   [Node.js](https://nodejs.org/) (versão 16.17.0 ou superior)
-   Pacotes [npm](https://www.npmjs.com/) (Node Package Manager)
-   [MySQL](https://www.mysql.com/downloads/) (versão 8.0.35 ou superior)

Opção 2

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## Instruções de Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/JoseEduardoMartins/customer-manager-backend.git

cd customer-manager-backend
```

### 2. Configurar ambiente.

#### Opção 1: Local

-   Instale as dependências:

    ```bash
    npm install
    ```

-   Criar um arquivo `.env` na raiz do projeto com base no `.env.example` e mude as variaveis se necessario.

    ```bash
    APP_PORT=3000
    APP_PATH=/api
    ```

-   Se você ainda não o tiver instalado, siga as instruções na [documentação oficial](https://www.mysql.com/downloads/) para instalar o MySQL.

-   Adicione as credenciais do banco de dados no arquivo `.env`:

    ```bash
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=customer-manager-db
    ```

-   Abra um terminal e execute o seguinte comando para criar um banco de dados e aplicar a estrutura inicial a partir do arquivo `schema.sql`:

    ```bash
    mysql -u seu_usuario -p sua_senha -h seu_host < ./database/schema.sql

    ```

-   Se você tiver um arquivo `seeds.sql` com dados iniciais, execute o seguinte comando para adicioná-los:
    ```bash
    mysql -u seu_usuario -p sua_senha -h seu_host < ./database/seed.sql
    ```

#### Opção 2: Utilizando Docker

-   Certifique-se de que o [Docker](https://docs.docker.com/get-docker/) e o [Docker Compose](https://docs.docker.com/compose/install/) estão instalados e rodando em sua máquina.

-   Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `docker-compose.yml` para conectar ao banco de dados.

### 4. Executar a Aplicação

#### Opção 1: Local

-   Inicie a aplicação:

    ```bash
    npm run start:prod
    ```

-   Observe o código-fonte e reconstrua/atualize a aplicação quando os arquivos forem atualizados:

    ```bash
    npm run start:dev
    ```

#### Opção 2: Utilizando Docker

-   Inicie a aplicação:

    ```bash
    docker-compose up
    ```

-   Crie imagens antes de iniciar contêineres:

    ```bash
    docker-compose up --build
    ```

-   Interrompe contêineres e remove contêineres, redes, volumes e imagens criadas pelo `up`:

    ```bash
    docker-compose down
    ```

O servidor estará disponível em http://localhost:3000.

## Uso

Acesse a API para gerenciar os clientes e suas tags.

-   Listar todos os clientes: GET /customers/
-   Obter um cliente específico: GET /customers/:id
-   Criar um novo cliente: POST /customers/
-   Atualizar um cliente existente: PUT /customers/:id
-   Excluir um cliente: DELETE /customers/:id

## Exemplo de Payload para Criação/Atualização de Cliente

```script
{
    "name": "Nome do Cliente",
    "email": "E-mail do Cliente",
    "tags": [
        {
            "title": "tag 1"
        },
    ]
}
```

Acesse a API para gerenciar as tags.

-   Listar todos os tags: GET /tags/
-   Obter um tag específico: GET /tags/:id
-   Criar um novo tag: POST /tags/
-   Atualizar um tag existente: PUT /tags/:id
-   Excluir um tag: DELETE /tags/:id

## Exemplo de Payload para Criação/Atualização de Tag

```script
{
    "title": "Titulo da tag"
}
```

## Contribuição

Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões, por favor, abra uma [issue](https://github.com/JoseEduardoMartins/customer-manager-backend/issues/new).

## Autor

-   José Eduardo Martins

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo LICENSE.md para obter detalhes.

## Contato

Para qualquer dúvida ou problema, entre em contato com `m4rt1ns.jose@gmail.com`.
