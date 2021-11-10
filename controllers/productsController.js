const db = require('../database/models');
const sequelize = db.sequelize;

//llamar a los modelos
const Product = db.Product;
const Category = db.Category;
const { validationResult } = require('express-validator');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const productsControlador = {
    index: (req, res) => {
        Product.findAll()
            .then(function(products){
                res.render('./products/products', {
                    products: products,
                    toThousand
                });
            })
            .catch(err => {
                console.log(err);
           });
    },
    detail: (req, res) => {
        let juegoBuscado = req.params.idProduct;
        db.Product.findByPk(juegoBuscado, {
            include: [{association: 'category'}]
        })
            .then(function(resultado) {
                res.render('./products/productDetail', {resultado: resultado})
            })
            .catch(err => {
                console.log(err);
           });
    },
    create: (req, res) => {
        Category.findAll()
            .then(function(categories) {
                return res.render('./products/createProduct', {categories: categories});
            })
            .catch(err => {
                console.log(err);
           });
    },
    store: (req, res) => {
        console.log(req.body);
        console.log(req.file);
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if(resultValidation.errors.length > 0){
            Category.findAll()
            .then(function(categories) {
                return res.render('./products/createProduct', {
                    categories: categories,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            })
            .catch(err => {
                console.log(err);
           });
        }else{
            let upImage = req.file ? req.file.filename :  'default-image.png'; 
            Product.create({
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                product_image: upImage,
                discount: 0,
                stock: 100
            });
            res.redirect('/products');
        }
    },
    edit: (req, res) => {
        let juegoId = req.params.idProduct;
        let GameToEdit = Product.findByPk(juegoId,{include: ['category']});
        let CategoryAll = Category.findAll();

        Promise
        .all([GameToEdit, CategoryAll])
            .then(function([resultado, categories]){
                return res.render('./products/updateProduct', {resultado: resultado, categories: categories})
            })
            .catch(err => {
                console.log(err);
           });

    },
    update: (req, res) => {
        console.log(req.params)
        let upImage = req.file ? req.file.filename :  'default-image.png'; 
            Product.update({
                name: req.body.name,
                id_category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                product_image: upImage,
                discount: 0,
                stock: 100
            },{
                where: {
                    id_product: req.params.idProduct
                }
            });
            res.redirect('/products/' + req.params.idProduct);
    },
    destroy: (req, res) => {
        //testing new code -- seems working like charm
        let id = req.params.idProduct;
		Product.destroy({
            where: { 
                id_product: id
            }
        })
        res.redirect('/products/');
    }
};

module.exports = productsControlador;