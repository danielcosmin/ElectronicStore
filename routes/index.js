const { response } = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { request } = require('http')
const TV_Products = require('../models/tv_product_model')
const Users = require('../models/userModel')
let userLogin = null;



//Index/Home
router.get('/', (request, response) => {
    response.render('index', { userLogin })
})

//Tv 
router.get('/tv', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/TVproducts.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('tv_products', { jsonObject, userLogin })
})

//Laptops
router.get('/laptops', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/laptopProducts.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('laptop_products', { jsonObject, userLogin })
})

//Mobile Phones
router.get('/mobile', (request, response) => {
        let jsonData = fs.readFileSync('public/jsonFiles/mobileProducts.json', { root: 'public' })
        let jsonObject = JSON.parse(jsonData)
            //console.log(jsonObject)
        response.render('phone_products', { jsonObject, userLogin })
    })
    //Smart Speakers
router.get('/speakers', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/smartSpeakers.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('smart_speakers_products', { jsonObject, userLogin })
})

//Empty Cart
router.get('/empty_cart', (request, response) => {
    response.render('empty_cart', { userLogin })
})

//Profile
router.get('/profile', (request, response) => {
    response.render('profile', { userLogin })
})

//Registration
router.get('/sign', (request, response) => {
    response.render('SignUp', { userLogin })
})
router.post('/sign', (request, response) => {
    let userId = Math.floor(Math.random() * 100);
    userInfo = request.body;

    let newUser = new Users({
        id: userId,
        user_first_name: request.body.user_first_name,
        user_last_name: request.body.user_last_name,
        user_email: request.body.user_email,
        user_password: request.body.user_password,
        user_age: request.body.user_age
            // created: Date.now()
    });
    newUser.save(() => {
        response.render('signin')
    });
})

// login
router.get('/signin', (request, response) => {
    response.render('signin', { userLogin })
})
router.post('/signin', (request, response) => {
    let userData = request.body;
    // console.log(userData);

    Users.findOne({ user_email: userData.email_from_user }, (err, data) => {
        if (err) throw err;
        console.log(data)
        console.log(userData)
        if (data != null && userData.email_from_user == data.user_email && userData.password_from_user == data.user_password) {
            userLogin = 'logedin'
            response.redirect('/profile');


        } else {
            let message = '<div class="alert alert-danger" role="alert">wrong Email or password</div>';
            response.render('signin', { message })
                // response.send('wrong info')
        }
    })




    // message.innerHTML = '<div class="alert alert-danger" role="alert" hidden>wrong Email or password</div></div>';
})


//ADD product info 
router.get('/addProducts', (request, response) => {
    response.render('add_new_product', { userLogin })
})


// Post products info
router.post('/addProducts', (request, response) => {
    let product_info = request.body
    let newProduct = new TV_Products(
        product_info
    )
    newProduct.save(() => {
        response.json('Data saved...')
    })
})

router.get('/signout', (request, response) => {
    userLogin = null;
    response.redirect('/')
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