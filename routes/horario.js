var express = require('express');
var router = express.Router();
let db = require('../utils/db');

/* 1. LISTAR HORÁRIOS (Agrupados por Funcionário) */
router.get('/listar', function(req, res) {
    let cmdSelect = `
        SELECT h.horario_inicio, h.horario_fim, h.dia_semana, f.nome_func AS nome
        FROM tbhorariofuncionario h
        JOIN tbfuncionario f ON h.mat_funcionario = f.mat_funcionario
        ORDER BY f.nome_func, h.dia_semana;
    `;

    db.query(cmdSelect, function(erro, resultados) {
        if (erro) {
            return res.status(500).json({ error: erro.sqlMessage });
        }

        // Lógica de Agrupamento (Transforma lista chata em lista hierárquica)
        const agrupado = resultados.reduce((acc, curr) => {
            const nome = curr.nome;
            if (!acc[nome]) {
                acc[nome] = [];
            }
            acc[nome].push({
                dia: curr.dia_semana,
                inicio: curr.horario_inicio,
                fim: curr.horario_fim
            });
            return acc;
        }, {});

        // Converte Objeto em Array para o Angular ler fácil: 
        // De: { "Joao": [..], "Maria": [..] } 
        // Para: [ { nome: "Joao", turnos: [..] }, { nome: "Maria", turnos: [..] } ]
        const respostaFinal = Object.keys(agrupado).map(key => ({
            nome: key,
            turnos: agrupado[key]
        }));

        res.json(respostaFinal);
    });
});

/* 2. LISTAR FUNCIONÁRIOS (Para o Dropdown de Cadastro) */
router.get('/funcionarios', function(req, res) {
    db.query('SELECT mat_funcionario, nome_func FROM tbfuncionario', function(erro, result) {
        if (erro) return res.status(500).json({ error: erro });
        res.json(result);
    });
});

/* 3. ADICIONAR HORÁRIO */
router.post('/add', function (req, res) {
    let { inicio, fim, dia, mat } = req.body;

    let cmdInsert = 'INSERT INTO tbhorariofuncionario (horario_inicio, horario_fim, dia_semana, mat_funcionario) VALUES (?,?,?,?)';
    
    db.query(cmdInsert, [inicio, fim, dia, mat], function (erro, resultados) {
        if (erro) {
            return res.status(500).json({ error: 'Erro ao adicionar horário' });
        }
        res.json({ mensagem: "Horário cadastrado com sucesso!" });
    });
});

module.exports = router;