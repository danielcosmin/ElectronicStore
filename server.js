const express = require('express');
const app = express();
const PORT = 6500
const indexRouter = require('./routes/index');
const fs = require('fs');
const bodyParser = require('body-parser');
const { request } = require('http');
const { response } = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const User = require('./models/userModel');

mongoose.connect('mongodb+srv://mongoDBadmin:<password>cluster1.ookpy.mongodb.net/Electronic_Store', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Your MongoDB is connected......')
    })
    .catch(err => console.log('Your ERROR is : ' + err));


let userJSON_data = fs.readFileSync('public/jsonFiles/userData.json', { root: 'public' });
let userObject_data = JSON.parse(userJSON_data);

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
    let userId = Math.floor(Math.random() * 100);
    userInfo = request.body;
    // let data_from_user = request.body
    //     //console.log(userObject_data)
    // userObject_data.push(data_from_user)
    //     //console.log(userObject_data)
    // fs.writeFileSync(__dirname + '/public/jsonFiles/userData.json', JSON.stringify(userObject_data))
    // response.render('index')
    let newUser = new User({ userId, userInfo }
        //     {
        //     id: userId,
        //     user_first_name: request.body.user_first_name,
        //     user_last_name: request.body.user_last_name,
        //     user_email: request.body.user_email,
        //     user_password: request.body.user_password,
        //     user_age: request.body.user_age
        //         // created: Date.now()
        // }
    );
    newUser.save(() => {
        response.render('signin')
    });
})
app.get('/user', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(json => res.render('api', { json }));
})

app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    //console.log(req.params.id);
    fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(resp => resp.json())
        .then(json => res.render('user', { json }));
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

    let message = '<div class="alert alert-danger" role="alert">wrong Email or password</div>';
    response.render('', { message })
        // message.innerHTML = '<div class="alert alert-danger" role="alert" hidden>wrong Email or password</div></div>';
})