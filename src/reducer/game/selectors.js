import NameSpace from '../name-space.js';

const getStep = (state) => {
  return state[NameSpace.GAME].step;
};

const getMistakes = (state) => {
  return state[NameSpace.GAME].mistakes;
};

const getCurrentTime = (state) => {
  return state[NameSpace.GAME].currentTime;
};

const getTimerId = (state) => {
  return state[NameSpace.GAME].timerId;
};

const getGameTime = (state) => {
  return state[NameSpace.GAME].gameTime;
};

const getMaxMistakes = (state) => {
  return state[NameSpace.GAME].maxMistakes;
};


export {getStep, getMistakes, getCurrentTime, getTimerId, getGameTime, getMaxMistakes};
