const express = require('express')
const router = express.Router()
const fs = require('fs')



    //Index/Home
router.get('/', (request,response)=>{
    response.render('index')
})

    //Tv 
router.get('/electronics', (request,response)=>{
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


module.exports = router

