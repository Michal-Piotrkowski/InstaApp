const getRequestData = require('./getRequestData.js');
const controller = require('./fileController.js')
const router = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url == "/api/photosAll") {
                
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

    }
}

module.exports = router
