const getRequestData = require('./getRequestData.js');
const controller = require('./fileController.js')
const controllerT = require('./tagsController.js')
const imageRouter = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url == "/api/photos/All") {
                controller.returnFiles(request, response)
            }
            else if (request.url.includes("/api/photos/tags")) {
                controllerT.getPhotoTags(request, response)
            }
            else if (request.url.includes("/api/photos/")) {
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
            if (request.url.includes("/api/photos/del/")) {
                controller.deleteFile(request, response)
            }
        case "PATCH":
            if (request.url.includes("/api/photos/tasks")) {
                await controller.editFile(request, response)
            }
            if (request.url == "/api/photos/tags") {
                await controllerT.editTag(request, response)
            }
            if (request.url == "/api/photos/tags/mass") {
                await controllerT.editTags(request, response)
            }
    }
}

module.exports = imageRouter
