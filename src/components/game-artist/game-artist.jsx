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
        >

          {answers.map((answer, index) => {
            const {picture, artist, id} = answer;
            return (
              <div className="artist" key={id}>
                <input
                  className="artist__input visually-hidden"
                  type="radio"
                  name="answer"
                  value={`artist-${index}`}
                  id={`artist-${index}`}
                  onClick={(evt) => {
                    evt.preventDefault();
                    onAnswer(answer);
                  }}
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
