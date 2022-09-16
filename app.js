const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const data = require("./data.json");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.get('/',(req,res) => {
    res.render('home.ejs');
})

app.get('/index', (req,res) => {
    const tasks = data.Users.Tasks;
    console.log(tasks);
    res.render('index.ejs', { tasks });
})
app.listen(3000, () => {
    console.log("localHost: 3000");
})