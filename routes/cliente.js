var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* 1. LISTAR CLIENTES (JSON) */
router.get('/listar', function (req, res) {
    let cmd = `
    SELECT 
        c.nome_cliente AS nome, 
        DATE_FORMAT(c.dt_nascimento, "%d/%m/%Y") AS aniversario, 
        c.cpf_cliente AS cpf, 
        c.tel_cliente AS telefone, 
        c.id_cliente AS id
    FROM tbcliente AS c;
    `; 

    db.query(cmd, [], function (erro, listagem) {
        if (erro) {
            return res.status(500).json({ erro: erro.sqlMessage });
        }
        res.json(listagem);
    });
});

/* 2. ADICIONAR CLIENTE (JSON) */
router.post('/add', function (req, res) {
    let { nome, telefone, nascimento, cpf } = req.body;

    let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

    let cmd = 'INSERT INTO tbcliente (nome_cliente, tel_cliente, dt_nascimento, cpf_cliente) VALUES (?, ?, ?, ?);';

    db.query(cmd, [nome, telefone, nascimentoFormatado, cpf], function (erro, resultados) {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao adicionar cliente." });
        }
        res.json({ mensagem: "Salvo com sucesso!" });
    });
});

/* 3. EDITAR CLIENTE (JSON) */
router.put('/editar/:id', function (req, res) {
    let id = req.params.id;
    let { nome, telefone, nascimento, cpf } = req.body;

    let cmd = 'UPDATE tbcliente SET nome_cliente = ?, tel_cliente = ?, cpf_cliente = ?, dt_nascimento = ? WHERE id_cliente = ? ;';

    db.query(cmd, [nome, telefone, cpf, nascimento, id], function (erro, resultado) {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao modificar o cliente' });
        }
        res.json({ sucesso: true });
    });
});

/* 4. EXCLUIR CLIENTE (JSON) */
router.delete('/apagar/:mat', function (req, res) {
    let mat = req.params.mat;
    let cmd = "DELETE FROM tbcliente WHERE id_cliente = ?;";
    db.query(cmd, [mat], function (erro, listagem) {
        if (erro) {
            return res.status(500).json({ erro: erro.sqlMessage });
        }
        res.json({ sucesso: true });
    });
});

module.exports = router;