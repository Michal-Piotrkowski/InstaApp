const formidable = require("formidable")
const fs = require("fs")
const path = require("path")
const { photosArray } = require('./model.js');
const getRequestData = require('./getRequestData.js');
module.exports = {
    saveFile: (request, response) => {
        const form = formidable({ multiples: true });
        form.keepExtensions = true;
        form.uploadDir = "./album/"
        form.parse(request, (err, fields, files) => {
            console.log(fields, files)
            response.writeHead(200, { 'Content-Type': 'application/json' });
            let id = Date.now()
            photosArray.push(
                {
                    id: id,
                    album: fields.album,
                    orgiginalName: files.file.name,
                    url: files.file.path,
                    lastChange: "original",
                    history: [
                        {
                            status: "orginal",
                            tiemstamp: Date.now(),
                        }
                    ],
                    tags: [

                    ],
                })
            let photo = photosArray.find(photo => photo.id == id)
            response.end(JSON.stringify(photo, null, 2));
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
        let id = req[req.length - 1]
        let photo = photosArray.find(photo => photo.id == id)
        photosArray.forEach(element => {
            console.log(req[req.length - 1])
            if (element.id == id) {
                if (photosArray.length == 1) {
                    photosArray.pop()
                    fs.unlink(photo.url, (err) => {
                        if (err) throw err;
                        console.log(photo.url + ' was deleted');
                    })
                }
                else if (index == 0) {
                    photosArray.shift()
                    fs.unlink(photo.url, (err) => {
                        if (err) throw err;
                        console.log(photo.url + ' was deleted');
                    })
                }
                else {
                    photosArray.splice(index, index)
                    fs.unlink(photo.url, (err) => {
                        if (err) throw err;
                        console.log(photo.url + ' was deleted');
                    })
                }
            }
            index++;
        })
        console.log(photosArray)
        response.end(JSON.stringify(photosArray, null, 2))
    },
    editFile: async (request, response) => {
        let req = await getRequestData(request)
        console.log(req)
        req = JSON.parse(req)
        console.log(req)
        let photo = photosArray.find(photo => photo.id == req.id)
        console.log(photosArray[0].history)
        photo.history.push({ status: req.status + photo.history.length, timestamp: Date.now() })
        photo.lastChange = req.status + (photo.history.length - 1)
        response.end(JSON.stringify(photo, null, 2));
    },
    getall: () => {
        return
    },
}