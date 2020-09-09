const express = require('express')
const app = express()
const PORT = 6500
const indexRouter = require('./routes/index')
const bodyParser = require('body-parser');

//setup static folder for external files
app.use(express.static(__dirname + '/public'))

//View Engine Setups(TEMPLATE ENGINE SETUP)
app.set('view engine', 'hbs')

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', indexRouter)
    // app.get('/electronics', (res,req)=>{
    //     req.render('')
    // })
    //listening port
app.listen(PORT, () => {
    console.log('Server is running')
})