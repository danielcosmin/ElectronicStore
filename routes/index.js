const { response } = require('express')


const express = require('express')
    //const app = express();
const router = express.Router()
const fs = require('fs')
const { request } = require('http')
const TV_Products = require('../models/tv_product_model')
const Users = require('../models/userModel')
const URL = require('url')
let userLogin = null;
//const session = require('express-session');
//app.use(session({ secret: 'try it' }))

//Index/Home
router.get('/', (request, response) => {

    response.render('index', {
        userLogin: request.session.login
    })
})

//Tv 
router.get('/tv', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/TVproducts.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('tv_products', { jsonObject, userLogin: request.session.login })
})

//Laptops
router.get('/laptops', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/laptopProducts.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('laptop_products', { jsonObject, userLogin: request.session.login })
})

//Mobile Phones
router.get('/mobile', (request, response) => {
        let jsonData = fs.readFileSync('public/jsonFiles/mobileProducts.json', { root: 'public' })
        let jsonObject = JSON.parse(jsonData)
            //console.log(jsonObject)
        response.render('phone_products', { jsonObject, userLogin: request.session.login })
    })
    //Smart Speakers
router.get('/speakers', (request, response) => {
    let jsonData = fs.readFileSync('public/jsonFiles/smartSpeakers.json', { root: 'public' })
    let jsonObject = JSON.parse(jsonData)
        //console.log(jsonObject)
    response.render('smart_speakers_products', { jsonObject, userLogin: request.session.login })
})

//Empty Cart
router.get('/empty_cart', (request, response) => {
    response.render('empty_cart', { userLogin: request.session.login })
})

//Profile
function chicklogin1(request, response, next) {

    if (!request.session.login) {
        response.redirect('/signin');
    }
    next();
}
router.get('/profile', chicklogin1, (request, response) => {
    response.render('profile', { userLogin: request.session.login })
})

//Registration
router.get('/sign', (request, response) => {
    response.render('SignUp', {
        userLogin //: request.session.login
    })
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
function chicklogin(request, response, next) {

    if (request.session.login) {
        response.redirect('/profile');
    }
    next();
}
router.get('/signin', chicklogin, (request, response) => {
    response.render('signin', {
        userLogin: request.session.login
    })
})
router.post('/signin', (request, response) => {
    let userData = request.body;
    // console.log(userData);

    Users.findOne({ user_email: userData.email_from_user }, (err, data) => {
        if (err) throw err;
        console.log(data)
        console.log(userData)
<<<<<<< HEAD
        if (data != null && userData.password_from_user == data.user_password) {
            // userLogin = data
            request.session.login = data;
            request.session.save();
            response.redirect(URL.format({
                pathname: '/profile',
                query: {
                    name: data.user_first_name
                }
            }));


        } else {

            response.render('signin', { message: 'wrong Email or password' })
=======
        if (data != null && userData.email_from_user == data.user_email && userData.password_from_user == data.user_password) {
                response.redirect('/profile');
            } 
        else {
            let message = '<div class="alert alert-danger" role="alert">wrong Email or password</div>';
            response.render('signin', { message })
>>>>>>> 03e934f70b4db4681e9d10aebce427ddad926cb8
                // response.send('wrong info')
        }
    })




    // message.innerHTML = '<div class="alert alert-danger" role="alert" hidden>wrong Email or password</div></div>';
})


//ADD product info 
router.get('/addProducts', (request, response) => {
    response.render('add_new_product', { userLogin: request.session.login })
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
    // siging out
router.get('/signout', (request, response) => {
    // userLogin = null;
    // request.session.destroy();
    request.session.login = null;
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