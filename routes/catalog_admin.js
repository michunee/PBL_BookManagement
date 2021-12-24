var express = require('express');
var router = express.Router();
var modelCatalog = require('../models/model_catalog.js');
var modelProduct = require('../models/model_product');
var detail = null;
var show = null;
var message = null;
var nameCatalog = null;

router.get('/', async function(req, res, next)
{
        var listCategory = await modelCatalog.list();
        var listProduct = await modelProduct.list();
        show = null;
        
        res.render("category-admin.ejs", {list:listCategory, detail:detail, listPro: listProduct, show, message, nameCatalog: nameCatalog});
});

router.get('/chi-tiet-the-loai:id', async function(req, res, next)
{
    var id = req.params.id;
    var detailCat =  await modelCatalog.detailCategory(id);
    var listCategory = await modelCatalog.list();
    var listProduct = await modelProduct.list();
    res.render("category-admin.ejs", {detail:detailCat, listPro: listProduct, list:listCategory, show: show});
});

router.get('/them-the-loai', async function(req,res,next){
    var listCategory = await modelCatalog.list();
    var listProduct = await modelProduct.list();
    res.render("category-admin.ejs", {detail:detail, listPro: listProduct, list:listCategory, show: show, message});
});

router.post('/them-the-loai', async function(req,res,next){
    let nameCategory = req.body.nameCat;
    let number = req.body.number;
    if(nameCategory != "")
    { 
        modelCatalog.create(nameCategory, number);
        res.redirect('/sach/');
    }
    else 
    {
        message = "Xem lai thong tin";
        res.redirect('/sach/');
    }
});

router.put('/chinh-sua-the-loai', async function(req, res, next){
    let idCat = req.body.idCat;
    let nameCat = req.body.nameCat;
    let number = req.body.number;
    req.session.require = null;
    if(nameCat != "" && number != "")
    {
        modelCatalog.update(idCat, nameCat, number);
        res.redirect("/sach/");
    }
});

router.get('/xoa-the-loai/:id', function(req, res){
    let idCat = req.params.id;
    modelCatalog.delete(idCat);
    res.redirect("/sach/");
});

router.get('/them-sach', async function(req, res, next)
{
    show = "add";
    var listCategory = await modelCatalog.list();
    var listProduct = await modelProduct.list();
    res.render('product-admin.ejs', {list:listCategory, detail:detail, listPro: listProduct, show:show});
});

router.post('/them-sach', async function(req, res, next)
{
    var nameProduct = req.body.nameProduct;
    var authorProduct  = req.body.authorProduct;
    var amountProduct = req.body.amountProduct;
    var priceProduct= req.body.priceProduct;
    var desProduct= req.body.desProduct;
    var idCat = req.body.idCat;
    if (amountProduct == 0) 
    {
        var showHide = false;
    }
    else var showHide = true;
    if(!req.files)
        var imgProduct = "img/" + "default.png";
    else
    {
        var file = req.files.upload_image;
        var imgProduct = "img/" + file.name;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg")
        {
            file.mv('public/img/' + file.name, function(err){});
        }
    }
    req.session.require = 1;
    modelCatalog.updateNumber(idCat, 0, 0,  amountProduct, "add");
    modelProduct.addBook(nameProduct, authorProduct, priceProduct, amountProduct, desProduct, imgProduct, idCat, showHide);
    res.redirect("/sach/");
});

router.get('/chinh-sua-sach', async function(req, res, next)
{
    var listCategory = await modelCatalog.list();
    var listProduct = await modelProduct.list();
    res.render('product-admin.ejs', {list:listCategory, detail:detail, listPro: listProduct, show:show});
});

router.get('/chi-tiet-sach:id', async function(req, res, next)
{
    show ="edit";
    var idProduct = req.params.id;
    var detailPro = await modelProduct.detail(idProduct);
    var nameCatalog = (await modelCatalog.detailCategory(detailPro.idCat)).nameCat;
    var listCategory = await modelCatalog.list();
    var listProduct = await modelProduct.list();
    res.render('product-admin.ejs', {list:listCategory, detailPro: detailPro, detail:detail, listPro: listProduct, show:show, nameCatalog: nameCatalog});
});

router.put('/chinh-sua-sach/:id', async function(req, res, next)
{
    var idProduct = req.params.id;
    var nameProduct = req.body.nameProduct;
    var authorProduct  = req.body.authorProduct;
    var amountProduct = req.body.amountProduct;
    var priceProduct= req.body.priceProduct;
    var desProduct= req.body.desProduct;
    var idCatbefore = (await modelProduct.detail(idProduct)).idCat;
    var idCat = req.body.idCat;
    var number = (await modelProduct.detail(idProduct)).amountProduct;
    if (amountProduct == 0) 
    {
        var showHide = false;
    }
    else var showHide = true;
    if(!req.files)
        var imgProduct = (await modelProduct.detail(idProduct)).imgProduct;
    else
    {
        var file = req.files.upload_image;
        var imgProduct = "img/" + file.name;
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg")
        {
            file.mv('public/img/' + file.name, function(err){});
        }
    }
    let success = modelCatalog.updateNumber(idCatbefore, idCat, number, amountProduct, "edit");
    modelProduct.editBook(idProduct, nameProduct, authorProduct, priceProduct, amountProduct, desProduct, imgProduct, idCat, showHide);
    req.session.require = 1;
    res.redirect('/sach/');
});

router.get('/xoa-sach/:id/:idCat', async function(req, res, next)
{
    var idProduct = req.params.id;
    var number = (await modelProduct.detail(idProduct)).amountProduct;
    var idCat = req.params.idCat;
    req.session.require = 1;
    modelCatalog.updateNumber(idCat, 0,  number, 0, "delete");
    modelProduct.delete(idProduct);
    res.redirect('/sach/');
})

router.get('/:name', async function(req, res) {
    let name = req.params.name;
    let listPro = await modelCatalog.listByName(name);
    let listProPopular = await modelProduct.list();
    let listCat = await modelCatalog.list();
    let breadcrumb = name;
    res.render('san-pham-theo-loai-admin', {listPro: listPro,detail:detail, listCat: listCat, listProPopular: listProPopular,message, nameCatalog: nameCatalog, breadcrumb});
}) 

// API 
router.get('/api/:name', async function(req, res) {
    let name = req.params.name;
    let listPro = await modelCatalog.listByName(name);
    res.json(listPro);
})
module.exports = router;