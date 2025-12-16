const mysql = require('mysql');
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
port: 3306,
database: 'dbacademiaaa',
multipleStatements: true
});
db.connect(function(erro) {
if (erro){
throw erro;
}
console.log('Show');
});
global.db = db;


module.exports = db;