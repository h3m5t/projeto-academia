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
        c.id_cliente AS Inscrição
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








/* Rota para editar Clientes */
router.get('/editar/:id', function (req, res) {
    let id = req.params.id;

    let cmd = 'SELECT id_cliente AS Inscrição, nome_cliente AS Nome, tel_cliente AS contato,'
    cmd += 'DATE_FORMAT(dt_nascimento,"%Y-%m-%d") AS Aniversario, cpf_cliente AS Cpf '
    cmd += 'FROM tbcliente WHERE id_cliente = ?;'
    db.query(cmd, [id], function (erro, listagem) {
        if (erro) {
           return res.send(erro);
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
          return  res.send(erro);
        }
        res.json({ sucesso: true });
    });
});


module.exports = router;



