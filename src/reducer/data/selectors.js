import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

const randomFilter = () => Math.random > 0.5;

const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => resultTwo && it.type === `artist`);
    }
);

const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `genre`);
    }
);

export {getQuestions, getArtistQuestions, getGenreQuestions};
