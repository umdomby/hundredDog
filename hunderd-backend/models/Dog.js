const {Schema, model} = require('mongoose')

const schema = new Schema({
    breed: { ref : 'Breed', type: Schema.Types.ObjectId, required: false},
    image: {type: String, required: false, unique: false},
    title: {type: String, required: false, unique: false}
},{versionKey: false})

module.exports = model('Dog', schema)
