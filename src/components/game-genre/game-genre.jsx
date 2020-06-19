import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class GameGenre extends PureComponent {

  render() {
    const {question, onAnswer, userAnswers, renderPlayer, onChange} = this.props;
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
                {renderPlayer(answer, index)}
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

GameGenre.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    }))
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
