const express = require('express')
const mongoose = require('mongoose')

const productsRouter = express.Router()
const Product = require('../models/products')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

productsRouter.use(express.urlencoded({extended:false}))

// I
productsRouter.get('/', async (req, res) => {
    const allProducts = await Product.find({})
    res.render('products/index.ejs',{Products: allProducts})
})

// // N
productsRouter.get('/new', (req, res) => {
    res.render('products/new.ejs')
})

// // D
productsRouter.delete('/:id', async (req, res) => {
    await Product.findOneAndDelete(req.params.id);
    res.redirect('/products');
})



// U
productsRouter.put('/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.redirect(`/products/${req.params.id}`)
})

// C
productsRouter.post('/new', (req, res) => {
    const product = new Product(req.body)
    product.save().then(res.redirect("/products"))
});

// E
productsRouter.get('/:id/edit', async (req,res) => {
    const editedProduct = await Product.findById(
        req.params.id,);
        res.render("products/edit.ejs", {product:editedProduct})
})

productsRouter.post('/:id/buy', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, {$inc:{qty:-1}})
    res.redirect(`/products/${req.params.id}`)
})

// // S
productsRouter.get('/:id', async (req, res) => {
    const specifiedProduct = await Product.findById(req.params.id).exec()
    res.render('products/show.ejs', {product:specifiedProduct}) 
});

module.exports = productsRouter