require('dotenv').config();
const express = require("express");
const app = require('./src/app');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})