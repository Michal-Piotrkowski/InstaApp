const http = require('http');
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const filtersRouter = require("./app/filterRouter")
require('dotenv').config();
const nodemailer = require("nodemailer")
const config = {
    service: 'Yahoo',
    auth: {
        user: "login",
        pass: "pass"
    }
}

http.createServer(async (req, res) => {

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    //tags router
    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

    //filters router
    else if (req.url.search("/api/filters") != -1) {
        await filtersRouter(req, res)
    }

})
    .listen(process.env.APP_PORT, () => console.log(`listen on ${process.env.APP_PORT}`))
