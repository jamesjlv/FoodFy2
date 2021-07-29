# Foodfy

Foodfy é o futuro dos sites de receitas!

![Site inicial do foodfy.](https://github.com/jamesjlv/FoodFy2/blob/master/public/foodfy/home.png?raw=true "Site inicial do foodfy.")

## Requisitos

Os requisitos para de executar o site Foodyfy são:

- Banco de Dados Postgres
- VSCode ( para edição e visualização do código)
- NodeJs

## Configurações

### Banco de dados

Você deverá executar o script para criar o banco de dados na sua instância do postgres, lembrando que o nome foodfy pode ser alterado para sua preferência

```
CREATE DATABASE foodfy;
```

Após criar o banco de dados, selecione o mesmo para que possa executar os scripts de criação das tabelas.

Na raiz desse repositório, você encontrará o database.sql, execute o mesmo após ter selecionado o banco de dados.

Link direto: [SQL](https://github.com/jamesjlv/FoodFy2/blob/master/database.sql)

### Configurando o projeto

Assim que você tiver criado todas as tabelas, você deverá acessar agora o seu projeto para atualizar os dados referente a conexão com o seu banco de dados.

Para isso abra o arquivo em projeto/src/config/db.js , você verá os seguintes dados:

```
    const { Pool } = require("pg");

    module.exports = new Pool({
        user: "USER_POSTGRESS",
        password: "PASSWORD",
        host: "HOST",
        port: PORT,
        database: "DATABASE_NAME",
    });
```

Você deverá preencher os campos conforme a configuração do seu banco de dados postgres instalado em sua maquina ou servidor.

### Instalando depêndencias

Agora que você já configurou seu projeto, é necessário que você instale todas as dependencias necessárias para que o projeto rode no VSCODE.

Para isso abra seu terminal e digite

```
    npm install
```

### Populando dados

Para popular os dados, você poderá abrir um terminal na raiz do projeto, e rodar o comando:

```
    node seeds.js
```

### Acesso

#### Opção 1

Ao popular o banco de dados, alguns usuários foram criados, você poderá ou procurar um usuário na tabela users que tenha o is_admin = true, com o email desse usuário basta acessar URL/admin que você será redirecionado a pagina de login.

Nessa página basta colocar o email que você pegou no banco de dados e colocar a senha padrão 123, ele irá acessar

#### Opção 2

Você pode acessar rodando o script de criação do usuário ADMIN apenas:

```
    INSERT INTO users(name, email, password, is_admin) VALUES('ADMIN','admin@admin.com.br','$2a$08$/1eTFdz3eeD8FC5mJ9VxAuwG9XRfICUkrIG6gvxyu9JAAiF7yV6j2',true);
```

Dados de login:

**Email:** admin@admin.com.br

**Senha:** 123

## Sobre o projeto

O FoodFy é um projeto desenvolvido ao longo do curso LaunchBase da RocketSeat, é um site para que as pessoas possam pesquisar receitas.

![FoodFy apresentation](https://github.com/jamesjlv/FoodFy2/blob/master/public/foodfy/foodFy.gif?raw=true "This is how foody works.")
