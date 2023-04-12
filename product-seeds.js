const products = require('./models/products')

const mongoose = require('mongoose')
const products = require('./models/products')


[
    {
      name: 'Beans',
      description: 'A small pile of beans. Buy more beans for a big pile of beans.',
      img: 'https://imgur.com/LEHS8h3.png',
      price: 5,
      qty: 99
    }, {
      name: 'Bones',
      description: 'It's just a bag of bones.',
      img: 'https://imgur.com/dalOqwk.png',
      price: 25,
      qty: 0
    }, {
      name: 'Bins',
      description: 'A stack of colorful bins for your beans and bones.',
      img: 'https://imgur.com/ptWDPO1.png',
      price: 7000,
      qty: 1
    }
  ]
const seedDb = async()=> {
  for ( let i = 0; i < products.length; i ++) {
    let products = new product(products)
    await product.save()
  }
}
seedDb()