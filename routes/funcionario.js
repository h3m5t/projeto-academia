var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota listar funcionários*/
router.get('/listar',function(req,res){
    let cmd = 'SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato,'
    cmd +=     'DATE_FORMAT(dt_nascimento,"%d/%m/%Y") AS Aniversario, cpf_func AS Cpf '
    cmd +=     'FROM tbfuncionario;'
    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro);
      }
      res.render('funcionario-lista', {resultado: listagem});
    });
  });


/* Rota para add Funcionario */
router.get('/add',function(req,res){
   res.render('funcionario-add',{resultado:{}});
})

router.post('/add', function(req, res) {
  let nome = req.body.nome;
  let cpf = req.body.cpf;
  let telefone = req.body.telefone;
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;

  let cmd = 'INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES ( ?, ?, ?, ?, ?);';

  db.query(cmd, [nome, cpf, telefone, nascimento, cargo], function(erro, resultado) {
      if (erro) {
          return res.status(500).send('Erro ao adicionar funcionário');
      }

      res.status(200).send('Funcionário cadastrado com sucesso!');
      res.render('funcionario-lista');
  });
});


/* Rota para excluir Funcionario */


/* Rota para editar Funcionario */
router.get('/editar/:mat',function(req,res){
  let mat = req.params.mat; 

  let cmd = 'SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato,'
  cmd +=     'DATE_FORMAT(dt_nascimento,"%d/%m/%Y") AS Aniversario, cpf_func AS Cpf '
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
  let nascimento = req.body.nascimento;
  let cargo = req.body.cargo;

  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo= ? WHERE mat_funcionario = ? ;';

  db.query(cmd, [nome, cpf, telefone, nascimento, cargo], function(erro, resultado) {
      if (erro) {
          return res.status(500).send('Erro ao adicionar funcionário');
      }

      res.redirect(303, '/funcionario/listar');
    
  });
});

module.exports = router;

