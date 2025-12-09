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
<<<<<<< HEAD
        // O Angular recebe os dados aqui
        res.json(listagem);
=======
       res.json(listagem);
>>>>>>> a0252d654a34bd39721addb986b81ec31d54ad3e
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
<<<<<<< HEAD
        res.json({ mensagem: "Salvo com sucesso!" });
=======
       res.json({ mensagem: "Salvo com sucesso!" });
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
        res.json({ sucesso: true });
>>>>>>> a0252d654a34bd39721addb986b81ec31d54ad3e
    });
});

/* 3. EDITAR (Recebe JSON e devolve JSON) */
router.put('/editar/:id', function (req, res) {
    let id = req.params.id;
    let { nome, telefone, nascimento, cpf } = req.body;

    let cmd = 'UPDATE tbcliente SET nome_cliente = ?, tel_cliente = ?, cpf_cliente = ?, dt_nascimento = ? WHERE id_cliente = ? ;';

    db.query(cmd, [nome, telefone, cpf, nascimento, id], function (erro, resultado) {
        if (erro) {
<<<<<<< HEAD
            return res.status(500).json({ erro: 'Erro ao editar' });
=======
            return res.status(500).send('Erro ao modificar o cliente');
        }

      res.json({ sucesso: true });


    });
});



/* Rota para excluir Clientes */
router.delete('/apagar/:mat', function (req, res) {
    let mat = req.params.mat;
    let cmd = "DELETE FROM tbcliente WHERE id_cliente = ?;";
    db.query(cmd, [mat], function (erro, listagem) {
        if (erro) {
          return  res.send(erro);
>>>>>>> a0252d654a34bd39721addb986b81ec31d54ad3e
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