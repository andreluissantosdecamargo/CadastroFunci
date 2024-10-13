# Cadastro de Funcionários - CRUD

Este é um projeto de exemplo de um sistema CRUD (Criar, Ler, Atualizar e Deletar) para gerenciar o cadastro de funcionários, utilizando Node.js e MySQL.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- JavaScript (Frontend)
- HTML/CSS

## Configuração do Ambiente

Siga as etapas abaixo para configurar o ambiente:

### 1. Clonar o Repositório

Clone este repositório em sua máquina local:

```bash
git clone https://github.com/andreluissantosdecamargo/CadastroFunci.git
cd cadastro-funcionarios
```

### 2. Instalar Dependências

Instale as dependências necessárias do projeto:

```bash
npm install
```

### 3. Configurar o Banco de Dados

1. Abra o MySQL e crie um novo banco de dados:

   ```sql
   CREATE DATABASE cadastro;
   ```

2. Crie uma tabela chamada `funcionarios` com a seguinte estrutura:

   ```sql
   CREATE TABLE funcionarios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nome VARCHAR(100) NOT NULL,
       funcao VARCHAR(100) NOT NULL,
       salario DECIMAL(10, 2) NOT NULL
   );
   ```

### 4. Configurar Conexão com o Banco de Dados

Edite o arquivo `db.js` para configurar sua conexão com o MySQL. Certifique-se de alterar as credenciais de acesso (`host`, `user`, `password` e `database`) conforme necessário.

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'cadastro'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
```

### 5. Iniciar o Servidor

Inicie o servidor Node.js:

```bash
node server.js
```

Você deverá ver a mensagem `Servidor rodando na porta 3000` e `Conectado ao banco de dados MySQL!`.

### 6. Acessar a Aplicação

Abra seu navegador e vá para `http://localhost:3000`.

### 7. Testar as Funcionalidades

1. **Adicionar Funcionário**: Clique em "Incluir", preencha os dados e salve.
2. **Visualizar Funcionários**: Veja a lista de funcionários cadastrados.
3. **Editar Funcionário**: Clique no ícone de editar, faça as alterações e salve.
4. **Excluir Funcionário**: Clique no ícone de excluir e confirme a ação.

### 8. Verificar no MySQL

Para verificar se as operações foram realizadas corretamente, acesse o MySQL e execute:

```sql
USE cadastro;
SELECT * FROM funcionarios;
```
