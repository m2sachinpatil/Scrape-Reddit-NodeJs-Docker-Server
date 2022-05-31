const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const config = require("../FinalApp/config.json");
const postRoute = require('./Controller/postController');

app.use('/api', postRoute);

const HTTP_PORT = config.port;

app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});