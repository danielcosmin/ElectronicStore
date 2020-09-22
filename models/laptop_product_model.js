const mongoose = require('mongoose')
const Schema = mongoose.Schema

    //
const Laptop_product_Schema = new Schema({
    product_id: String,
    product_name: String,
    brand_name: String,
    product_categorie: String,
    product_price: String,
    product_image: String,
    created: Date
})

    //creating model
const Laptop_Products = mongoose.model('Laptop_Product', Laptop_product_Schema)

    //exporting model
module.exports = Laptop_Products