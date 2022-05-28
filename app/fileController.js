const formidable = require("formidable")
const fs = require("fs")
const path = require("path")
const { photosArray } = require('./model.js');
module.exports = {
    saveFile: (request, response) => {
        const form = formidable({ multiples: true });
        form.keepExtensions = true;
        form.uploadDir = "./album/"
        form.parse(request, (err, fields, files) => {
            console.log(fields, files)
            response.writeHead(200, { 'Content-Type': 'application/json' });
            let id = Date.now()
            photosArray.push({ fields: fields, files: files, id: id })
            response.end(JSON.stringify({ fields, files }, null, 2));
        });
    },
    returnFiles: (request, response) => {
        console.log(photosArray)
        response.end(JSON.stringify(photosArray, null, 2))
    },
    returnFile: (request, response) => {
        let req = request.url.split("/")
        photosArray.forEach(element => {
            console.log(req[req.length - 1])
            if (element.id == req[req.length - 1]) {
                response.end(JSON.stringify(element, null, 2));
            }
        })
    },
    deleteFile: (request, response) => {
        let req = request.url.split("/")
        let index = 0;
        photosArray.forEach(element => {
            console.log(req[req.length - 1])
            if (element.id == req[req.length - 1]) {
                if (photosArray.length == 1) {
                    photosArray.pop()
                }
                else if (index == 0) {
                    photosArray.shift()
                }
                else {
                    photosArray.splice(index, index)
                }
            }
            index++;
        })
        console.log(photosArray)
        response.end(JSON.stringify(photosArray, null, 2))
    },
    getall: () => {
        return
    }

}