// import questions from './mocks/questions.js';
import adapterForQuestions from './adapter-for-questions/adapter-for-questions.js';

const initialState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 2,
  gameTime: 40,
  currentTime: 0,
  questions: [],
  timerId: -1,
  isRequireAuthorization: true,
  userData: {},
  badLoginData: false
};

const resetState = {
  step: -1,
  mistakes: 0,
  currentTime: 0,
  timerId: -1,
  isRequireAuthorization: false,
  badLoginData: false
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
      // return {
      //   type: `RESET`
      // };
    }
    return {
      type: `INCREMENT_STEP`,
      payload: 1
    };
  },

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
      payload: -2
    };
  },

  resetGame: () => ({
    type: `RESET`,
    payload: resetState
  }),

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
      // return {
      //   type: `TIME_ENDED`,
      //   payload: -2
      // };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1
    };
  },

  requireAutorization: (isAutorization) => {
    return {
      type: `IS_REQUIRE_AUTHORIZATION`,
      payload: isAutorization
    };
  },

  addQuestions: (questions) => {
    return {
      type: `ADD_QUIETIONS`,
      payload: questions
    };
  },

  loadUserData: (userData) => {
    return {
      type: `ADD_USER_DATA`,
      payload: userData
    };
  },

  badLoginData: (isBad) => {
    return {
      type: `BAD_LOGIN_DATA`,
      payload: isBad
    };
  }
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        return dispatch(ActionCreator.addQuestions(adapterForQuestions(response.data)));
      });
  },

  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAutorization(false));
        dispatch(ActionCreator.loadUserData(response.data));
        return response;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    const {email, password} = authData;
    api.post(`/login`, {
      email,
      password
    })
      .then((response) => {
        dispatch(ActionCreator.loadUserData(response.data));
        dispatch(ActionCreator.badLoginData(false));
        dispatch(ActionCreator.requireAutorization(false));
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch(ActionCreator.badLoginData(true));
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step >= -1 ? state.step + action.payload : state.step
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload
      });
    case `RESET`:
      return Object.assign({}, state, action.payload);
    case `REDUCE_TIME`:
      return Object.assign({}, state, {
        currentTime: action.payload
      });
    case `TIME_ENDED`:
      return Object.assign({}, state, {
        step: action.payload
      });
    case `SET_TIMER_ID`:
      return Object.assign({}, state, {
        timerId: action.payload
      });
    case `IS_REQUIRE_AUTHORIZATION`:
      return Object.assign({}, state, {
        isRequireAuthorization: action.payload
      });
    case `ADD_QUIETIONS`:
      return Object.assign({}, state, {
        questions: action.payload
      });
    case `ADD_USER_DATA`:
      return Object.assign({}, state, {
        userData: action.payload
      });
    case `BAD_LOGIN_DATA`:
      return Object.assign({}, state, {
        badLoginData: action.payload
      });
  }

  return state;
};

export {reducer, isArtistAnswerCorrect, isGenreAnswerCorrect, ActionCreator, Operation};
