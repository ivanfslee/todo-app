let express = require('express');

let app = express();
app.use(express.urlencoded({extended: false}))
let path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/create-item', function(req, res) {
    console.log(req.body.item);
    res.send("Thank you for submitting the form.")
});

app.listen(3000);