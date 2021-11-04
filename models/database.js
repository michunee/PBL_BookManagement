var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dulieutiemsach'
})

db.connect(function (err) {
    console.log('Database is connected successfully!');
});

module.exports = db;