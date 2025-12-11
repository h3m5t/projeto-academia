var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* 1. LISTAR FUNCIONÁRIOS */
router.get('/listar', function(req, res) {
  let cmd = `
    SELECT 
      f.mat_funcionario AS Matricula, 
      f.nome_func AS Nome, 
      f.cpf_func AS Cpf, 
      DATE_FORMAT(f.dt_nascimento, "%d/%m/%Y") AS Aniversario, 
      c.nome_cargo AS Cargo, 
      c.salario_cargo AS Salario, 
      f.tel_func AS contato 
    FROM tbfuncionario AS f
    LEFT JOIN tbcargo AS c ON c.id_cargo = f.id_cargo;
  `;
  db.query(cmd, [], function(erro, listagem) {
    if (erro) return res.status(500).json({ erro: erro.sqlMessage });
    res.json(listagem);
  });
});

/* 2. LISTAR CARGOS */
router.get('/cargos', function(req, res) {
  let cmd = 'SELECT id_cargo, nome_cargo FROM tbcargo;';
  db.query(cmd, [], function(erro, listagem) {
    if (erro) return res.status(500).json({ erro: erro.sqlMessage });
    res.json(listagem);
  });
});

/* 3. ADICIONAR FUNCIONÁRIO */
router.post('/add', function(req, res) {
  let { nome, telefone, cpf, nascimento, cargo } = req.body;
  let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;
  let cmd = 'INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES (?, ?, ?, ?, ?);';
  
  db.query(cmd, [nome, telefone, cpf, nascimentoFormatado, cargo], function(erro, resultados) {
    if (erro) return res.status(500).json({ erro: "Erro ao adicionar." });
    res.json({ sucesso: true, mensagem: "Funcionário salvo!" });
  });
});

/* 4. EDITAR FUNCIONÁRIO */
router.put('/editar/:id', function(req, res) {
  let id = req.params.id;
  let { nome, telefone, cpf, nascimento, cargo } = req.body;
  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo = ? WHERE mat_funcionario = ?;';
  
  db.query(cmd, [nome, telefone, cpf, nascimento, cargo, id], function(erro, resultado) {
    if (erro) return res.status(500).json({ erro: 'Erro ao editar' });
    res.json({ sucesso: true });
  });
});

/* 5. EXCLUIR FUNCIONÁRIO (Simples - Como era antes) */
router.delete('/apagar/:mat', function(req, res) {
  let mat = req.params.mat;
  let cmd = "DELETE FROM tbfuncionario WHERE mat_funcionario = ?;";
  
  db.query(cmd, [mat], function(erro) {
    if (erro) {
        // Retorna o erro se houver vínculos (Foreign Key)
        return res.status(500).json({ erro: erro.sqlMessage });
    }
    res.json({ sucesso: true });
  });
});

module.exports = router;