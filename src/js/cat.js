const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String,
    furColor: String,
    favFood: String,
});

const Cat = mongoose.model('Cat', catSchema);
module.exports = Cat;