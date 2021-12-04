const db = require('./database');
let data =[];

exports.list = async(idCart) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT cart.idCart, product.idProduct, nameProduct, priceProduct, quantity, imgProduct FROM cart INNER JOIN product ON cart.idProduct = product.idProduct WHERE idCart = " + idCart ;
        let query = db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else 
            {
                data = result;
                hamOK(data);
            }
        });
    });
}

exports.checkBill = async(idUser) =>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM bill WHERE idUser = " + idUser + " AND status = 0";
        let query = db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else 
            {
                data= result[0];
                hamOK(data);
            }
        });
    }) 
}

exports.InsertCart = async(idUser, idProduct, quantity, priceProduct)  =>{
    priceProduct = new Number(priceProduct);
    quantity = new Number(quantity);
    let price = priceProduct * quantity;
    let checkBill = await exports.checkBill(idUser);
    let totalProduct = 0;
    let idBill = 0;
    let idCart = 0;
    let ship = 35000;
    if(checkBill != null)
    {
        idCart = checkBill.idCart;
        totalProduct = new Number(checkBill.totalProduct) + price;
        idBill = checkBill.idBill;
        let product = await exports.checkProduct(idCart, idProduct);
        let sql = "";
        if(product != null)
        {
            sql = "UPDATE cart SET quantity = " + quantity + ", price = " + price + " WHERE idCart = " + idCart + " AND idProduct = " + idProduct;
        }
        else
        {
            sql = "INSERT INTO cart (idCart, idProduct, quantity, price) VALUES ( " + idCart + " , " + idProduct + ", " + quantity + ", " + price + ")";
        }
        console.log(sql);
        db.query(sql, (err, result) =>{console.log("Insert Cart success");})
    }
    else
    {
        totalProduct = price;
        let sqlBill = "INSERT INTO bill ( idUser) VALUES ( " + idUser + ")";
        db.query(sqlBill, (err, result) => {
            console.log("Insert Bill success");
        })
        let Bill = await exports.checkBill(idUser);
        idBill = Bill.idBill;
        idCart = idBill;
        let dataCart = {
            idCart: idBill,
            idProduct : idProduct,
            quantity : quantity,
            price : price
        };
        let sqlCart = "INSERT INTO cart SET ?";
        db.query(sqlCart, dataCart, (err, result) =>{
            console.log("Insert Cart success");
        });
    }
    total = totalProduct + new Number(ship);
    let sqlUpdateBill = "UPDATE Bill SET idCart = " + idCart + " , totalProduct = " + totalProduct + " , total = " + total + " WHERE idBill = " + idBill;
    db.query(sqlUpdateBill, (err, result) =>{
        console.log("Update Bill success");
    })
}

exports.checkProduct = async(idCart, idProduct) =>{
    return new Promise((hamOK, hamloi)=>{
        let sql = "SELECT * FROM cart WHERE idCart = " + idCart + " AND idProduct = " + idProduct;
        let query = db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else
            {
                data = result[0];
                hamOK(data);
            }
        })
    })
}
exports.getProduct = async(idProduct) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM product WHERE idProduct = " + idProduct;
        let query = db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else
            {
                data = result[0];
                hamOK(data);
            }
        })
    })
}
exports.getCart = async(idCart, idProduct) =>{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM cart WHERE idCart = " + idCart + " AND idProduct = " + idProduct;
        let query = db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else
            {
                data = result[0];
                hamOK(data);
            }
        })
    })
}
exports.UpdateCart = async function(idCart, idProduct, quantity)
{
    let Product = await exports.getProduct(idProduct);
    let priceProduct = Product.priceProduct;
    let price = (new Number(priceProduct))*(new Number(quantity));
    let sql = "UPDATE cart SET quantity = " + quantity + ", price = " + price + " WHERE idCart = " + idCart + " AND idProduct = " + idProduct; 
    db.query(sql, (err, result) =>{
        if(err) console.log(err);
        else {console.log("Insert Cart success");}
    })
}

exports.UpdateBill = function(idBill, discount, totalProduct, total, status)
{
    let sql = "UPDATE Bill SET discount = " + discount + " , totalProduct = " + totalProduct + " , total = " + total + ", status = " + status + " WHERE idBill = " + idBill;
    db.query(sql, (err, result) =>{
        if(err) console.log(err);
        else
        {
            console.log("Update Bill success");
        }
    })
}

exports.DeleteProdcut = function(idCart, idProduct)
{
    let sql = "DELETE FROM cart WHERE idCart = " + idCart + " AND idProduct = " + idProduct;
    db.query(sql, (err, result) =>{
        console.log("Delete Product success");
    })
}
exports.BillCompletedByIDUser = async function(idUser)
{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM bill WHERE idUser = " + idUser + " AND status = 1";
        db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else 
            {
                data = result;
                console.log(data);
                hamOK(data);
            }
        })
    })
}
exports.GetBillByIDBill = async function(idBill)
{
    return new Promise((hamOK, hamloi) =>{
        let sql = "SELECT * FROM bill WHERE idBill = " + idBill;
        db.query(sql, (err, result) =>{
            if(err) console.log(err);
            else 
            {
                data = result[0];
                hamOK(data);
            }
        })
    })
}