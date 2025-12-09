var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* 1. LISTAR (Retorna JSON com nomes sem acento) */
router.get('/listar', function (req, res) {
    let cmd = `
    SELECT 
        c.nome_cliente AS nome, 
        DATE_FORMAT(c.dt_nascimento, "%d/%m/%Y") AS aniversario, 
        c.cpf_cliente AS cpf, 
        c.tel_cliente AS telefone,  /* Mudado de Contato para telefone */
        c.id_cliente AS id          /* Mudado de Inscrição para id */
    FROM tbcliente AS c;
    `; 

    db.query(cmd, [], function (erro, listagem) {
        if (erro) {
            return res.status(500).json({ erro: erro.sqlMessage });
        }
        // O Angular recebe os dados aqui
        res.json(listagem);
    });
});

/* 2. ADICIONAR (Recebe JSON e devolve JSON) */
router.post('/add', function (req, res) {
    // O Angular envia { nome, telefone, cpf, nascimento }
    let { nome, telefone, nascimento, cpf } = req.body;

    let nascimentoFormatado = nascimento ? new Date(nascimento).toISOString().split('T')[0] : null;

    let cmd = 'INSERT INTO tbcliente (nome_cliente, tel_cliente, dt_nascimento, cpf_cliente) VALUES (?, ?, ?, ?);';

    db.query(cmd, [nome, telefone, nascimentoFormatado, cpf], function (erro, resultados) {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao adicionar." });
        }
        res.json({ mensagem: "Salvo com sucesso!" });
    });
});

/* 3. EDITAR (Recebe JSON e devolve JSON) */
router.put('/editar/:id', function (req, res) {
    let id = req.params.id;
    let { nome, telefone, nascimento, cpf } = req.body;

    let cmd = 'UPDATE tbcliente SET nome_cliente = ?, tel_cliente = ?, cpf_cliente = ?, dt_nascimento = ? WHERE id_cliente = ? ;';

    db.query(cmd, [nome, telefone, cpf, nascimento, id], function (erro, resultado) {
        if (erro) {
            return res.status(500).json({ erro: 'Erro ao editar' });
        }
        res.json({ sucesso: true });
    });
});

/* 4. EXCLUIR (Já estava correto, mantivemos JSON) */
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