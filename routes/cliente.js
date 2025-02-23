var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota para listar Clientes --> */
router.get('/listar', function(req, res) {
    let cmd = `
    SELECT 
        c.nome_cliente AS nome, 
        DATE_FORMAT(c.dt_nascimento, "%Y-%m-%d") AS aniversario, 
        c.cpf_cliente AS cpf, 
        c.tel_cliente AS Contato, 
        c.id_cliente AS Inscrição,
        CASE 
            WHEN p.id_cliente IS NOT NULL THEN 'Possui treino cadastrado'
            ELSE 'Não possui treino cadastrado'
        END AS status_treino
    FROM tbcliente AS c
    LEFT JOIN tbplanotreino AS p ON c.id_cliente = p.id_cliente;
`;

    db.query(cmd, [], function(erro, listagem) {
        if (erro) {
            console.error("Erro na consulta SQL:", erro.sqlMessage);
            return res.status(500).json({ erro: erro.sqlMessage });
        } 
        res.render('cliente-lista',{ resultado: listagem });
    });
});

/* Rota para add Clientes */
router.get('/add', function(req, res) {
    res.render('cliente-add', { resultado: {} });
  });
  
  router.post('/add', function(req, res) {
    let nome = req.body.nome;
    let telefone = req.body.tel;
    let nascimento = req.body.nascimento;
    let cpf = req.body.cpf;
  
    /* Corrigir formato da data de nascimento */
    let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;
  
    let cmd = 'INSERT INTO tbcliente (nome_cliente, tel_cliente, dt_nascimento, cpf_cliente) VALUES (?, ?, ?, ?);';
  
    db.query(cmd, [nome, telefone, nascimentoFormatado, cpf], function(erro, resultados) {
        if (erro) {
            console.error("Erro ao adicionar cliente:", erro);
            return res.status(500).send("Erro ao adicionar cliente.");
        }
        res.redirect('/cliente/listar');
    });
  });
  
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
router.get('/editar/:id', function(req,res){
    let id = req.params.id; 

    let cmd = 'SELECT id_cliente AS Inscrição, nome_cliente AS Nome, tel_cliente AS contato,'
    cmd +=     'DATE_FORMAT(dt_nascimento,"%Y-%m-%d") AS Aniversario, cpf_cliente AS Cpf '
    cmd +=     'FROM tbcliente WHERE id_cliente = ?;'
    db.query(cmd, [id], function(erro, listagem){
      if(erro){
        res.send(erro);
      }
      res.render('cliente-add', {resultado: listagem[0]});
    });
}); 

router.put('/editar/:id', function(req,res){
    
})

/* Rota para excluir Clientes */
router.delete('/apagar/:mat', function(req,res){
    let mat = req.params.mat;
    let cmd = "DELETE FROM tbcliente WHERE id_cliente = ?;";
    db.query(cmd,[mat],function(erro,listagem){
        if(erro){
            res.send(erro);
        }
        res.redirect(303,'/cliente/listar');
    });
});


module.exports = router;



/* Consulta para ver interseção entre tbplano e tbcliente

 select nome_cliente as Cliente from tbcliente as c inner join tbplanotreino as p ON c.id_cliente = p.id_cliente;

*/ 