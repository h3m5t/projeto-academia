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

  db.query(cmdSelect, function(erro, resultados) {
      if (erro) {
          console.error("Erro ao buscar horários:", erro);
          return res.status(500).json({ error: 'Erro ao buscar os horários' });
      }

      console.log("Resultados encontrados:", resultados);  // Depuração adicional

      // Agrupar os horários por nome de funcionário
      const horariosAgrupados = resultados.reduce((acc, horario) => {
          if (!acc[horario.nome]) {
              acc[horario.nome] = [];  // Cria um novo grupo de horários para o funcionário
          }
          acc[horario.nome].push(horario);  // Adiciona o horário ao grupo correspondente
          return acc;
      }, {});

      console.log("Horários agrupados:", horariosAgrupados);  // Adicionando log para depuração dos dados agrupados

      // Envia os horários agrupados para a view
      res.render('horario-lista', { horariosAgrupados: horariosAgrupados });
  });
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

  // Inserindo os dados na tabela
  let cmdInsert = 'INSERT INTO tbhorariofuncionario (horario_inicio, horario_fim, dia_semana, mat_funcionario) VALUES (?,?,?,?)';
  
  db.query(cmdInsert, [inicio, fim, dia, mat], function (erro, resultados) {
      if (erro) {
          console.error("Erro ao adicionar horário:", erro);
          return res.status(500).json({ error: 'Erro ao adicionar horário' });
      }

      console.log("Inserção bem-sucedida:", resultados);

      // Pegamos o nome do funcionário
      let cmdSelectFuncionario = 'SELECT nome_func AS nome FROM tbfuncionario WHERE mat_funcionario = ?';

      db.query(cmdSelectFuncionario, [mat], function (erroFuncionario, resultadoFuncionario) {
          if (erroFuncionario) {
              console.error("Erro ao buscar nome do funcionário:", erroFuncionario);
              return res.status(500).json({ error: 'Erro ao buscar nome do funcionário' });
          }

          if (resultadoFuncionario.length === 0) {
              return res.status(404).json({ error: 'Funcionário não encontrado' });
          }

          let nomeFuncionario = resultadoFuncionario[0].nome;
          console.log("Funcionário encontrado:", nomeFuncionario);

          // **Renderiza diretamente a página de listagem de horários enviando o nome do funcionário**
          res.render('horario-lista');
      });
  });
});








  





  
  
  




  /* Rota para excluir funcionario de um intervalo de horario*/


module.exports = router;