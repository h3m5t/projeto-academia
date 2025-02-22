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






module.exports = router;