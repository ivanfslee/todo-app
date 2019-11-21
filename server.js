let express = require('express');

let app = express();

app.get('/', function(req, res) {
    res.send("Aloha, welcome to our app");
});

app.listen(3000);