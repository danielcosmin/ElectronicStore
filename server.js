const express = require('express')
const app = express()
const PORT = 6500
const indexRouter = require('./routes/index')
const fs = require('fs')
const bodyParser = require('body-parser')
const { request } = require('http')
const { response } = require('express')



let userJSON_data = fs.readFileSync('public/jsonFiles/userData.json', { root: 'public' })
let userObject_data = JSON.parse(userJSON_data)

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// setup static folder for external files
app.use(express.static(__dirname + '/public'))
    //View Engine Setups(TEMPLATE ENGINE SETUP)
app.set('view engine', 'hbs')

// routes
app.use('/', indexRouter)

// listening port
app.listen(PORT, () => {
    console.log('Server is running')
})


//10.09.2020 -- Post data and saving to a JSON file

app.post('/sign', (request, response) => {
    let data_from_user = request.body
        //console.log(userObject_data)
    userObject_data.push(data_from_user)
        //console.log(userObject_data)
    fs.writeFileSync(__dirname + '/public/jsonFiles/userData.json', JSON.stringify(userObject_data))
    response.render('index')
})

app.post('/', (request, response) => {
    let userData = request.body;
    // console.log(userData);
    for (let i of userObject_data) {
        if (userData.email_from_user == i.user_email && userData.password_from_user == i.user_password) {
            response.render('profile');
            break;
        }
    }
    response.render('index')
        // message.innerHTML = '<div class="alert alert-danger" role="alert" hidden>wrong Email or password</div></div>';
})