const getRequestData = require('./getRequestData.js');
const controller = require('./filtersController.js');
const filtersController = require('./filtersController.js');
const { filters, photosArray } = require('./model.js');
const filtersRouter = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url == "/api/filters") {
                controller.all(request, response)
            }
            if (request.url.includes("/api/filters/metadata")) {
                let req = request.url.split("/")
                console.log(req[req.length - 1])
                controller.getMetadata(req[req.length - 1]).then(res => response.end(JSON.stringify(res, null, 2)))
            }
        case "PATCH":
            if (request.url == "/api/filters" && request.method == "PATCH") {

                let data = await getRequestData(request)
                let url;
                data = JSON.parse(data)
                let file = photosArray.find(photo => photo.id == data.id)
                if (file == null) {
                    response.end("[]")
                } else {

                    if (data.filter == "rotate") {
                        console.log(file)
                        url = await filtersController.rotate(file, data.angle)
                    }


                    if (data.filter == "resize") {
                        url = await filtersController.resize(file, data.width, data.height)


                    }


                    if (data.filter == "negate") {
                        url = await filtersController.negate(file)

                    }

                    if (data.filter == "reformat") {
                        url = await filtersController.reformat(file, data.to)

                    }

                    if (data.filter == "crop") {
                        url = await filtersController.crop(file, data.width, data.height, data.top, data.left)

                    }

                    if (data.filter == "grayscale") {
                        url = await filtersController.grayscale(file)

                    }

                    if (data.filter == "flip") {
                        url = await filtersController.flip(file)

                    }

                    if (data.filter == "flop") {
                        url = await filtersController.flop(file)

                    }

                    if (data.filter == "tint") {
                        let color = { r: data.r, g: data.g, b: data.b }
                        url = await filtersController.tint(file, color)
                    }
                    file.history.push({ status: data.filter + file.history.length, timestamp: Date.now(), url: url })
                    file.lastChange = data.filter + (file.history.length - 1)
                    response.end(JSON.stringify(file, null, 2));
                }
            }
            break;
    }
}

module.exports = filtersRouter