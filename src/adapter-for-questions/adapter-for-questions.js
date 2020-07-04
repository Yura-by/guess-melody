const getRandomId = () => {
  return Math.floor(Date.now() + Math.random() * 1e12);
};

const adapterForOneQuestion = (question) => {
  if (question.hasOwnProperty(`answers`)) {
    const {answers} = question;
    const newAnswers = answers.map((answer) => {
      return Object.assign({}, answer, {
        id: getRandomId()
      });
    });
    return Object.assign({}, question, {
      answers: newAnswers
    });
  }

  return question;
};

const adapterForQuestions = (questions) => {
  return questions.map((question) => adapterForOneQuestion(question));
};

export default adapterForQuestions;
