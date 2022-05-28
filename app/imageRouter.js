const getRequestData = require('./getRequestData.js');
const controller = require('./fileController.js')
const imageRouter = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url == "/api/photosAll") {
                controller.returnFiles(request, response)
            }
            if (request.url.includes("/api/photo/")) {
                controller.returnFile(request, response)
            }
        case "POST":
            if (request.url == "/api/photos") {
                controller.saveFile(request, response)
            }
            else if (request.url == "/api/photosAll") {

            }
            else if (request.url == "/delete") {

            }
            else if (request.url == "/update") {

            }

            break;
        case "DELETE":
            if (request.url.includes("/api/photodel/")) {
                controller.deleteFile(request, response)
            }
    }
}

module.exports = imageRouter
