const formidable = require("formidable")
const fs = require("fs");
const { request } = require("http");
const path = require("path")
const getRequestData = require('./getRequestData.js');
const sharp = require("sharp")
const { filters, photosArray } = require('./model.js');

module.exports = {
    all: (request, response) => {
        console.log(filters)
        response.end(JSON.stringify(filters, null, 2));
    },

    getMetadata: (id) => {
        const photo = photosArray.find(photo => photo.id == id)
        console.log(photo)
        return new Promise(async (resolve, reject) => {
            try {

                if (photo.url) {
                    let meta = await sharp(photo.url)
                        .metadata()
                    resolve(meta)
                }
                else {
                    resolve("url_not_found")
                }

            } catch (err) {
                reject(err.mesage)
            }
        })
    },

    tint: async (file, color) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-tint.";
        newUrl += segments[segments.length - 1];

        await sharp(file.url)
            .tint({ r: color.r, g: color.g, b: color.b })
            .toFile(newUrl);
        return newUrl;
    },

    rotate: async (file, angle) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-rotate.";
        newUrl += segments[segments.length - 1];
        await sharp(file.url)
            .rotate(angle)
            .toFile(newUrl);
        return newUrl;
    },


    resize: async (file, width, height) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-resize.";
        newUrl += segments[segments.length - 1];
        await sharp(file.url)
            .resize(width, height)
            .toFile(newUrl);
        return newUrl;
    },


    negate: async (file, width, height) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-negate.";
        newUrl += segments[segments.length - 1];
        await sharp(file.url)
            .negate()
            .toFile(newUrl);
        return newUrl;
    },

    reformat: async (file, to) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-reformat." + to;

        await sharp(file.url)
            .toFormat(to)
            .toFile(newUrl);
        return newUrl;
    },

    crop: async (file, width, height, top, left) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-crop.";
        newUrl += segments[segments.length - 1];

        await sharp(file.url)
            .extract({ width: width, height: height, left: left, top: top })
            .toFile(newUrl);
        return newUrl;
    },

    grayscale: async (file) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-grayscale.";
        newUrl += segments[segments.length - 1];

        await sharp(file.url)
            .grayscale()
            .toFile(newUrl);
        return newUrl;
    },


    flip: async (file) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-flip.";
        newUrl += segments[segments.length - 1];

        await sharp(file.url)
            .flip()
            .toFile(newUrl);
        return newUrl;
    },


    flop: async (file) => {
        let segments = file.url.split(".")
        let newUrl = segments[0];
        for (let i = 1; i < segments.length - 1; i++) {
            newUrl += "." + segments[i];
        }
        newUrl += "-flop.";
        newUrl += segments[segments.length - 1];

        await sharp(file.url)
            .flop()
            .toFile(newUrl);
        return newUrl;
    }
}