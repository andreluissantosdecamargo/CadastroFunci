const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // seu usuário do MySQL
  password: 'alunodev', // sua senha do MySQL
  database: 'funcionariosDB' // seu banco de dados
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
