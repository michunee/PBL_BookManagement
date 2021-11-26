var db = require('./database'); //nhúng model database vào đế kết nối db
var list=[]; // biến để chứa dữ liệu đổ về cho controller
var dataName = [];

// định nghĩa các hàm để tương tác vào mysql
exports.list = async()=>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM product";
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

exports.listbyID = (idProduct) =>{
    return new Promise((hamOK, hamloi) => {
        let sql = "SELECT * FROM product WHERE idProduct = " + idProduct;
        db.query(sql, (err, d) => {
            console.log("List success");
            list = d;
            hamOK(list);
        })
    })
}

exports.detail = async (idProduct) => {

    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM product WHERE idProduct=${idProduct}`;
        db.query(sql, (err, d) => {
            console.log('List success');
            data = d[0];
            hamOK(data);
        })
        }
    )
}
exports.detailByName = (name) => {
    
    return new Promise( (hamOK, hamLoi) => {
            let filterProduct;
            let sql = `SELECT * FROM product`;
            let query = db.query(sql, (err, d) => {
                console.log('Detail success');
                dataName = d;
                for( i in dataName) {
                    let product = dataName[i];
                    let newName = replaceNameProduct(product.nameProduct.toLowerCase());
                    if(newName === name) {
                        filterProduct = product;
                    }
                }
                hamOK(filterProduct);
            })
            
        }
    )
}

exports.addBook = function(nameProduct, authorProduct, priceProduct, amountProduct, desProduct, imgProduct, idCat, showHide)
{
    let data = {
        nameProduct : nameProduct,
        authorProduct : authorProduct,
        amountProduct: amountProduct,
        imgProduct : imgProduct,
        priceProduct: priceProduct,
        desProduct: desProduct,
        idCat : idCat,
        showHide: showHide
    };
    let sql = "INSERT INTO product SET ?";
    let query = db.query(sql, data, (err, result) =>{
        console.log("Add book success");
    });
}

exports.editBook = function(idProduct, nameProduct, authorProduct, priceProduct, amountProduct, desProduct, imgProduct, idCat, showHide)
{
    let data = {
        nameProduct : nameProduct,
        authorProduct : authorProduct,
        amountProduct: amountProduct,
        imgProduct : imgProduct,
        priceProduct: priceProduct,
        desProduct: desProduct,
        idCat : idCat,
        showHide: showHide
    };
    let sql = "UPDATE product SET ? WHERE idProduct = " + idProduct;
    let query = db.query(sql, data, (err, result) =>{
        console.log("Update book success");
    });
}

exports.delete = function(idProduct)
{
    let sql = "DELETE FROM product WHERE idProduct = " + idProduct;
    let query = db.query(sql, (err, result) => {
        console.log('DELETE success');
    })
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
    str = str.replace(/Đ/g, "d");
    str = str.split(' ').join('-');
    return str;
  }

function replaceNameProduct(nameProduct) {
    var newNameProduct = xoa_dau(nameProduct);
    return newNameProduct;
}

exports.createComment = (data) => {
    console.log(data);
    return new Promise( (resolve, reject) => {
        let sql = "INSERT INTO comment SET ?";
        db.query(sql, data, (err, d) => {
            console.log('Insert successfully')
            resolve(d);
        })
    })
}
exports.getComment = (idProduct) => {
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM comment WHERE idProduct=${idProduct}`;
        db.query(sql, (err, d) => {
            resolve(d);
        })
        
    })
}