const mongoose = require('mongoose');

const casoSchema = new mongoose.Schema({
    name: String,
    location: String,
    age: Number,
    infectedtype: String,
    state: String,
});


const caso = mongoose.model('caso',casoSchema);

module.exports = caso;