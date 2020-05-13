import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

export default class GameGenre extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userAnswers: []
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
    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {question.genre} треки</h2>
          <form
            className="game__tracks"
            onSubmit={this._submitHandler}
          >

            {question.answers.map((answer, index) => {
              const {src, id} = answer;
              return (
                <div className="track" key={id}>
                  {/* <button className="track__button track__button--play" type="button"></button> */}
                  <AudioPlayer
                    src={src}
                  />
                  <div className="track__status">
                    {/* <audio src={answer.src}></audio> */}
                  </div>
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
      </section>
    );
  }
}

GameGenre.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.oneOf([`genre`]).isRequired,
    genre: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired
    }))
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};
