var express = require('express');
var router = express.Router();
let db = require('../utils/db');


/* Rota para listar horarios */
router.get('/listar', function(req, res) {
    let cmd = 'SELECT * FROM tbhorariofuncionario;';
    
    db.query(cmd, [], function(erro, resultados) { 
      if (erro) {
        return res.send(erro);
      }
      res.render('horario-lista',{resultado:resultados}); 
    });
  });


  /* Rota para add funcionario a um horario
  
  INSERT INTO tbhorariofuncionario (horario_inicio, horario_fim, dia_semana, mat_funcionario) VALUES ('05:00', '08:00', 'Segunda', 1);*/



  /* Rota para excluir funcionario de um intervalo de horario*/


module.exports = router;