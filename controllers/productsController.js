const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");


const productsControlador = {
    index: (req, res) => {
        res.render('./products/products', {
			products,
			toThousand
		});
    },
    detail: (req, res) => {
        res.render('./products/productDetail');
    },
    create: (req, res) => {
        res.render('./products/createProduct');
    },
    store: (req, res) => {
        console.log(req.files);
        let upImage; 
		if(req.file){
			upImage = req.file.filename;
		}else{
			upImage = 'default-image.jpg';
		}
		let newProduct = {
            id: products[products.length - 1].id + 1,
			...req.body,
			image: upImage,
            discount: 0
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
    },
    edit: (req, res) => {
        res.render('./products/updateProduct');
    },
    update: (req, res) => {
        
    },
    destroy: (req, res) => {
        
    }
};

module.exports = productsControlador;