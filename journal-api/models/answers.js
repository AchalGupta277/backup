const Database = require("../database");
const utility = require('../utility');

class Answers {

    constructor() {
        this.dbInstance = new Database().getInstance();
    }

    async addAnswer(request) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`Insert into public.answers(questionId, text, created_at) values(${request.questionId}, '${request.text}', ${utility.getTimestamp()}) `, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(res);
            })
        })
    }

    async getAnswersToQuestion(questionId) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`SELECT * from public.answers where questionId=${questionId} and status!=0`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
        })
    }

    async getStarredAnswersToQuestion(questionId) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`SELECT * from public.answers where questionId=${questionId} and starred=1 and status!=0`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
        })
    }
}

module.exports = Answers;