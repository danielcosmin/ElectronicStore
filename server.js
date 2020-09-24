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

mongoose.connect('mongodb+srv://admin:M0h@mmed@mohammad.v7aku.mongodb.net/test', { useUnifiedTopology: true, useNewUrlParser: true })
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