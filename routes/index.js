const { response } = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { request } = require('http')
const TV_Products = require('../models/tv_product_model')



    //Index/Home
router.get('/', (request,response)=>{
    response.render('index')
})

    //Tv 
router.get('/tv', (request,response)=>{
    let jsonData = fs.readFileSync('public/jsonFiles/TVproducts.json', {root: 'public'})
    let jsonObject = JSON.parse(jsonData)
    //console.log(jsonObject)
    response.render('tv_products', {jsonObject})
})

    //Laptops
router.get('/laptops', (request,response)=>{
    let jsonData = fs.readFileSync('public/jsonFiles/laptopProducts.json', {root: 'public'})
    let jsonObject = JSON.parse(jsonData)
    //console.log(jsonObject)
    response.render('laptop_products', {jsonObject})
})

    //Mobile Phones
router.get('/mobile', (request,response)=>{
    let jsonData = fs.readFileSync('public/jsonFiles/mobileProducts.json', {root: 'public'})
    let jsonObject = JSON.parse(jsonData)
    //console.log(jsonObject)
    response.render('phone_products', {jsonObject})
})
    //Smart Speakers
router.get('/speakers', (request,response)=>{
    let jsonData = fs.readFileSync('public/jsonFiles/smartSpeakers.json', {root: 'public'})
    let jsonObject = JSON.parse(jsonData)
    //console.log(jsonObject)
    response.render('smart_speakers_products', {jsonObject})
})

    //Profile
router.get('/profile', (request,response)=>{
    response.render('profile')
})

    //Registration
router.get('/sign', (request,response)=>{
    response.render('SignUp')
})

    //ADD product info 
router.get('/addProducts', (request,response)=>{
    response.render('add_new_product')
})


   // Post products info
router.post('/addProducts', (request, response)=>{
    let product_info = request.body
    let newProduct = new TV_Products(
      product_info
    )
    newProduct.save(()=>{
        response.json('Data saved...')
    })
})

// router.get('/test', (request,response)=>{
//      let newProduct = new TV_Products({
//         product_name: 'TV-fullHD',
//         brand_name: 'LG', 
//     })
//     newProduct.save(()=>{
//         response.json('Data saved...')
//     })
// })

module.exports = router

