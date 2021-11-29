require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const requestDog = require('./requestDog')
requestDog().then(r => console.log('breeds and dogs ' + r))
const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api', require('./routes/index'))


const start = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
            .then(() => console.log("Successfully connect to MongoDB."))
            .catch(err => console.error("Connection error", err));
        app.listen(PORT,  () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e + " index")
    }
}
start()
