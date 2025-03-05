var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota para listar Clientes --> */
router.get('/listar', function (req, res) {
    let cmd = `
    SELECT 
        c.nome_cliente AS nome, 
        DATE_FORMAT(c.dt_nascimento, "%d/%m/%Y") AS aniversario, 
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

    db.query(cmd, [], function (erro, listagem) {
        if (erro) {
            console.error("Erro na consulta SQL:", erro.sqlMessage);
            return res.status(500).json({ erro: erro.sqlMessage });
        }
        res.render('cliente-lista', { resultado: listagem });
    });
});





/* Rota para add Clientes */
router.get('/add', function (req, res) {
    res.render('cliente-add', { resultado: {} });
});

router.post('/add', function (req, res) {
    let nome = req.body.nome;
    let telefone = req.body.tel;
    let nascimento = req.body.nascimento;
    let cpf = req.body.cpf;

    /* Corrigir formato da data de nascimento */
    let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

    let cmd = 'INSERT INTO tbcliente (nome_cliente, tel_cliente, dt_nascimento, cpf_cliente) VALUES (?, ?, ?, ?);';

    db.query(cmd, [nome, telefone, nascimentoFormatado, cpf], function (erro, resultados) {
        if (erro) {
            console.error("Erro ao adicionar cliente:", erro);
            return res.status(500).send("Erro ao adicionar cliente.");
        }
        res.redirect('/cliente/listar');
    });
});



/*Rota para saber se o cliente ta em dia ou nao */
// Rota GET para exibir os detalhes do cliente
router.get('/detalhes/:id', function (req, res) {
    let clienteId = req.params.id;  // Obtém o ID do cliente da URL

    // Consulta para obter os dados do cliente
    let cmdCliente = `
      SELECT 
        c.id_cliente, 
        c.nome_cliente
      FROM tbcliente c
      WHERE c.id_cliente = ?;
    `;
    
    // Consulta para obter os pagamentos do cliente
    let cmdPagamentos = `
      SELECT 
        p.valor_pagamento, 
        p.status_pagamento, 
        p.tipo_pagamento, 
        DATE_FORMAT(rp.dt_pagamento, '%d/%m/%Y') AS dt_pagamento_formatado
      FROM tbplanopagamento p
      LEFT JOIN tbregistropagamento rp ON p.id_cliente = rp.id_cliente
      WHERE p.id_cliente = ?
      ORDER BY rp.dt_pagamento DESC;
    `;
    
    // Obter dados do cliente
    db.query(cmdCliente, [clienteId], function (erro, resultadosCliente) {
        if (erro) {
            return res.render('erro', { mensagem: "Erro ao buscar os dados do cliente." });
        }
        
        // Obter pagamentos do cliente
        db.query(cmdPagamentos, [clienteId], function (erro, resultadosPagamentos) {
            if (erro) {
                return res.render('erro', { mensagem: "Erro ao buscar os pagamentos do cliente." });
            }
            
            // Renderizar a página com os resultados
            res.render('cliente-pagamento', { 
                cliente: resultadosCliente[0], 
                pagamentos: resultadosPagamentos 
            });
        });
    });
});




/* Rota para editar Clientes */
router.get('/editar/:id', function (req, res) {
    let id = req.params.id;

    let cmd = 'SELECT id_cliente AS Inscrição, nome_cliente AS Nome, tel_cliente AS contato,'
    cmd += 'DATE_FORMAT(dt_nascimento,"%Y-%m-%d") AS Aniversario, cpf_cliente AS Cpf '
    cmd += 'FROM tbcliente WHERE id_cliente = ?;'
    db.query(cmd, [id], function (erro, listagem) {
        if (erro) {
            res.send(erro);
        }
        res.render('cliente-add', { resultado: listagem[0] });
    });
});

router.put('/editar/:id', function (req, res) {
    let id = req.params.id
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let telefone = req.body.telefone;
    let nascimento = req.body.nascimento;


    let cmd = 'UPDATE tbcliente SET nome_cliente = ?, tel_cliente = ?, cpf_cliente = ?, dt_nascimento = ? WHERE id_cliente = ? ;';

    db.query(cmd, [nome, telefone, cpf, nascimento, id], function (erro, resultado) {
        if (erro) {
            return res.status(500).send('Erro ao modificar o cliente');
        }

        res.redirect(303, '/funcionario/listar');


    });
});




/* Rota para excluir Clientes */
router.delete('/apagar/:mat', function (req, res) {
    let mat = req.params.mat;
    let cmd = "DELETE FROM tbcliente WHERE id_cliente = ?;";
    db.query(cmd, [mat], function (erro, listagem) {
        if (erro) {
            res.send(erro);
        }
        res.json({ sucesso: true });
    });
});


module.exports = router;



/* Consulta para ver interseção entre tbplano e tbcliente

 select nome_cliente as Cliente from tbcliente as c inner join tbplanotreino as p ON c.id_cliente = p.id_cliente;

*/ 