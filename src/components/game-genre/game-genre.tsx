import * as React from 'react';
import {GenreQuestion, GenreAnswer} from '../../types';
// import PropTypes from 'prop-types';

interface Props {
  question: GenreQuestion;
  onAnswer: (ansers: boolean[]) => void;
  userAnswers: boolean[];
  renderAnswer: (answer: GenreAnswer, index: number) => React.ReactElement;
  onChange: (indes: number) => void;
};

export default class GameGenre extends React.PureComponent<Props, null> {

  render() {
    const {question, onAnswer, userAnswers, renderAnswer, onChange} = this.props;
    const {genre, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(userAnswers);
          }}
        >
          {answers.map((answer, index) => {
            const {id} = answer;
            return (
              <div className="track" key={id}>
                {renderAnswer(answer, index)}
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox" name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    checked={userAnswers[index]}
                    onChange={() => {
                      onChange(index);
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            );
          })}

          <button
            className="game__submit button"
            type="submit"
          >Ответить
          </button>
        </form>
      </section>
    );
  }
}

// GameGenre.propTypes = {
//   question: PropTypes.shape({
//     type: PropTypes.oneOf([`genre`]).isRequired,
//     genre: PropTypes.string.isRequired,
//     answers: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       src: PropTypes.string.isRequired,
//       genre: PropTypes.string.isRequired
//     }))
//   }).isRequired,
//   onAnswer: PropTypes.func.isRequired,
//   renderAnswer: PropTypes.func.isRequired,
//   userAnswers: PropTypes.array.isRequired,
//   onChange: PropTypes.func.isRequired
// };
