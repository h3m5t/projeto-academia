var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bem Vindo' });
});


/* Rota listar funcionários*/
router.get('/funcionarios/listar',function(req,res){
  let cmd = 'SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato,'
  cmd +=     'dt_nascimento AS Aniversário, cpf_func AS Cpf '
  cmd +=     'FROM tbfuncionario;'
  db.query(cmd, [], function(erro, listagem){
    if(erro){
      res.send(erro);
    }
    res.render('funcionario-lista', {resultado: listagem});
  });
});





/* Rota para add Funcionario */
router.post('/funcionarios/add', function(req, res) {
  let { nome, telefone, cpf, id_cargo } = req.body;

  let cmd = `INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, id_cargo) 
             VALUES (?, ?, ?, ?)`;

  db.query(cmd, [nome, telefone, cpf, id_cargo], function(erro, resultado) {
      if (erro) {
          res.render('funcionario-add', { mensagem: 'Erro ao cadastrar funcionário!', erro });
          return;
      }
      res.render('funcionario-add', { mensagem: 'Funcionário cadastrado com sucesso!' });
  });
});


module.exports = router;


/* como add */