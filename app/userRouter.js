const getRequestData = require('./getRequestData.js')
const controller = require('./userController.js')
const jsonController = require('./jsonController.js')
const usersRouter = async (request, response) => {

    switch (request.method) {
        case "GET":
            if (request.url.includes("/api/user/confirm/")) {
                let req = request.url.split("/")
                controller.userConfirmation(req[req.length - 1], response)
            }
        case "POST":
            if (request.url.includes("/api/users/register")) {
                let data = await getRequestData(request)
                data = JSON.parse(data)
                controller.userRegistration(data)
            }
        case "PATCH":
    }
}

module.exports = usersRouter