var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* rota p/ listar pagamentos */ 
router.get('/listar',function(req,res){
  let cmd = 'SELECT id_cliente AS Inscrição, valor_pagamento AS Valor, tipo_pagamento AS Tipo, id_pagamento as Pagamento FROM tbplanopagamento;'

  db.query(cmd, [], function(erro, listagem){
    if(erro){
      res.send(erro);
    }
    res.render('pagamento-lista',{resultado: listagem})
  });
});



/* aqui será destinado para realizar os pagamentos dos clientes */
router.get('/add',function(req,res){
  res.render('pagamento-lista', { resultado: {} });
})

router.post('/add', function(req,res){
let data = req.body.data
let valor = req.body.valor
let cliente = req.body.cliente
let plano = req.body.plano

let dataFormatada = data ? new Date(data).toISOString().split('T')[0] : null;

let cmd = 'INSERT INTO tbregsitropagamento (nome_func, tel_func, cpf_func, dt_nascimento, id_cargo) VALUES (?, ?, ?, ?, ?);';




})




module.exports = router;