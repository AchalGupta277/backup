const Database = require("../database");
const utility = require('../utility');

class Answers {

    constructor() {
        this.dbInstance = new Database().getInstance();
    }

    async getUser(email, password) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`SELECT * from public.users where email='${email}' and password='${password}' and status!=0`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
        })
    }
}

module.exports = Answers;