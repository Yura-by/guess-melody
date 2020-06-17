import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class GameGenre extends PureComponent {
  constructor(props) {
    super(props);
    const {answers} = props.question;

    this.state = {
      userAnswers: new Array(answers.length).fill(false)
    };
  }

  render() {
    const {question, onAnswer, renderPlayer} = this.props;
    const {genre, answers} = question;
    const {userAnswers} = this.state;
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
                      this.setState((prevState) => {
                        const newAnswers = [...prevState.userAnswers];

                        newAnswers[index] = !newAnswers[index];
                        return {userAnswers: newAnswers};
                      });
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
  renderPlayer: PropTypes.func.isRequired
};
