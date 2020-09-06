const Database = require("../database");
const utility = require('../utility');

class DiaryEntries {

    constructor() {
        this.dbInstance = new Database().getInstance();
    }

    async addDiaryEntry(request) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`Insert into public.diary_entries(user_id, content, created_at, updated_at) values('${request.user_id}', '${request.content}', ${utility.getTimestamp()}, ${utility.getTimestamp()}) `, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            })
        })
    }

    async getDiaryEntriesOfUser(userId) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`SELECT id, content, created_at from public.diary_entries where user_id=${userId} and status!=0 order by created_at desc`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
        })
    }

    getDiaryEntryById(userId, diaryEntryId) {
        return new Promise((resolve, reject) => {
            return this.dbInstance.query(`SELECT id, content, created_at from public.diary_entries where user_id=${userId} and id=${diaryEntryId} and status!=0`, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            })
        })
    }
}

module.exports = DiaryEntries;