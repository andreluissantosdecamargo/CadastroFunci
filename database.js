const mysql = require('mysql2');

// Configurando a conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco'
});

// Conectando ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    return;
  }
  console.log('Conectado ao MySQL.');
});

// Cria a tabela "funcionarios" se não existir
const createTable = `
  CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    funcao VARCHAR(255),
    salario DECIMAL(10, 2)
  )
`;

connection.query(createTable, (err) => {
  if (err) {
    console.error('Erro ao criar tabela:', err.message);
  } else {
    console.log('Tabela "funcionarios" criada ou já existe.');
  }
});

module.exports = connection;
