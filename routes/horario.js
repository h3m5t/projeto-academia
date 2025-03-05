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


  /* Rota para add funcionario a um horario*/
  

router.get('/add',function(req,res){
  res.render('horario-add')
})



router.post('/add',function(req,res){
  let inicio = req.body.inicio
  let fim = req.body.fim
  let dia = req.body.dia
  let mat = req.body.mat


  let cmd = '  INSERT INTO tbhorariofuncionario (horario_inicio, horario_fim, dia_semana, mat_funcionario) VALUES (?,?,?,?);'

  db.query(cmd,[inicio,fim,dia,mat],function()
})





  





  
  
  




  /* Rota para excluir funcionario de um intervalo de horario*/


module.exports = router;