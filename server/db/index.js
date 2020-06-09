// manages relationships between data, provides schema validation, and is used to translate 
// between objects in code and the representation of those objects in MongoDB.

const mongoose = require('mongoose')
const expressSession  = require('express-session')
const mongoStore = require('mongo-store')(expressSession)




mongoose
    .connect('mongodb://127.0.0.1:27017/testdb', {useNewUrlParser: true}).then(()=>{
    })
    .then(()=>{
        console.log("Connection Open")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

