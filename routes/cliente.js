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




/* Rota para editar Clientes */


/* Rota para excluir Clientes */



module.exports = router;

