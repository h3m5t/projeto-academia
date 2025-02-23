var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota listar funcionários --> SHOW*/
router.get('/listar', function (req, res) {
  let cmd  = `
  SELECT 
      f.mat_funcionario AS Matricula, 
      f.nome_func AS Nome, 
      f.tel_func AS contato,
      DATE_FORMAT(f.dt_nascimento, "%d/%m/%Y") AS Aniversario, 
      f.cpf_func AS Cpf,
      c.nome_cargo AS Cargo,
      c.carga_horaria AS CargaH,
      c.salario_cargo AS Salario
  FROM tbfuncionario AS f
  LEFT JOIN tbcargo AS c ON f.id_cargo = c.id_cargo;
`;
  
  db.query(cmd, [], function (erro, resultados) {
      if (erro) {
          return res.send("Erro ao buscar funcionários: " + erro);
      }

     
      res.render('funcionario-lista', { resultado: resultados });
  });
});

/* Rota para add Funcionario */
router.get('/add', function(req, res) {
  res.render('funcionario-add', { resultado: {} });
});

router.post('/add', function(req, res) {
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let telefone = req.body.telefone;
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;

  /*Corrigir formato de nascimento */
  let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

  let cmd = 'INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES (?, ?, ?, ?, ?);';

  db.query(cmd, [nome, telefone, cpf, nascimentoFormatado, cargo], function(erro, resultados) {
      if (erro) {
          console.error("Erro ao adicionar funcionário:", erro);
          return res.status(500).send("Erro ao adicionar funcionário.");
      }
      res.redirect('/funcionario/listar');
  });
});

/* Rota para excluir Funcionario */
router.delete('/apagar/:mat', function(req, res) {
  let mat = req.params.mat;
  let cmd = "DELETE FROM tbfuncionario WHERE mat_funcionario = ?;";

  db.query(cmd, [mat], function(erro, resultado) {
    if (erro) {
      console.error("Erro ao apagar funcionário:", erro.sqlMessage);
      return res.status(500).json({ erro: "Erro ao apagar funcionário." });
    }
    res.status(200).json({ mensagem: "Funcionário apagado com sucesso!" });
  });
});


/* Rota para editar Funcionario */
router.get('/editar/:mat',function(req,res){
  let mat = req.params.mat; 

  let cmd = 'SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato,'
  cmd +=     'DATE_FORMAT(dt_nascimento,"%Y-%m-%d") AS Aniversario, cpf_func AS Cpf '
  cmd +=     'FROM tbfuncionario WHERE mat_funcionario = ?;'
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
  let cargo = req.body.id_cargo;
  let nascimento = req.body.nascimento; 


  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo= ? WHERE mat_funcionario = ? ;';

  db.query(cmd, [nome, telefone, cpf, nascimento, cargo, mat], function(erro, resultado) {
      if (erro) {
          return res.status(500).send('Erro ao modificar o funcionário');
      }

      res.redirect(303, '/funcionario/listar');
    
  });
});

module.exports = router;


