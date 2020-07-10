import NameSpace from '../name-space.js';

const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

export {getQuestions};
