import {reducer, ActionCreator, ActionType, Operation, initialState, resetState} from './user.js';
import createApi from '../../api.js';
import MockAdapter from 'axios-mock-adapter';

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer correctly set requireAuthorization`, () => {
    expect(reducer({
      isRequireAuthorization: false,
      userData: {},
      isBadLoginData: false
    }, {
      type: ActionType.IS_REQUIRE_AUTHORIZATION,
      payload: true
    })).toEqual({
      isRequireAuthorization: true,
      userData: {},
      isBadLoginData: false
    });
  });

  it(`Reducer correctly set ueserData`, () => {
    expect(reducer({
      isRequireAuthorization: false,
      userData: {},
      isBadLoginData: false
    }, {
      type: ActionType.ADD_USER_DATA,
      payload: {name: `Oliver`}
    })).toEqual({
      isRequireAuthorization: false,
      userData: {name: `Oliver`},
      isBadLoginData: false
    });
  });

  it(`Reducer correctly set badLogin`, () => {
    expect(reducer({
      isRequireAuthorization: false,
      userData: {},
      isBadLoginData: true
    }, {
      type: ActionType.BAD_LOGIN_DATA,
      payload: false
    })).toEqual({
      isRequireAuthorization: false,
      userData: {},
      isBadLoginData: false
    });
  });

  it(`Reducer correctly reset userData`, () => {
    expect(reducer({
      isRequireAuthorization: true,
      userData: {name: `Den`},
      isBadLoginData: true
    }, {
      type: ActionType.RESET_USER_DATA,
      payload: resetState
    })).toEqual({
      isRequireAuthorization: false,
      userData: {name: `Den`},
      isBadLoginData: false
    });
  });

});

describe(`User ActionCreator works correctly`, () => {

  it(`ActionCreator create action with requireAuthorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.IS_REQUIRE_AUTHORIZATION,
      payload: true
    });
  });

  it(`ActionCreator create action with reset data`, () => {
    expect(ActionCreator.resetData()).toEqual({
      type: ActionType.RESET_USER_DATA,
      payload: resetState
    });
  });

  it(`ActionCreator create action with user data`, () => {
    expect(ActionCreator.loadUserData({name: `Den`})).toEqual({
      type: ActionType.ADD_USER_DATA,
      payload: {name: `Den`}
    });
  });

  it(`ActionCreator create action with bad login data`, () => {
    expect(ActionCreator.isBadLoginData(false)).toEqual({
      type: ActionType.BAD_LOGIN_DATA,
      payload: false
    });
  });

});

describe(`User Operation works correctly`, () => {

  it(`checkAuth works correctly`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const apiMock = new MockAdapter(api);

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return Operation.checkAuth()(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: false,
          type: ActionType.IS_REQUIRE_AUTHORIZATION
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          payload: [{fake: true}],
          type: ActionType.ADD_USER_DATA
        });
      }
      );
  });

  it(`login works correctly when answer 200`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const mockData = {
      email: `www`,
      password: `ooo`
    };

    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return Operation.login(mockData)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: [{fake: true}],
          type: ActionType.ADD_USER_DATA
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          payload: false,
          type: ActionType.BAD_LOGIN_DATA
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          payload: false,
          type: ActionType.IS_REQUIRE_AUTHORIZATION
        });
      }
      );
  });

  it(`login works correctly when answer 400`, () => {
    const dispatch = jest.fn();
    const api = createApi(dispatch);

    const mockData = {
      email: `www`,
      password: `ooo`
    };

    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`/login`)
      .reply(400);

    return Operation.login(mockData)(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          payload: true,
          type: ActionType.BAD_LOGIN_DATA
        });

      }
      );
  });
});
