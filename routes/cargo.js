var express = require('express');
var router = express.Router();
let db = require('../utils/db');




router.get('/listar', function(req, res) {
  let cmd = 'SELECT id_cargo, nome_cargo FROM tbcargo;';
  
  db.query(cmd, [], function(erro, resultados) { 
    if (erro) {
      return res.send(erro);
    }
    res.json({resultado:resultados}); 
  });
});


module.exports = router;