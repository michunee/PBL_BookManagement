var db = require('./database'); //nhúng model database vào đế kết nối db

exports.list = async()=>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM user";
        db.query(sql, (err, d) => {
            if (err) console.log(err);
            else
            {
                list = d;
                hamOK(list);
            }
        })
    })
}

exports.checkEmail = (email) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM user WHERE email = '${email}'`;
        db.query(sql, (err, d) => {
            console.log('List success');
            data = d[0];
            hamOK(data);
        })
        }
    )
}

exports.checkPassword = (password) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM user WHERE password = '${password}'`;
        db.query(sql, (err, d) => {
            console.log('List success');
            data = d[0];
            hamOK(data);
        })
        }
    )
}

exports.listClient = async()=>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM user where role = 0";
        db.query(sql, (err, d) => {
            if (err) console.log(err);
            else
            {
                list = d;
                hamOK(list);
            }
        })
    })
}

exports.listAdmin = async()=>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM user where role = 1";
        db.query(sql, (err, d) => {
            if (err) console.log(err);
            else
            {
                list = d;
                hamOK(list);
            }
        })
    })
}

exports.DeleteUser = function(idUser)
{
    let sql = `DELETE FROM user WHERE idUser = '${idUser}'`;
    db.query(sql, (err, result) =>{
        console.log("Delete User success");
    })
}

