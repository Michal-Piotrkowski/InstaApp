const formidable = require("formidable")
const fs = require("fs");
const { request } = require("http");
const path = require("path")
const { tagsRawArray, tagsArray, photosArray } = require('./model.js');

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

    saveTag: async (request, response) => {
        let req = await getRequestData(request)
        console.log(req)
        req = JSON.parse(req)
        console.log(req)
        let index = 0
        if (tagsArray.length > 0) {
            index = tagsArray.length
        }
        let tag = { id: index, name: req.name, popularity: req.popularity }
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
    editTag: async (request, response) => {
        let req = await getRequestData(request)
        console.log(req)
        req = JSON.parse(req)
        let photo = photosArray.find(photo => photo.id == req.photoid)
        let tag = tagsArray.find(tag => tag.id == req.tagid)
        photo.tags.push(tag)
        response.end(JSON.stringify(photo, null, 2));
    },
    editTags: async (request, response) => {
        let req = await getRequestData(request)
        console.log(req)
        req = JSON.parse(req)
        let photo = photosArray.find(photo => photo.id == req.photoid)
        req.array.forEach(element => {
            let tag = tagsArray.find(tag => tag.id == element)
            photo.tags.push(tag)
        });
        response.end(JSON.stringify(photo, null, 2));
    },
    getPhotoTags: (request, response) => {
        let req = request.url.split("/")
        let id = req[req.length - 1]
        let photo = photosArray.find(photo => photo.id == id)
        let json = { id: photo.id, tags: photo.tags }
        console.log(json)
        response.end(JSON.stringify(json, null, 2));
    }
}