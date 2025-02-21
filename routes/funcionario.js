var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota listar funcionários --> SHOW*/
router.get('/listar', function (req, res) {
  let cmd = `
      SELECT mat_funcionario AS Matricula, nome_func AS Nome, tel_func AS contato,
      DATE_FORMAT(dt_nascimento, "%d/%m/%Y") AS Aniversario, cpf_func AS Cpf
      FROM tbfuncionario;
  `;
  
  db.query(cmd, [], function (erro, resultados) {
      if (erro) {
          return res.send("Erro ao buscar funcionários: " + erro);
      }

     
      res.render('funcionario-lista', { resultado: resultados });
  });
});



/* Rota para add Funcionario --> SHOW*/
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
         res.render(erro)
      }

      res.render('funcionario-lista');
  });
});


/* Rota para excluir Funcionario */
router.delete('/apagar/:mat', function(req,res){
  let mat = req.params.mat; 
  let cmd = "DELETE FROM tbfuncionario WHERE mat_funcionario = ?;";
  db.query(cmd, [mat], function(erro,listagem){
    if(erro){
      res.send(erro);
    }
    res.redirect(303, '/funcionario/listar')
  });
});


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
  let cargo = req.body.id_cargo;
  let nascimento = req.body.nascimento; // Espera "YYYY-MM-DD", mas pode vir "DD/MM/YYYY"

// Converter se estiver no formato "DD/MM/YYYY"
if (nascimento.includes('/')) {
    let partes = nascimento.split('/');
    nascimento = `${partes[2]}-${partes[1]}-${partes[0]}`; // Convertendo para "YYYY-MM-DD"
}
  
  let cmd = 'UPDATE tbfuncionario SET nome_func = ?, tel_func = ?, cpf_func = ?, dt_nascimento = ?, id_cargo= ? WHERE mat_funcionario = ? ;';

  db.query(cmd, [nome, telefone, cpf, nascimento, cargo, mat], function(erro, resultado) {
      if (erro) {
          return res.status(500).send('Erro ao modificar o funcionário');
      }

      res.redirect(303, '/funcionario/listar');
    
  });
});

module.exports = router;

/* */ 

