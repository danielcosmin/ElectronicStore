const express = require('express')
const { request } = require('http')
const { response } = require('express')
const router = express.Router()



router.get('/', (request,response)=>{
    response.render('index') // layout.hbs + index.hbs
})
router.get('/electronics', (request,response)=>{
    response.render('electronics') //{layout: 'layout_for_products'}
})
router.get('/profile', (request,response)=>{
    response.render('profile')
})




module.exports = router

