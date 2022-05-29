const getRequestData = require('./getRequestData.js');
const controller = require('./tagsController.js')
const tagsRouter = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url == "/api/tags/ADMIN") {
                controller.convertAllRaw(request, response)
            }
            if (request.url == "/api/tags/raw") {
                controller.getAllRaw(request, response)
            }
            if (request.url.includes("/api/tags/all")) {
                controller.getAll(request, response)
            }
            if (request.url.includes("/api/tagsG/")) {
                controller.getOne(request, response)
            }
        case "POST":
            if (request.url.includes("/api/tagsP")) {
                await controller.saveTag(request, response)
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
            break;
    }
}

module.exports = tagsRouter