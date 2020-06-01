import questions from './mocks/questions.js';

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  gameTime: 20,
  currentTime: 0,
  questions,
  timerId: -1
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

  reduceTime: (currentTime) => {
    return {
      type: `REDUCE_TIME`,
      payload: currentTime
    };
  },

  setTimerId: (timerId) => {
    return {
      type: `SET_TIMER_ID`,
      payload: timerId
    };
  },

  timeEnded: () => {
    return {
      type: `TIME_ENDED`,
    };
  },

  resetGame: () => ({
    type: `RESET`
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
        clearInterval(state.timerId);
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
    case `REDUCE_TIME`:
      return Object.assign({}, state, {
        currentTime: action.payload
      });
    case `TIME_ENDED`:
      return Object.assign({}, state, {
        step: -2
      });
    case `SET_TIMER_ID`:
      return Object.assign({}, state, {
        timerId: action.payload
      });
  }

  return state;
};

export {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect, ActionCreator};
