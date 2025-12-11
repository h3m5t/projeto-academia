var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* 1. LISTAR PAGANTES (Para a tabela principal) 
   Retorna apenas os clientes para preencher a lista inicial */
router.get('/pagantes', function(req, res) {
    let cmd = 'SELECT id_cliente AS id, nome_cliente AS nome FROM tbcliente';
    
    db.query(cmd, [], function(erro, listagem) {
        if (erro) {
            return res.status(500).json({ erro: erro.sqlMessage });
        }
        res.json(listagem);
    });
});

/* 2. HISTÓRICO ATUALIZADO (Agora traz o plano) */
router.get('/historico/:id_cliente', function(req, res) {
    let id = req.params.id_cliente;
    
    let cmd = `
        SELECT 
            p.id_pagamento,
            p.valor_pagamento AS valor,
            p.tipo_pagamento AS forma,
            p.status_pagamento AS plano, /* <--- ADICIONEI ISSO AQUI */
            DATE_FORMAT(r.dt_pagamento, '%d/%m/%Y') AS data
        FROM tbplanopagamento AS p
        INNER JOIN tbregistropagamento AS r ON p.id_pagamento = r.id_pagamento
        WHERE p.id_cliente = ?
        ORDER BY r.dt_pagamento DESC;
    `;

    db.query(cmd, [id], function(erro, listagem) {
        if (erro) return res.status(500).json({ erro: erro.sqlMessage });
        res.json(listagem);
    });
});


/* 3. ADICIONAR PAGAMENTO ATUALIZADO */
router.post('/add', function(req, res) {
    // Agora recebemos também o 'plano'
    let { id_cliente, valor, data, forma, plano } = req.body;

    let dataFormatada = data ? new Date(data).toISOString().split('T')[0] : null;

    // Colocamos o 'plano' na coluna status_pagamento e 'forma' na tipo_pagamento
    let cmd1 = 'INSERT INTO tbplanopagamento (valor_pagamento, status_pagamento, tipo_pagamento, id_cliente) VALUES (?, ?, ?, ?);';

    // Parâmetros: valor, plano (Mensal/Anual), forma (Pix/Dinheiro), id_cliente
    db.query(cmd1, [valor, plano, forma, id_cliente], function(erro, resultado) {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao inserir plano." });
        }

        let id_pagamento = resultado.insertId;

        let cmd2 = 'INSERT INTO tbregistropagamento (dt_pagamento, id_pagamento, id_cliente) VALUES (?, ?, ?);';

        db.query(cmd2, [dataFormatada, id_pagamento, id_cliente], function(erro2) {
            if (erro2) {
                return res.status(500).json({ erro: "Erro ao registrar data." });
            }
            res.json({ mensagem: "Pagamento registrado com sucesso!" });
        });
    });
});

module.exports = router;