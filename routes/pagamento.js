var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* rota p/ listar pagamentos */ 
router.get('/listar',function(req,res){
  let cmd = `SELECT 
  c.nome_cliente AS Cliente, 
  p.id_cliente AS Inscrição, 
  p.valor_pagamento AS Valor, 
  p.tipo_pagamento AS Tipo, 
  p.id_pagamento AS Pagamento,
   DATE_FORMAT(r.dt_pagamento, '%d/%m/%Y') AS Dt_pag
FROM tbcliente AS c
INNER JOIN tbplanopagamento AS p 
ON c.id_cliente = p.id_cliente
INNER JOIN tbregistropagamento AS r 
ON r.id_pagamento = p.id_pagamento;`;




  db.query(cmd, [], function(erro, listagem){
    if(erro){
      res.send(erro);
    }
    res.render('pagamento-lista',{resultado: listagem})
  });
});


/* aqui será destinado para realizar os pagamentos dos clientes */
router.get('/add', function(req, res) {
  res.render('pagamento-add', { resultado: [] }); 
});

router.post('/add', function(req, res) {
  let data = req.body.data;
  let valor = req.body.valor;
  let cliente = req.body.cliente;
  let plano = req.body.plano;

  let dataFormatada = data ? new Date(data).toISOString().split('T')[0] : null;

  //  inserimos os dados na tabela tbplanopagamento
  let cmd1 = 'INSERT INTO tbplanopagamento (valor_pagamento, status_pagamento, tipo_pagamento, id_cliente) VALUES (?, "pago", ?, ?);';

  db.query(cmd1, [valor, plano, cliente], function(erro, resultado) {
      if (erro) {
          console.error("Erro ao adicionar pagamento:", erro);
          return res.status(500).send("Erro ao adicionar pagamento.");
      }

      // Pegamos o ID do pagamento inserido
      let id_pagamento = resultado.insertId;

      // inserimos os dados na tabela tbregistropagamento
      let cmd2 = 'INSERT INTO tbregistropagamento (dt_pagamento, id_pagamento, id_cliente) VALUES (?, ?, ?);';

      db.query(cmd2, [dataFormatada, id_pagamento, cliente], function(erro2) {
          if (erro2) {
              console.error("Erro ao registrar pagamento:", erro2);
              return res.status(500).send("Erro ao registrar pagamento.");
          }

          let cmd3 = 'SELECT nome_cliente FROM tbcliente WHERE id_cliente = ?';
          db.query(cmd3,[cliente], function(erro3,resultado3){
            if(erro3){
              return res.status(500).send('erro ao buscar nome de cliente')
            }
            res.redirect(`/pagamento/listar`);

      });
  });
});
});

module.exports = router;