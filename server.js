const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Inicialização do app Express
const app = express();
const PORT = 3001;

// Middleware para processar JSON
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário MySQL
  password: '', // Substitua pela sua senha MySQL
  database: 'funcionariosDB'
});

// Verifica se a conexão foi estabelecida com sucesso
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para criar um novo funcionário (POST)
app.post('/funcionarios', (req, res) => {
  const { nome, funcao, salario } = req.body;

  const sql = 'INSERT INTO funcionarios (nome, funcao, salario) VALUES (?, ?, ?)';
  const values = [nome, funcao, salario];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar funcionário', error: err });
    }
    res.status(201).json({ message: 'Funcionário criado com sucesso', id: result.insertId });
  });
});

// Rota para listar todos os funcionários (GET)
app.get('/funcionarios', (req, res) => {
  const sql = 'SELECT * FROM funcionarios';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao listar funcionários', error: err });
    }
    res.json(results);
  });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
