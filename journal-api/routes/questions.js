const express = require('express');
const router = express.Router();

const questions = require('../controllers/questions');

router.get('/:questionId/answers', async (req, res) => {
    let result = await questions.getAllAnswersToQuestion(req.params.questionId);
    res.send(result)
})

router.get('/:questionId/questionAnswers', async (req, res) => {
    let result = await questions.getQuestionAnswers(req.params.questionId);
    res.send(result)
})

/** return all questions */
router.get('/', async (req, res) => {
    let result = await questions.getAllQuestions();
    res.send(result)
})

module.exports = router;