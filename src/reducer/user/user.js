import history from '../../history.js';
import {AppRoute} from '../../const.js';

const ActionType = {
  IS_REQUIRE_AUTHORIZATION: `IS_REQUIRE_AUTHORIZATION`,
  ADD_USER_DATA: `ADD_USER_DATA`,
  BAD_LOGIN_DATA: `BAD_LOGIN_DATA`,
  RESET_USER_DATA: `RESET_USER_DATA`
};

const initialState = {
  isRequireAuthorization: true,
  userData: {},
  isBadLoginData: false
};

const resetState = {
  isBadLoginData: false
};

const ActionCreator = {
  requireAuthorization: (isAuthorization) => {
    return {
      type: ActionType.IS_REQUIRE_AUTHORIZATION,
      payload: isAuthorization
    };
  },

  resetData: () => ({
    type: ActionType.RESET_USER_DATA,
    payload: resetState
  }),

  loadUserData: (userData) => {
    return {
      type: ActionType.ADD_USER_DATA,
      payload: userData
    };
  },

  isBadLoginData: (isBad) => {
    return {
      type: ActionType.BAD_LOGIN_DATA,
      payload: isBad
    };
  }

};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.loadUserData(response.data));
        return response;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    const {email, password} = authData;
    return api.post(`/login`, {
      email,
      password
    })
      .then((response) => {
        dispatch(ActionCreator.loadUserData(response.data));
        dispatch(ActionCreator.isBadLoginData(false));
        dispatch(ActionCreator.requireAuthorization(false));
        history.push(AppRoute.ROOT);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch(ActionCreator.isBadLoginData(true));
        }
      });
  }

};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.IS_REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isRequireAuthorization: action.payload
      });
    case ActionType.ADD_USER_DATA:
      return Object.assign({}, state, {
        userData: action.payload
      });
    case ActionType.BAD_LOGIN_DATA:
      return Object.assign({}, state, {
        isBadLoginData: action.payload
      });
    case ActionType.RESET_USER_DATA:
      return Object.assign({}, state, action.payload);

  }

  return state;
};

export {reducer, ActionCreator, Operation, ActionType, initialState, resetState};
