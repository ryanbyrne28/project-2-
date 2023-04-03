const express = require('express')
const mongoose = require('mongoose')
const product = require('./models/products')

const app =  express()
const PORT = 4000

const DATABASE_URL = 'mongodb+srv://ryantylerbyrne:xBRE9tT9doahaRF3@cluster0.3lrwy1h.mongodb.net/?retryWrites=true&w=majority'

const db = mongoose.connection

mongoose.connect(DATABASE_URL)

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
app.use(express.urlencoded({extended:false}))

app.get('/products', (req, res) => {
    res.render('index.ejs')
})

// I
app.get('/products', async (req, res) => {
    const allProducts = await product.find({})
    res.render('index.ejs',{products: allProducts})
})

// // N
app.get('/new', (req, res) => {
    res.render('new.ejs')
})

// // D
app.delete('/products/:id', async (req, res) => {
    await Product.findOneAndDelete(req.params.id);
    res.redirect("/products");
})



// U
app.put('/products/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.redirect(`/products/${req.params.id}`)
})

// C
app.post('/new', (req, res) => {
    const product = new Product(req.body)
    product.save().then(res.send("/products"))
});

// E
app.get('/products/:id/edit', async (req,res) => {
    const product = await Product.findById(
        req.params.id,);
        res.render("edit.js", {product})
})

// // S
app.get('/products/:id', async (req, res) => {
    const specifiedProduct = await Product.findById(req.params.id).exec()
    res.send(specifiedProduct)
});

app.listen(PORT)
console.log('hello')