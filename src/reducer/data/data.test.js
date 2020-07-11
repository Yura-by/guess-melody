import {reducer, ActionCreator, ActionType, Operation} from './data.js';
import createApi from '../../api.js';
import MockAdapter from 'axios-mock-adapter';

describe(`Data reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: []
    });
  });

  it(`Reducer correctly addQuestions`, () => {
    expect(reducer({questions: []}, {
      type: ActionType.ADD_QUIETIONS,
      payload: [{id: 1}, {id: 2}, {id: 3}]
    })).toEqual({
      questions: [{id: 1}, {id: 2}, {id: 3}]
    });
  });
});

describe(`Data ActionCreator works correctly`, () => {
  it(`ActionCreator create action with questions`, () => {
    expect(ActionCreator.addQuestions([{id: 1}, {id: 2}, {id: 3}]))
      .toEqual({
        type: ActionType.ADD_QUIETIONS,
        payload: [{id: 1}, {id: 2}, {id: 3}]
      });
  });

});


describe(`Operation works correctly`, () => {
  it(`loadQuestions works correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return Operation.loadQuestions()(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: [{"fake": true}],
          type: ActionType.ADD_QUIETIONS
        });
      }
      );
  });

});
