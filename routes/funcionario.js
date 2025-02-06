var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota listar funcionários*/
router.get('/listar',function(req,res){
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
router.get('/add',function(req,res){
   res.render('funcionario-add');
})

router.post('/add',function(req,res){

    let nome = req.body.nome
    let cpf = req.body.cpf
    let telefone = req.body.telefone
    let nascimento = req.body.nascimento

    let cmd = 'INSERT INTO tbfuncionario (nome_func,tel_func,cpf_func,dt_nascimento) VALUES (?,?,?,?);';
    db.query(cmd,[nome,cpf,telefone,nascimento], function(erro,listagem){
        if(erro){
            res.send(erro)
        }
        res.redirect('/funcionario/listar');
    });
});

module.exports = router;

