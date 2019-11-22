const express = require('express');
const mongoose = require('mongoose');
const keys = require('./keys')
require('./Item');
const app = express();

let connectionString = keys.mongoURI;
mongoose.connect(connectionString);
const Item = mongoose.model('items');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
    Item.find({}, function (error, items) { // function returns all the items of database in an array
    console.log(items);
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple To-Do App</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
            <div class="container">
                <h1 class="display-4 text-center py-1">To-Do App!</h1>
                
                <div class="jumbotron p-3 shadow-sm">
                    <form id="create-form" action="/create-item" method="POST">
                        <div class="d-flex align-items-center">
                            <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                            <button class="btn btn-primary">Add New Item</button>
                        </div>
                    </form>
                </div>
            
                <ul id="item-list" class="list-group pb-5">

                </ul>
            </div>
            
            <script> 
                    let items = ${JSON.stringify(items)};  //convert database documents to a JSON string
            </script>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="/browser.js"></script>
        </body>
      </html>
      `)
    }); 
  })

app.post('/create-item', async (req, res) => { //request is from the form submission
    const todoItem = await new Item({text: req.body.text});

    //save todo to database and send document back to frontend 
    todoItem.save((err, info) => {
        console.log(info); //info is an object 
        res.send(info)});
});

app.post('/update-item', async (req, res) => { //request is from the prompt axios request 
    //console.log('id is ', req.body.id);
    //console.log('text is ', req.body.text);
    await Item.findByIdAndUpdate(req.body.id, {text: req.body.text}, () => res.send('Success'));
})

app.post('/delete-item', async (req, res) => {
    await Item.deleteOne({_id: req.body.id}, () => res.send('Success'));
})

app.listen(3000);



// ${items.map(function(item) {
//     return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
//     <span class="item-text">${item.text}</span>
//     <div>
//         <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
//         <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
//     </div>
//     </li> `;
//     }).join('')}