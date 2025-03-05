
## Descrição do projeto - "Projeto-Academia" 


Este projeto visa otimizar a administração de uma academia, buscando facilitar o gerenciamento de três áreas principais: funcionários, clientes e pagamentos. 
Com o objetivo de simplificar o processo de controle interno e melhorar a eficiência operacional, 
o sistema fornece funcionalidades que permitem:

1. Gestão de Funcionários:
O projeto permite que os administradores cadastrem, editem e excluam informações dos funcionários da academia, como treinadores, recepcionistas e outros colaboradores. Além disso, possibilita o controle de horários de trabalho, carga horária e outros dados importantes relacionados à performance e organização da equipe.

2. Gerenciamento de Clientes:
O sistema facilita o cadastro dos alunos, mantendo registros atualizados sobre seus dados pessoais, planos de treino. Isso permite uma visão clara sobre cada cliente e o atendimento das suas necessidades específicas.

3. Controle de Pagamentos:
Uma parte essencial do sistema é a gestão de pagamentos, onde é possível registrar as transações feitas pelos alunos, verificar status de pagamento (pago, pendente, etc.), e acompanhar o histórico de cada cliente em relação aos valores pagos.



### Passo a Passo para Executar o Projeto
1. Verificar o Node.js
Antes de executar o projeto, certifique-se de que o Node.js está instalado no seu sistema. As versões utilizadas para criação foram:

Node.js: v22.13.1


npm: 10.9.2
 Caso não tenha baixado clique [aqui](https://nodejs.org/en/download) para instalar. 
2. Instalar o Nodemon
Abra sua IDE (Integrated Development Environment) e instale a dependência nodemon para otimizar a execução do código. Execute o seguinte comando no terminal:

```bash
npm install --save nodemon
```
O nodemon reinicia automaticamente o servidor sempre que alterações são feitas no código, evitando a necessidade de fechar e abrir novos terminais.

3. Configurar o Banco de Dados
O projeto está conectado a um banco de dados. Para isso, você precisará de um ambiente de desenvolvimento local.

- Baixe o arquivo do banco de dados que está disponível.
- Instale o pacote de software XAMPP, que inclui o MySQL e Apache, necessários para a execução do banco de dados.
- Crie um banco de dados com o nome dbacademia para garantir a compatibilidade com o sistema.

4. Executar o Projeto
Com o banco de dados configurado e o ambiente local pronto, abra um terminal na sua IDE e execute o comando:

```bash
npx nodemon server
```

Após o servidor iniciar, abra o navegador e acesse o seguinte endereço:

```
localhost:3000/funcionario/listar
```