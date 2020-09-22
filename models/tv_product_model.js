const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    //Brings the general model 
const TV_product_Schema = new Schema({
    product_id: String,
    product_name: String,
    brand_name: String,
    product_categorie: String,
    product_price: String,
    product_image: String,
    created: Date
    });
    


const TV_Products = mongoose.model('TV_Product', TV_product_Schema);


//exports
module.exports = TV_Products;