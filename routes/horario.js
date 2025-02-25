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




module.exports = router;