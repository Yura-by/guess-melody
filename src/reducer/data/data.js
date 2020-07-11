import adapterForQuestions from '../../adapter-for-questions/adapter-for-questions.js';

const ActionType = {
  ADD_QUIETIONS: `ADD_QUIETIONS`
};

const initialState = {
  questions: []
};

const ActionCreator = {
  addQuestions: (questions) => {
    return {
      type: ActionType.ADD_QUIETIONS,
      payload: questions
    };
  },
};

const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        return dispatch(ActionCreator.addQuestions(adapterForQuestions(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.ADD_QUIETIONS:
      return Object.assign({}, state, {
        questions: action.payload
      });
  }

  return state;
};

export {ActionCreator, reducer, Operation, ActionType};
