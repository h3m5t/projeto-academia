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
   res.render('funcionario-add');
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
          console.error('Erro ao adicionar funcionário:', erro);
          return res.status(500).send('Erro ao adicionar funcionário');
      }

      res.status(200).send('Funcionário cadastrado com sucesso!');
  });
});


/* Rota para excluir Funcionario */


/* Rota para editar Funcionario */

  

module.exports = router;

