const ActionType = {
  INCREMENT_STEP: `INCREMENT_STEP`,
  REDUCE_TIME: `REDUCE_TIME`,
  SET_TIMER_ID: `SET_TIMER_ID`,
  RESET_GAME: `RESET_GAME`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`
};

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  gameTime: 120,
  currentTime: 0,
  timerId: -1,
};

const resetState = {
  step: -1,
  mistakes: 0,
  currentTime: 0,
  timerId: -1
};

const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, index) =>
    it === (question.answers[index].genre === question.genre)
  );

const ActionCreator = {
  incrementStep: (step, timerId, questionsLength) => {
    const nextStep = step + 1;
    if (nextStep >= questionsLength) {
      clearInterval(timerId);
    }
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1
    };
  },

  reduceTime: (currentTime) => {
    return {
      type: ActionType.REDUCE_TIME,
      payload: currentTime
    };
  },

  setTimerId: (timerId) => {
    return {
      type: ActionType.SET_TIMER_ID,
      payload: timerId
    };
  },

  resetGame: (timerId) => {
    clearInterval(timerId);
    return {
      type: ActionType.RESET_GAME,
      payload: resetState
    };
  },

  incrementMistake: (userAnswer, question, mistakes, maxMistakes, timerId) => {
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
      clearInterval(timerId);
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: isAnswerCorrect ? 0 : 1
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step >= -1 ? state.step + action.payload : state.step
      });
    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case ActionType.RESET_GAME:
      return Object.assign({}, state, action.payload);
    case ActionType.REDUCE_TIME:
      return Object.assign({}, state, {
        currentTime: action.payload
      });
    case ActionType.SET_TIMER_ID:
      return Object.assign({}, state, {
        timerId: action.payload
      });
  }

  return state;
};

export {ActionCreator, reducer, ActionType, initialState, resetState, isArtistAnswerCorrect, isGenreAnswerCorrect};
