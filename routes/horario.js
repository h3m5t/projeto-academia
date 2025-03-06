var express = require('express');
var router = express.Router();
let db = require('../utils/db');



/* Rota para listar horários */
router.get('/listar', function(req, res) {
  let cmdSelect = `
      SELECT h.horario_inicio, h.horario_fim, h.dia_semana, f.nome_func AS nome
      FROM tbhorariofuncionario h
      JOIN tbfuncionario f ON h.mat_funcionario = f.mat_funcionario
  `;

  // Tente executar a consulta e capture possíveis erros
  try {
      db.query(cmdSelect, function(erro, resultados) {
          if (erro) {
              console.error("Erro ao buscar horários:", erro);
              // Retorna erro 500 com mais detalhes no corpo da resposta
              return res.status(500).json({ error: 'Erro ao buscar os horários', detalhes: erro });
          }

          // Se a consulta foi bem-sucedida, logamos os resultados
          console.log("Resultados encontrados:", resultados);

          // Agrupar os horários por nome de funcionário
          const horariosAgrupados = resultados.reduce((acc, horario) => {
              if (!acc[horario.nome]) {
                  acc[horario.nome] = [];  // Cria um novo grupo para o funcionário
              }
              acc[horario.nome].push(horario);  // Adiciona o horário ao grupo correspondente
              return acc;
          }, {});

          console.log("Horários agrupados:", horariosAgrupados);

          // Passa os dados agrupados para a view
          console.log("Horários na view:", horariosAgrupados);
          res.render('horario-lista', { horariosAgrupados });
      });
  } catch (erro) {
      // Caso ocorra algum erro inesperado, ele será capturado aqui
      console.error("Erro inesperado:", erro);
      return res.status(500).json({ error: 'Erro inesperado', detalhes: erro });
  }
});



  /* Rota para add funcionario a um horario*/
router.get('/add', function(req, res) {
    res.render('horario-add');
});


router.post('/add', function (req, res) {
  let inicio = req.body.inicio;
  let fim = req.body.fim;
  let dia = req.body.dia;
  let mat = req.body.mat;

  console.log("Dados recebidos:", req.body); // Depuração

  let cmdInsert = 'INSERT INTO tbhorariofuncionario (horario_inicio, horario_fim, dia_semana, mat_funcionario) VALUES (?,?,?,?)';
  
  db.query(cmdInsert, [inicio, fim, dia, mat], function (erro, resultados) {
      if (erro) {
          console.error("Erro ao adicionar horário:", erro);
          return res.status(500).json({ error: 'Erro ao adicionar horário' });
      }

      console.log("Inserção bem-sucedida:", resultados);

      // Redireciona para a listagem de horários após inserir um novo
      res.redirect('/horarios/listar');
  });
});



 /* Rota para Excluir*/
 router.delete('/apagar/:mat/:inicio/:fim/:dia', function(req, res) {
  // Acessando os parâmetros passados na URL
  let mat = req.params.mat;
  let inicio = req.params.inicio;
  let fim = req.params.fim;
  let dia = req.params.dia;

  // Comando SQL para excluir
  let cmd = "DELETE FROM tbhorariofuncionario WHERE mat_funcionario = ? AND horario_inicio = ? AND horario_fim = ? AND dia_semana = ?;";

  db.query(cmd, [mat, inicio, fim, dia], function(erro, resultado) {
      if (erro) {
          console.error("Erro ao apagar horário:", erro.sqlMessage);
          return res.status(500).json({ erro: "Erro ao apagar horário." });
      }
      // Redireciona de volta para a lista de horários após exclusão
      res.redirect('/horarios/listar');
  });
});







module.exports = router;