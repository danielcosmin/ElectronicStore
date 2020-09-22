const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Phone_product_Schema = new Schema({
    product_id: String,
    product_name: String,
    brand_name: String,
    product_categorie: String,
    product_price: String,
    product_image: String,
    created: Date
})  
    //creating model
const Phone_Products = mongoose.model('Phone_Product', Phone_product_Schema)
    
    //exporting
module.exports = Phone_Products