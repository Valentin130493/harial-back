const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const router = require('./router/index.js')
const PORT = process.env.PORT || 8080


const app = express()
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}))
app.use('/', router)

const server = app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});