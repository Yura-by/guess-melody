import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

export default class GameGenre extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: [],
      activePlayer: -1,
    };

    this._answerClickHandler = this._answerClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  _answerClickHandler(evt) {
    if (evt.target.checked === true) {
      const {answers} = this.props.question;
      const indexNumber = evt.target.value.slice(7);
      const answer = answers[indexNumber];

      this.setState((prevState) => {
        const answersState = prevState.userAnswers.slice();
        const isPresent = answersState.some((it) => it.src === answer.src && it.genre === answer.genre);
        if (!isPresent) {
          answersState.push(answer);
        }
        return {
          userAnswers: answersState
        };
      });
    }
  }

  _submitHandler(evt) {
    const {question, onAnswer} = this.props;
    evt.preventDefault();
    onAnswer(question, this.state.userAnswers);
  }

  render() {
    const {question} = this.props;
    const {genre, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={this._submitHandler}
        >

          {answers.map((answer, index) => {
            const {src, id} = answer;
            return (
              <div className="track" key={id}>
                <AudioPlayer
                  src={src}
                  isPlaying={index === this.state.activePlayer}
                  onPlayButtonClick={() => {
                    this.setState(({activePlayer}) => {
                      return {
                        activePlayer: activePlayer === index ? -1 : index
                      };
                    });
                  }}
                />
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    onClick={this._answerClickHandler}
                    type="checkbox" name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
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
};
