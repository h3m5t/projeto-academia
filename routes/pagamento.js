var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* aqui será destinado para realizar os pagamentos dos clientes */
router.get('/add',function(req,res){
    res.render('funcionario-add',{resultado:{}});
 })
 
 router.post('/add', function(req, res) {
   
 
   let cmd = 'INSERT INTO tbfuncionario (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES ( ?, ?, ?, ?, ?);';
 
   db.query(cmd, [nome, cpf, telefone, nascimento, cargo], function(erro, resultado) {
       if (erro) {
           return res.status(500).send('Erro ao adicionar funcionário');
       }
 
       res.status(200).send('Funcionário cadastrado com sucesso!');
       res.render('funcionario-lista');
   });
 });

/* rota p/ listar pagamentos */ 
router.get('/listar',function(req,res){
    let cmd = 'SELECT DATE_FORMAT(dt_pagamento,"%d/%m/%Y") AS dt_pag, id_cliente AS mat, id_pagamento AS pagamento FROM tbregistropagamento;'

    db.query(cmd, [], function(erro, listagem){
      if(erro){
        res.send(erro);
      }
      res.json(listagem)
    });
  });





module.exports = router;