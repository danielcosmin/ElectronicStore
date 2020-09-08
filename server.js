const express = require('express')
const app = express()
const PORT = 6500
const indexRouter = require('./routes/index')

//setup static folder for external files
app.use(express.static( __dirname + '/public'))
//View Engine Setups(TEMPLATE ENGINE SETUP)
app.set('view engine', 'hbs')

    //routes
app.use('/', indexRouter)
// app.get('/electronics', (res,req)=>{
//     req.render('')
// })
//listening port
app.listen(PORT, ()=>{
    console.log('Server is running')
})
