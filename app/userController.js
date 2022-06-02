const getRequestData = require('./getRequestData.js');
const nodemailer = require("nodemailer")
const { User, Users } = require('./model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    userRegistration: (data) => {
        require('dotenv').config();

        const password = data.password
        let encryptedPassword
        const encryptPass = async (password) => {

            encryptedPassword = await bcrypt.hash(password, 10);
            console.log({ encryptedPassword: encryptedPassword });
        }

        encryptPass(password)
        console.log(process.env.YAGOO_LOGIN)
        const config = {
            host: "smtp.mail.yahoo.com",
            port: 465, // 587
            service: 'Yahoo',
            secure: false,
            secure: true, // SSL
            auth: {
                user: process.env.YAGOO_LOGIN,
                pass: process.env.YAHOO_PASS
            }
        }

        let user = new User(data.name, data.lastName, data.email, encryptedPassword, false)
        Users.push(user)
        console.log(user.name)
        let Token
        const createToken = async (Token) => {

            let token = await jwt.sign(
                {
                    email: data.email,
                    anyData: "123"
                },
                "verysecretkey", // powinno być w .env
                {
                    expiresIn: "1h" // "1m", "1d", "24h"
                }
            );
            console.log({ token: token })
            Token = { token: token }
        }
        createToken()
        const transporter = nodemailer.createTransport(config)

        transporter.sendMail({
            from: process.env.YAGOO_LOGIN,
            to: data.email,
            subject: "Insta App - rejestracja",
            text: `kliknij w poniższy link
            http://localhost:3000/api/user/confirm/${Token}
            w celu potwierdzenia konta
            Uwaga: link jest ważny przez godzinę`,
            html: `<h1>kliknij w poniższy link</h1><a href=\"http://localhost:3000/api/user/confirm/${Token}\"</a><p>w celu potwierdzenia konta</p><p>Uwaga: link jest ważny przez godzinę</p>`
        });
    },

    userConfirmation: (token, response) => {
        require('dotenv').config();
        const verifyToken = async (token) => {

            try {
                let decoded = await jwt.verify(token, "verysecretkey")
                console.log({ decoded: decoded });
                console.log(decoded.email)
                let user = Users.find(user => user.email == decoded.email)
                user.confirmed = true;
                console.log(user)
                const config = {
                    host: "smtp.mail.yahoo.com",
                    port: 465, // 587
                    service: 'Yahoo',
                    secure: false,
                    secure: true, // SSL
                    auth: {
                        user: process.env.YAGOO_LOGIN,
                        pass: process.env.YAHOO_PASS
                    }
                }
                const transporter = nodemailer.createTransport(config)
                transporter.sendMail({
                    from: process.env.YAGOO_LOGIN,
                    to: user.email,
                    subject: "Insta App - potwierdzenie",
                    text: `konto zostało potwierdzone!`,
                    html: `<h1>konto zostało potwierdzone!</h1>`
                });
                response.end(JSON.stringify(user, null, 2));
            }
            catch (ex) {
                console.log({ message: ex.message });
                response.end(JSON.stringify({ message: ex.message }, null, 2));
            }
        }


        const processToken = async (token) => {
            await verifyToken(token)
        }

        processToken(token)
    }
}