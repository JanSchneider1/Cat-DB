const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const Cat = require('./src/js/cat');

// Connect to Mongo-DB
mongoose.connect('mongodb://user:secret@mongo-db:27017/pets', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

// Configure app
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure mappings
app.get('/cats', function(req, res) {
    const cats = Cat.find((err, cats) => {
        if (err) { return console.error(err); }
        res.json(cats);
    });
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/html/app.html'));
});
app.get('/app.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/js/app.js'));
});
app.get('/app.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/css/app.css'));
});
app.post('/', function(req, res){
    const newCat = new Cat({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        furColor: req.body.furColor,
        favFood: req.body.favFood
    });
    newCat.save();
    res.sendFile(path.join(__dirname + '/src/html/app.html'));
    console.log("Added new Cat to DB!");
});

app.listen(port);
console.log(`Server is running at http://localhost:${port}/`);