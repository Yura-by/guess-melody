import React from 'react';
import PropTypes from 'prop-types';

const GameArtist = (props) => {
  const {question, onAnswer, questionNumber} = props;
  return (
    <section className="game game--artist">
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
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio></audio>
            </div>
          </div>
        </div>

        <form
          className="game__artist"
          onChange={(evt) => {
            const {answers} = question;
            const answerIndex = evt.target.value.slice(7);
            onAnswer(question, answers[answerIndex]);
          }}
        >

          {question.answers.map((answer, index) => {
            return (
              <div className="artist" key={`${questionNumber}-${index}`}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`artist-${index}`}
                  id={`artist-${index}`}
                />
                <label className="artist__name" htmlFor={`artist-${index}`}>
                  <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                  {answer.artist}
                </label>
              </div>
            );
          })}
        </form>
      </section>
    </section>
  );
};

GameArtist.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequires,
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  onAnswer: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired
};

export default GameArtist;
