const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
    text: String
});

mongoose.model('items', itemSchema);