import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';

export default class GameArtist extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {question, onAnswer} = this.props;
    const {answers, song} = question;
    const {isPlaying} = this.state;

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
              <AudioPlayer
                src={song.src}
                isPlaying={isPlaying}
                onPlayButtonClick={() => {
                  this.setState((prevState) => {
                    return {
                      isPlaying: !prevState.isPlaying
                    };
                  });
                }}
              />
            </div>
          </div>

          <form
            className="game__artist"
            onChange={(evt) => {
              const answerIndex = evt.target.value.slice(7);
              onAnswer(question, answers[answerIndex]);
            }}
          >

            {question.answers.map((answer, index) => {
              const {picture, artist, id} = answer;
              return (
                <div className="artist" key={id}>
                  <input
                    className="artist__input visually-hidden"
                    type="radio"
                    name="answer"
                    value={`artist-${index}`}
                    id={`artist-${index}`}
                  />
                  <label className="artist__name" htmlFor={`artist-${index}`}>
                    <img className="artist__picture" src={picture} alt={artist} />
                    {artist}
                  </label>
                </div>
              );
            })}
          </form>
        </section>
      </section>
    );
  }
}

GameArtist.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequires,
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired
    })).isRequired
  }),
  onAnswer: PropTypes.func.isRequired,
};
