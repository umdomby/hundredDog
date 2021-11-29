const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: false, unique: false}
},{versionKey: false})

module.exports = model('Breed', schema)
