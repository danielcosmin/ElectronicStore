const mongoose = require('mongoose')
const Schema = mongoose.Schema
//
const Smart_speakers_product_Schema = new Schema({
    product_id: String,
    product_name: String,
    brand_name: String,
    product_categorie: String,
    product_price: String,
    product_image: String,
    created: Date
})
const Smart_speakers_Products = mongoose.model('Smart_speakers_Product', Smart_speakers_product_Schema)

    //exporting
module.exports = Smart_speakers_Products