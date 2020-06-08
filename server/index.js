

const express = require('express') 
const bodyParser = require('body-parser') //middlewear to handle HTTP POST; extract body portion of incoming request exposes to req.body
const cors = require('cors') //cross-origin resource sharing
const db = require('./db')
const testRouter = require('./routes/test-routes') 
const cookieParser = require('cookie-parser')


const app = express()
const apiPort = 3003

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

db.on('error', console.error.bind(console, 'Mongod connection error:'))


//for testing
app.get('/', (req, res) => {
    res.send('Working')
})



app.use('/api', testRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))