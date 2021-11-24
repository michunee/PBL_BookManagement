const Dicer = require('dicer');
var db = require('./database'); //nhúng model database vào đế kết nối db
var itemCat=[]; // biến để chứa dữ liệu đổ về cho controller
var data=[];
var dataListPro=[];

exports.list = async () => {
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM catalog";
        db.query(sql, (err,d) => {
            if (err) console.log(err);
            else
            {
                data = d;
                hamOK(data);
            } 
        })
    })     
}
exports.detailCategory = async (idCat) => {
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM catalog WHERE idCat = " + idCat;
        db.query(sql, (err, d) => {
            if(err) console.log(err);
            else
            {
                data = d[0];
                hamOK(data);
            }
        })
    })
}
exports.create = function( nameCategory, number)
{
    let data = {
        nameCat: nameCategory,
        number : number
    };
    let sql = 'INSERT INTO catalog SET ?';
    let query = db.query(sql, data, (err, result) =>{
        console.log('Create success');
    });
}

exports.update = function(ID, NameCategory, number)
{
    let sql = "UPDATE catalog SET nameCat ='" + NameCategory + "', number='" + number + "' WHERE idCat= '" + ID + "'";
    // let sql = `UPDATE products SET 
    // NameCategory='${NameCategory}', 
    // number='${number}', 
    // WHERE ID=${ID}`;
    let query = db.query(sql,(err, result) => {
        console.log('Update success');
    });
}

exports.updateNumber = async (idCat, idCatEdit, beforeNumber, afterNumber, check) =>
{
    let dataCat = await exports.detailCategory(idCat);
    let n = 0;
    console.log(beforeNumber);
    if(idCatEdit != 0)
    {
        let dataCatEdit = await exports.detailCategory(idCatEdit);
        n = dataCatEdit.number;
    }
    if(check == "add")
    {
        NumberPro = new Number(dataCat.number) + new Number(afterNumber);
    }
    if(check == "delete")
    {
        NumberPro = new Number(dataCat.number) - new Number(beforeNumber);
    }
    if(check == "edit") 
    {
        if(idCat != idCatEdit)
        {
            NumberPro = new Number(dataCat.number) - new Number(beforeNumber);
            after = new Number(n) + new Number(afterNumber);
            let sqlEdit = "UPDATE catalog set number =  " + after + " WHERE idCat = " + idCatEdit;
            db.query(sqlEdit, (err, result) => {
                console.log("OK");
            });
        }
        else NumberPro = new Number(dataCat.number) - new Number(beforeNumber) + new Number(afterNumber);
    }
    if(NumberPro < 0) NumberPro = 0;
    let sql = "UPDATE catalog SET number = " + NumberPro + " WHERE idCat = " + idCat;
    db.query(sql, (err, resrult) => {
        console.log("UPDATE number success");
    })
}
exports.delete = function(ID)
{
    let sql = " DELETE FROM catalog WHERE idCat = '" + ID + "'";
    let query = db.query(sql, (err, result) => {
        console.log("Delete success");
    });
}

exports.listByName = async (nameCat) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM catalog WHERE nameCat='${nameCat}'`;
        db.query(sql, (err, result) => {
            if(err) console.log(err);
            else
            {
                console.log('Get idCat by nameCat success');
                itemCat = result[0].idCat;
            }
        })
        let sql2 = `SELECT * FROM product WHERE idCat=${itemCat}`;
        db.query(sql2, (err, result) => {
            if(err) console.log(err);
            else
            {
                console.log('Get list product by id Cat success');
                dataListPro = result;
                hamOK(dataListPro);
            }
        })
    })
}