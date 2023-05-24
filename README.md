<h1 align="center"> API BarberShop </h1>

## Summary
- [Summary](#summary)
- [Intro](#intro)
- [Description](#description)
- [System Requirements](#system-requirements)
- [Project access](#project-access)
  - [Open \&\& Run](#open--run)

## Intro
* BarberShop é API REST desenvolvida para atender às necessidades de uma barbearia que deseja um sistema de gerenciamento que se concentra no acompanhamento e geração de relatórios do negócio.
  
## Description
* A API REST de Gerenciamento de Barbearia é uma aplicação desenvolvida para fornecer funcionalidades essenciais de gerenciamento de uma barbearia. Esta API permite o registro de clientes, o cadastro de usuários, cadastro de empresas, a definição de serviços oferecidos e a geração de relatórios de negócios.

## System Requirements
* Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
Nodejs com na versão v16.2.0
[Node.js](https://nodejs.org/en/). 
Criar conta no mongodb, criar cluster compartilhado, criar connection no cluster por Driver, adiquirir link de conexão com password, alterar no arquivo .env a variável de ambiente MONGODB_URL_BARBERSHOP com nome da base barberShop e MONGODB_URL_DBTEST com nome da base DBTest.
[MongoDB](https://www.mongodb.com).
E o docker para utilizar docker-compose para subir o container do Redis
[Docker](https://https://www.docker.com/).
E instalar o docker-compose pra subir o container.
[Docker-Compose](https://docs.docker.com/compose/install/).
Além disto é bom ter um editor para trabalhar com o código como 
[VSCode](https://code.visualstudio.com/).

## Project access

### Open && Run
```bash
# Clone este repositório
$ git clone <https://github.com/kaiomoreira-dev/api-barbershop.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd api-barbershop

# Instale as dependências
$ yarn ou npm install

# Exutar container com serviço do redis
$ docker-compose up -d

# Constuir o aplicação
$ yarn build ou npm run build

## Iniciar aplicação
// desenvolvimento
$ yarn start ou npm run dev

// tests
$ yarn test ou npm run test

# O servidor inciará na porta:3200 - acesse <http://localhost:3200>

# O banco de dados do redis fica no docker na porta 6379:6379
```
