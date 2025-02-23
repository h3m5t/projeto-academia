var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota para listar Clientes --> add COMO SABER SE O CLIENTE POSSUI OU NAO PLANO DE TREINO????*/ 
router.get('/listar', function(req, res) {
    let cmd = 'SELECT nome_cliente AS nome, DATE_FORMAT(dt_nascimento,"%d/%m/%Y") AS aniversario, ';
    cmd += 'cpf_cliente AS cpf, tel_cliente AS Contato, id_cliente AS Inscrição ';
    cmd += 'FROM tbcliente;';

    db.query(cmd, [], function(erro, listagem) {
        if (erro) {
            console.error("Erro na consulta SQL:", erro.sqlMessage);
            return res.status(500).json({ erro: erro.sqlMessage });
        } 
        res.render('cliente-lista',{ resultado: listagem });
    });
});


/* Rota para add Clientes */
router.get('/add', function(req,res){
    res.render('cliente-add')
})

router.post('/add', function(req,res){
let Nome = req.body.nome;
let Telefone = req.body.tel;
let Nascimento = req.body.nascimento;
let Cpf = req.body.cpf;

  // Corrigir formato de nascimento
  let nascimentoFormatado = Nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

let cmd = 'INSERT INTO tbcliente  (nome_cliente, tel_cliente,dt_nascimento,cpf_cliente) VALUES (?, ?, ?, ?);';

  db.query(cmd,[Nome,Telefone,nascimentoFormatado,Cpf],function(erro, listagem) {
    if (erro) {
        res.render(erro)
    }

   res.render('cliente-lista',{resultado: listagem})
});
})

/*Rota para saber se o cliente ta em dia ou nao */

router.get("/detalhes/:id", async (req, res) => {
    try {
        const clienteId = req.params.id;
        const [cliente] = await db.execute(`
            SELECT 
                c.id_cliente, 
                c.nome_cliente, 
                c.tel_cliente, 
                c.cpf_cliente, 
                c.dt_nascimento, 
                p.valor_pagamento, 
                p.status_pagamento, 
                p.tipo_pagamento 
            FROM tbcliente c
            LEFT JOIN tbplanopagamento p ON c.id_cliente = p.id_cliente
            WHERE c.id_cliente = ?
            ORDER BY p.id_pagamento DESC LIMIT 1
        `, [clienteId]);

        if (cliente.length > 0) {
            res.json({
                ...cliente[0],
                status: cliente[0].status_pagamento === "pago" ? "Ativo" : "Inativo"
            });
        } else {
            res.status(404).json({ error: "Cliente não encontrado ou sem pagamentos registrados." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar detalhes do cliente." });
    }
});




/* Rota para editar Clientes */


/* Rota para excluir Clientes */



module.exports = router;

