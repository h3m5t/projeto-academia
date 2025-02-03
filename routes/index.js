var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bem Vindo' });
});


/* Rota Funcionario */
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



module.exports = router;
