let photosArray = []
let tagsRawArray = ["#love",
    "#instagood",
    "#fashion",
    "#photooftheday",
    "#beautiful",
    "#art",
    "#photography",
    "#happy",
    "#picoftheday",
    "#cute",
    "#follow",
    "#tbt",
    "#followme",
    "#nature",
    "#like4like",
    "#travel",
    "#instagram",
    "#style",
    "#repost",
    "#summer",
    "#instadaily",
    "#selfie",
    "#me",
    "#friends",
    "#fitness",
    "#girl",
    "#food",
    "#fun",
    "#beauty",
    "#instalike",
    "#smile",
    "#family",
    "#photo",
    "#life",
    "#likeforlike",
    "#music",
    "#follow4follow",
    "#makeup",
    "#amazing",
    "#igers",
    "#nofilter",
    "#dog",
    "#model",
    "#sunset",
    "#beach",
    "#instamood",
    "#motivation"]
let tagsArray = []
let filters = [{
    "id": 1,
    "name": "metadata",
    "description": "dostępne informacje o zdjęciu",
    "method": "get",
    "args": "bez argumentów"
},
{
    "id": 2,
    "name": "rotate",
    "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
    "method": "patch",
    "args": "id obrazka, wartość x = 0-360"
},
{
    "id": 3,
    "name": "resize",
    "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
    "method": "patch",
    "args": "id obrazka, w, h"
},
{
    "id": 4,
    "name": "reformat",
    "description": "obrót w stopniach w prawo, ujemna wartość w lewo",
    "method": "patch",
    "args": "id obrazka, w, h"
},
{
    "id": 5,
    "name": "crop",
    "description": "przycina obrazek",
    "method": "patch",
    "args": "width and height at the given x and y position."
},
{
    "id": 6,
    "name": "grayscale",
    "description": "zamienia kolory",
    "method": "patch",
    "args": "obrazek"
},
{
    "id": 7,
    "name": "flip/flop",
    "description": "obraca obrazek",
    "method": "patch",
    "args": "obrazek"
},
{
    "id": 8,
    "name": "negate",
    "description": "negacja koloru",
    "method": "patch",
    "args": "obrazek"
},
{
    "id": 9,
    "name": "tint",
    "description": "zmienia odcien",
    "method": "patch",
    "args": "obrazek."
}
]

let Users = []

class User {
    constructor(name, lastnName, email, password, confirmed) {
        this.name = name
        this.lastnName = lastnName
        this.email = email
        this.password = password
        this.confirmed = confirmed
    }
    getName() {
        return this.name
    }
    getlastName() {
        return this.lastName
    }
    getEmail() {
        return this.email
    }
    getPassword() {
        return this.password
    }
    isConfirmed() {
        return this.confirmed
    }
}

module.exports = { photosArray, tagsRawArray, tagsArray, filters, User, Users };