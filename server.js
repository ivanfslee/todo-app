const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./keys')
require('./Item');
const app = express();
let connectionString = keys.mongoURI;
mongoose.connect(connectionString);
const Item = mongoose.model('items');


app.use(express.urlencoded({extended: false}))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/create-item', async (req, res) => {
    const todoItem = await new Item({ text: req.body.item}).save()
    res.send(
        `<p>"Thank you for submitting the form."</p>
        <a href="/">Go Back</a>`
    )
});

app.listen(3000);