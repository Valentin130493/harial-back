const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const router = require('./router/index.js')
const mongoose = require('mongoose')
const cors = require("cors")

const PORT = process.env.PORT || 8080
const URL = process.env.DATABASE_URL


const app = express()
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/', router)

const server = app.listen(PORT, async () => {
    try {
        await mongoose.connect(`${URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('database is connected')
    } catch (err) {
        console.log(err, "database error")
    }

    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

