const express = require('express');
const router = express.Router();

const answers = require('../controllers/answers');

/** return all answers */
router.post('/', async (req, res) => {
    console.log("In route =====================");
    let result = await answers.addAnswer(req.body);
    console.log("In route =====================", result);
    res.send(result)
})

module.exports = router;