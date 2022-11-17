const express = require('express')
const dotenv = require('dotenv');
dotenv.config();


const PORT = 8080


const app = express()


app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});