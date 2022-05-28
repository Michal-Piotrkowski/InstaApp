const formidable = require("formidable")
const fs = require("fs");
const { request } = require("http");
const path = require("path")
const { tagsRawArray, tagsArray } = require('./model.js');

module.exports = {
    convertAllRaw: (request, response) => {
        let index = 0;
        tagsRawArray.forEach(element => {
            let tag = { id: index, name: element, popularity: Math.floor(Math.random() * (1000 - 1)) + 1 }
            tagsArray.push(tag)
            index++
            console.log(tagsArray)
        })
        response.end(JSON.stringify(tagsArray, null, 5))
    },

    saveTag: (request, response) => {
        let req = request.url.split("/")
        let element = "#" + req[req.length - 1]
        let index = 0
        if (tagsArray.length > 0) {
            index = tagsArray.length
        }
        let tag = { id: index, name: element, popularity: Math.floor(Math.random() * (1000 - 1)) + 1 }
        tagsArray.push(tag)
        response.end(JSON.stringify(tag, null, 5))
    },

    getAllRaw: (request, response) => {
        console.log(tagsRawArray)
        response.end(JSON.stringify(tagsRawArray, null, 5))
    },

    getAll: (request, response) => {
        let index = 0;
        tagsRawArray.forEach(element => {
            let tag = { id: index, name: element, popularity: Math.floor(Math.random() * (1000 - 1)) + 1 }
            tagsArray.push(tag)
            index++
            console.log(tagsArray)
        })
        response.end(JSON.stringify(tagsArray, null, 5))
    },
    getOne: (request, response) => {
        let req = request.url.split("/")
        tagsArray.forEach(element => {
            console.log(req[req.length - 1])
            if (element.id == req[req.length - 1]) {
                response.end(JSON.stringify(element, null, 2));
            }
        })
    },
}