const express = require('express')
const app = express()
const PORT = 6500
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')


    //setup body-parser
app.use(bodyParser.urlencoded({extended: true}))

    //setup static folder for external files
app.use(express.static( __dirname + '/public'))

    //View Engine Setups(TEMPLATE ENGINE SETUP)
app.set('view engine', 'hbs')

    //routes
app.use('/', indexRouter)


    //listening port
app.listen(PORT, ()=>{
    console.log('Server is running')
})
