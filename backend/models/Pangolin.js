const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const pangolinSchema = mongoose.Schema({
    age: {type: Number, required: true},
    famille: {type: String, required: true},
    nourriture: {type: String, required: true},
    pseudo: {type: String, required: true, unique: true},
    race: {type: String, required: true},
    password: {type: String, required: true},
    amis: {type: [String], required: true}
});

pangolinSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Pangolin', pangolinSchema);
