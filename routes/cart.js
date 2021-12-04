var express = require('express');
var router = express.Router();
var modelProduct = require('../models/model_product'); //nhúng model products vào controller này để sử dụng
var modelCatalog = require('../models/model_catalog');
var modelCart = require('../models/model_cart');
var userRouter = require('../routes/users');
const { route } = require('.');

router.get('/', async function(req, res, next) {
  let user = req.session.User;
  let bill = await modelCart.checkBill(user.id); 
  let idCart = 0;
  if(bill != null)
  {
    idCart = bill.idCart;
  }
  let listPro = await modelCart.list(idCart);
  res.render('gio-hang.ejs', {listPro:listPro, bill});
})

router.get('/them/:id', async function(req, res){
  let idProduct = req.params.id;
  let product = await modelCart.getProduct(idProduct);
  let quantity = 0;
  if(req.session.User) 
  {
    let user = req.session.User;
    if(req.session.number) quantity = req.body.number;
    else quantity = 1;
    modelCart.InsertCart(user.id, idProduct, quantity, product.priceProduct);
  }
  res.redirect('/gio-hang/');
})

router.post('/them/:id', async function(req, res){
   let idProduct = req.params.id;
  let product = await modelCart.getProduct(idProduct);
  let quantity = 0;
  if(req.session.User) 
  {
    let user = req.session.User;
    console.log(req.body.quantity);
    if(req.body.quantity != null) quantity = req.body.quantity;
    else quantity = 1;
    modelCart.InsertCart(user.id, idProduct, quantity, product.priceProduct);
  }
  res.redirect('/gio-hang/');
})

router.put('/sua', async function(req, res){
  let discount = req.body.discount;
  if(req.session.User)
  {
    let user = req.session.User;
    let Bill = await modelCart.checkBill(user.id);
    let total = new Number(Bill.total) - new Number(Bill.total) * new Number(discount) /100;
    console.log(total);
    modelCart.UpdateBill(Bill.idBill, discount, Bill.totalProduct, total, 0);
  }
  res.redirect('/gio-hang/');
})

router.get('/xoa/:idCart/:idProduct', async function(req, res){
  let idProduct = req.params.idProduct;
  let idCart = req.params.idCart;
  modelCart.DeleteProdcut(idCart, idProduct);
  if(req.session.User)
  {
    let user = req.session.User;
    let Bill = await modelCart.checkBill(user.id);
    let product = await modelProduct.detail(idProduct);
    let totalProduct = new Number(Bill.totalProduct) - new Number(product.priceProduct);
    let price = new Number(product.priceProduct) - new Number(product.priceProduct) * new Number(Bill.discount) /100;
    let total = new Number(Bill.total - price);
    modelCart.UpdateBill(Bill.idBill, Bill.discount, totalProduct, total, 0);
  }
  res.redirect('/gio-hang/');
})
router.get('/so-luong',function(req,res){
    let number = req.body.quantity;
    console.log(number);
})
router.post('/so-luong/:idCart/:idProduct', async function(req, res){
  let idProduct = req.params.idProduct;
  let idCart = req.params.idCart;
  let quantity = req.body.quantity;
  let cart = await modelCart.getCart(idCart, idProduct);
  let product = await modelProduct.detail(idProduct);
  if(req.session.User)
  {
    let user = req.session.User;
    let Bill = await modelCart.checkBill(user.id);
    modelCart.UpdateCart(idCart, idProduct, quantity, user.id);
    quantity = new Number(quantity);
    let totalProduct = Bill.totalProduct;
    if(quantity < new Number(cart.quantity))
    {
      totalProduct = new Number(Bill.totalProduct) - new Number(product.priceProduct);
    }
    if(quantity > new Number(cart.quantity))
    {
      totalProduct = new Number(Bill.totalProduct) + new Number(product.priceProduct)
    }
    let total = totalProduct - totalProduct * new Number(Bill.discount)/100;
    modelCart.UpdateBill(Bill.idBill, Bill.discount, totalProduct, total,0 );
    res.redirect('/gio-hang/');
  }
})

router.get('/api/gio-hang/:name', async function(req, res) {
    let name = req.params.name;
    console.log(name);
    let data = await modelProduct.detailByName(name);
    console.log(data);
    res.json(data);
  })

  function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.split(' ').join('-');
    return str;
  }
  
  function replaceNameProduct(nameProduct) {
    var newNameProduct = xoa_dau(nameProduct);
    return newNameProduct;
  }
  module.exports = router;

module.exports = router;