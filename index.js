const express = require('express')
const dotenv = require('dotenv');
const http = require("http");
dotenv.config();


const PORT = 8080


const app = express()


const server = http.createServer((req, res) => {
    //your stuff
});

server.listen(process.env.PORT || 8080, () => {
    console.log("Listening on port 80");
});