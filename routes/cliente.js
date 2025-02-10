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
let Nome = req.body.nome_cliente;
let Cpf = req.body.cpf_cliente;
let Telefone = req.body.tel_cliente;
let Nascimento = req.body.dt_nascimento;
 

let cmd = 'INSERT INTO tbcliente  (nome_cliente, tel_cliente,dt_nascimento,cpf_cliente) VALUES (?, ?, ?, ?);';

  db.query(cmd,[Nome,Cpf,Telefone,Nascimento],function(erro, resultado) {
    if (erro) {
        console.error('Erro ao adicionar cliente:', erro);
        return res.status(500).send('Erro ao adicionar cliente');
    }

    res.status(200).send('Cliente cadastrado com sucesso!');
});
})


/* Rota para editar Clientes */


/* Rota para excluir Clientes */



module.exports = router;

