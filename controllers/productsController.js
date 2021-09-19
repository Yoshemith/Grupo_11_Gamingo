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
        let juegoBuscado = req.params.idProduct;
        let archivoProducto = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
        let producto;
        if (archivoProducto == ""){
            producto = [];
        }else{
            producto = JSON.parse(archivoProducto);
        }
        let resultado =[];
        for(let i=0; i < producto.length; i++){
            if (producto[i].id == juegoBuscado){
                resultado.push(producto[i]);
            }
        }
        res.render('./products/productDetail', {resultado: resultado})
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
			upImage = 'default-image.png';
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
        let juegoId = req.params.idProduct;
        let archivoProducto = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
        let producto;
        if (archivoProducto == ""){
            producto = [];
        }else{
            producto = JSON.parse(archivoProducto);
        }
        let resultado =[];
        for(let i=0; i < producto.length; i++){
            if (producto[i].id == juegoId){
                resultado.push(producto[i]);
            }
        }
        res.render('./products/updateProduct', {resultado: resultado})
    },
    update: (req, res) => {
        let archivoProducto = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
        let producto;
            if (archivoProducto == ""){
                producto = [];
            }else{
                producto = JSON.parse(archivoProducto);
            }
        let juegoId = req.params.idProduct;
            if(req.file){
                for(let i=0; i < producto.length; i++){
                    if (producto[i].id == juegoId){
                        producto[i].name = req.body.nombreProducto;
                        producto[i].category = req.body.categoria;
                        producto[i].price = req.body.precio;
                        producto[i].description = req.body.descripcion;
                        producto[i].image = req.file.filename;
                    }
                }
            }else{
                for(let i=0; i < producto.length; i++){
                    if (producto[i].id == juegoId){
                        producto[i].name = req.body.nombreProducto;
                        producto[i].category = req.body.categoria;
                        producto[i].price = req.body.precio;
                        producto[i].description = req.body.descripcion;
                    }
                }
            }
        productoJSON = JSON.stringify(producto,null,2);
        fs.writeFileSync('./data/products.json', productoJSON);
        res.redirect('/')
    },
    destroy: (req, res) => {
        
    }
};

module.exports = productsControlador;