const Users = require("../models/users");
const { encryptMessage } = require("../utility");
const { createToken } = require("../services/token");
const { response } = require("express");

const answers = {
    async login(req, res, next) {
        let { email, password } = req.body;
        /** encrypt password */
        password = await encryptMessage(password);
        /** search in db */
        let userModel = new Users();
        let user = await userModel.getUser(email, password);
        console.log("Result", user);
        if (user && user.length > 0) {
            /** user found create token */
            let payload = {
                user_id: user[0].id,
                email: user[0].email
            }
            let token = createToken(payload);
            return res.header(`token`, token).send({
                status: true
            });
        }else{
            return res.send({
                status: false
            });
        }
    }
}

module.exports = answers;