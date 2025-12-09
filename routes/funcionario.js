var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* LISTAR FUNCIONÁRIOS (Corrigido: Sem Salário) */
router.get('/listar', function(req, res) {
  let cmd = `
    SELECT 
      f.mat_funcionario AS Matricula, 
      f.nome_func AS Nome, 
      f.cpf_func AS Cpf, 
      DATE_FORMAT(f.dt_nascimento, "%d/%m/%Y") AS Aniversario, 
      c.nome_cargo AS Cargo, 
      f.tel_func AS contato 
    FROM tbfuncionario AS f
    LEFT JOIN tbcargo AS c ON c.id_cargo = f.id_cargo;
  `;
  
  // Note que removi "c.salario AS Salario" da lista acima
  
  db.query(cmd, [], function(erro, listagem) {
    if (erro) {
      console.error(erro);
      return res.status(500).json({ erro: erro.sqlMessage });
    }
    res.json(listagem);
  });
});

/* ADICIONAR FUNCIONÁRIO */
router.post('/add', function(req, res) {
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let telefone = req.body.telefone;
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;

  let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

  let cmd = 'INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES (?, ?, ?, ?, ?);';
  
  db.query(cmd, [nome, telefone, cpf, nascimentoFormatado, cargo], function(erro, resultados) {
    if (erro) {
      return res.status(500).json({ erro: "Erro ao adicionar funcionário." });
    }
    res.json({ sucesso: true, mensagem: "Funcionário salvo!" });
  });
});

/* EDITAR FUNCIONÁRIO */
router.put('/editar/:id', function(req, res) {
  let id = req.params.id;
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let telefone = req.body.telefone;
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;

  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo = ? WHERE mat_funcionario = ?;';

  db.query(cmd, [nome, telefone, cpf, nascimento, cargo, id], function(erro, resultado) {
    if (erro) {
      return res.status(500).json({ erro: 'Erro ao modificar o funcionário' });
    }
    res.json({ sucesso: true });
  });
});

/* EXCLUIR FUNCIONÁRIO */
router.delete('/apagar/:mat', function(req, res) {
  let mat = req.params.mat;
  let cmd = "DELETE FROM tbfuncionario WHERE mat_funcionario = ?;";
  db.query(cmd, [mat], function(erro, listagem) {
    if (erro) {
      return res.status(500).json({ erro: erro.sqlMessage });
    }
    res.json({ sucesso: true });
  });
});



/* Rota para editar Funcionario */
router.get('/editar/:mat',function(req,res){
  let mat = req.params.mat; 

  let cmd = 'SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato, ';
  cmd += 'DATE_FORMAT(dt_nascimento,"%Y-%m-%d") AS Aniversario, cpf_func AS Cpf, id_cargo ';
  cmd += 'FROM tbfuncionario WHERE mat_funcionario = ?;';
  
  db.query(cmd, [mat], function(erro, listagem){
    if(erro){
      res.send(erro);
    }
    res.render('funcionario-add', {resultado: listagem[0]});
  });
});

router.put('/editar/:mat', function(req, res) {
  let mat = req.params.mat
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let telefone = req.body.telefone;
  let cargo = req.body.cargo;
  let nascimento = req.body.nascimento; 


  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo= ? WHERE mat_funcionario = ? ;';

  db.query(cmd, [nome, telefone, cpf, nascimento, cargo, mat], function(erro, resultado) {
      if (erro) {
          return res.status(500).send('Erro ao modificar o funcionário');
      }

    res.json({ sucesso: true });
    
    
  });
});

module.exports = router;


