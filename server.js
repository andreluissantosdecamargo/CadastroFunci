// Importa os módulos necessários
const express = require('express'); // Framework para lidar com rotas HTTP
const cors = require('cors'); // Permite fazer requisições entre origens diferentes (cross-origin)
const bodyParser = require('body-parser'); // Middleware para processar o corpo das requisições
const db = require('./db'); // Arquivo que contém a conexão com o banco de dados

const app = express(); // Inicializa o servidor Express

// Middleware para permitir requisições de qualquer origem (CORS) e para processar o corpo das requisições JSON
app.use(cors());
app.use(bodyParser.json()); // Parse de JSON no corpo das requisições

// Rota para criar um novo funcionário
app.post('/funcionarios', (req, res) => {
  // Desestrutura os dados recebidos no corpo da requisição
  const { nome, funcao, salario } = req.body;

  // Query SQL para inserir um novo registro na tabela "funcionarios"
  const sql = 'INSERT INTO funcionarios (nome, funcao, salario) VALUES (?, ?, ?)';
  db.query(sql, [nome, funcao, salario], (err, result) => {
    if (err) throw err; // Lança erro em caso de falha na execução da query
    res.send({ message: 'Funcionário adicionado com sucesso!' }); // Retorna uma mensagem de sucesso
  });
});

// Rota para ler todos os funcionários
app.get('/funcionarios', (req, res) => {
  // Query SQL para selecionar todos os registros da tabela "funcionarios"
  const sql = 'SELECT * FROM funcionarios';
  db.query(sql, (err, results) => {
    if (err) throw err; // Lança erro em caso de falha na execução da query
    res.json(results); // Retorna os dados dos funcionários em formato JSON
  });
});

// Rota para atualizar um funcionário
app.put('/funcionarios/:id', (req, res) => {
  // Captura o ID do funcionário da URL e os dados enviados no corpo da requisição
  const { id } = req.params;
  const { nome, funcao, salario } = req.body;

  // Query SQL para atualizar os dados do funcionário com o ID especificado
  const sql = 'UPDATE funcionarios SET nome = ?, funcao = ?, salario = ? WHERE id = ?';
  db.query(sql, [nome, funcao, salario, id], (err, result) => {
    if (err) throw err; // Lança erro em caso de falha na execução da query
    res.send({ message: 'Funcionário atualizado com sucesso!' }); // Retorna uma mensagem de sucesso
  });
});

// Rota para excluir um funcionário
app.delete('/funcionarios/:id', (req, res) => {
  // Captura o ID do funcionário da URL
  const { id } = req.params;

  // Query SQL para deletar o registro do funcionário com o ID especificado
  const sql = 'DELETE FROM funcionarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err; // Lança erro em caso de falha na execução da query
    res.send({ message: 'Funcionário excluído com sucesso!' }); // Retorna uma mensagem de sucesso
  });
});

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
