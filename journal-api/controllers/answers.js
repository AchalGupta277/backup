const Answers = require("../models/answers");

const answers = {
    async addAnswer(body) {
        let answerModel = new Answers();
        console.log("In controller =====================");
        let answer = await answerModel.addAnswer(body);
        console.log("In controller =====================", answer);
        return answer;
    },
    
    async getAnswersOfQuestion() {
        let answerModel = new Answers();
        let allanswers = await answerModel.getAllanswers();
        return allanswers;
    }
}

module.exports = answers;