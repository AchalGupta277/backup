const express = require('express');
const router = express.Router();

const asyncHandler = require('../middleware/asyncHandler');
const diaryEntries = require('../controllers/diaryEntries');

/** return all answers */
router.get('/:id', asyncHandler(diaryEntries.getDiaryEntryById));
router.get('/', asyncHandler(diaryEntries.getDiaryEntriesOfUser));
router.post('/', asyncHandler(diaryEntries.addDiaryEntry));

module.exports = router;