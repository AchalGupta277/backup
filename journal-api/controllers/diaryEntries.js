const DiaryEntry = require("../models/diaryEntries");
const underscore = require('underscore');

const diaryEntries = {
    addDiaryEntry : async (req, res, next) => {
        let diaryEntryModel = new DiaryEntry();
        underscore.extend(req.body, { user_id: req.user.user_id});
        let diaryEntry = await diaryEntryModel.addDiaryEntry(req.body);
        return res.status(200).send(diaryEntry);
    },
    
    getDiaryEntriesOfUser: async (req, res, next) => {
        let diaryEntryModel = new DiaryEntry();
        let alldiaryEntries = await diaryEntryModel.getDiaryEntriesOfUser(req.user.user_id);
        return res.send(alldiaryEntries);
    },

    getDiaryEntryById: async (req, res, next) => {
        let diaryEntryModel = new DiaryEntry();
        let alldiaryEntries = await diaryEntryModel.getDiaryEntryById(req.user.user_id, req.params.id);
        return res.send(alldiaryEntries);
    }
}

module.exports = diaryEntries;