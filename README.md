# Projeto Academia - Back-end (API)

Este repositório contém o servidor (Back-end) do sistema de gerenciamento "Titanium". Ele foi desenvolvido utilizando **Node.js** e atua como uma API, conectando o Front-end ao banco de dados MySQL.

> **Nota:** Este projeto originou-se de um sistema legado (antigo projeto de PABD em EJS) e foi adaptado para servir dados via JSON para a nova interface em Angular.

## Tecnologias Utilizadas

* **Linguagem:** JavaScript (Node.js v22.x)
* **Framework:** Express
* **Banco de Dados:** MySQL (via XAMPP/phpMyAdmin) 
* **Ferramentas:** Nodemon (para reinicialização automática) 

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
1.  **Node.js** (Versão 22.13.1 ou superior)
2.  **XAMPP** (ou qualquer servidor MySQL rodando na porta padrão 3306)

## Configuração do Banco de Dados

1.  Abra o painel do **XAMPP** e inicie o serviço **MySQL** (Start).
2.  Acesse o **phpMyAdmin** (`http://localhost/phpmyadmin`).
3.  Crie um novo banco de dados chamado: `dbacademia`
4.  Importe o arquivo `.sql` disponível na pasta `database/` deste projeto ou execute o script de criação das tabelas.

## Como Rodar o Servidor

1.  Abra o terminal na pasta deste projeto.
2.  Instale as dependências necessárias:
    ```bash
    npm install
    npm install --save nodemon
    ```

3.  Inicie o servidor:
    ```bash
    npx nodemon server
    ```

4.  Se tudo der certo, você verá a mensagem "show" ou similar no terminal.
5.  O servidor estará rodando em: `http://localhost:3000`.

## Rotas Principais

* **Funcionários:** `GET /funcionario/listar`
* **Clientes:** `GET /cliente/listar`
* **Pagamentos:** `GET /pagamento/pagantes`

---

