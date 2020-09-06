const Questions = require("../models/questions");
const Answers = require("../models/answers");

const questions = {
    async getAllQuestions() {
        let questionModel = new Questions();
        let allQuestions = await questionModel.getAllQuestions();
        return allQuestions;
    },

    async getAllAnswersToQuestion(questionId) {
        let answerModel = new Answers();
        let allAnswers = await answerModel.getAnswersToQuestion(questionId);
        return allAnswers;
    },

    async getQuestionAnswers(questionId) {
        let answerModel = new Answers();
        let questionModel = new Questions();
        let question = await questionModel.getQuestionById(questionId);
        let allAnswers = await answerModel.getAnswersToQuestion(questionId);
        return {
            question: question[0].text,
            answers: allAnswers
        };
    }
}

module.exports = questions;