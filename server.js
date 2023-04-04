const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const methodOverride = require('method-override')
const app =  express()
require('dotenv').config()
// const PORT = 4000

// const DATABASE_URL = 'mongodb+srv://ryantylerbyrne:xBRE9tT9doahaRF3@cluster0.3lrwy1h.mongodb.net/?retryWrites=true&w=majority'



mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection


db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
app.use(express.urlencoded({extended:false}))

//middleware
// Middleware
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: false }));




// I
app.get('/products', async (req, res) => {
    const allProducts = await Product.find({})
    res.render('index.ejs',{Products: allProducts})
})

// // N
app.get('/products/new', (req, res) => {
    res.render('new.ejs')
})

// // D
app.delete('/products/:id', async (req, res) => {
    await Product.findOneAndDelete(req.params.id);
    res.redirect('/products');
})



// U
app.put('/products/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.redirect(`/products/${req.params.id}`)
})

// C
app.post('/new', (req, res) => {
    const product = new Product(req.body)
    product.save().then(res.redirect("/products"))
});

// E
app.get('/products/:id/edit', async (req,res) => {
    const editedProduct = await Product.findById(
        req.params.id,);
        res.render("edit.ejs", {product:editedProduct})
})

app.post('/products/:id/buy', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, {$inc:{qty:-1}})
    res.redirect(`/products/${req.params.id}`)
})

// // S
app.get('/products/:id', async (req, res) => {
    const specifiedProduct = await Product.findById(req.params.id).exec()
    res.render('show.ejs', {product:specifiedProduct}) 
});


const PORT= process.env.PORT
app.listen(PORT)
console.log('hello')