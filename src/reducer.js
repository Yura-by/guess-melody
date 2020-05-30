import questions from './mocks/questions.js';

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  gameTime: 5,
  questions,
};

const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, index) =>
    it === (question.answers[index].genre === question.genre)
  );

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let isAnswerCorrect = false;
    switch (question.type) {
      case (`artist`) :
        isAnswerCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case (`genre`) :
        isAnswerCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!isAnswerCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      const nextStep = state.step + action.payload;
      if (nextStep >= state.questions.length) {
        return Object.assign({}, initialState);
      }
      return Object.assign({}, state, {
        step: nextStep
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect, ActionCreator};
