const Database = require("../database");

class Questions {

    constructor() {
        this.dbInstance = new Database().getInstance();
    }

    async getAllQuestions() {
        return new Promise((resolve, reject) => {
            console.log("Bahar chala");
            return this.dbInstance.query('SELECT * from public.questions where status!=0', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res && res.rows || []);
            })
        })
    }

    async getQuestionById(questionId) {
        return new Promise((resolve, reject) => {
            console.log("Bahar chala");
            return this.dbInstance.query(`SELECT * from public.questions where id = ${questionId} and status!=0`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res && res.rows || []);
            })
        })
    }

}

module.exports = Questions;