import NameSpace from '../name-space.js';

const getIsRequireAuthorization = (state) => {
  return state[NameSpace.USER].isRequireAuthorization;
};

const getUserData = (state) => {
  return state[NameSpace.USER].userData;
};

const getIsBadLoginData = (state) => {
  return state[NameSpace.USER].isBadLoginData;
};

export {getIsRequireAuthorization, getUserData, getIsBadLoginData};
