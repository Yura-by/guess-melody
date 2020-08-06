import * as React from 'react';
import {ArtistQuestion, ArtistAnswer, Song, RenderPlayer} from '../../types';
// import PropTypes from 'prop-types';

interface Props {
  question: ArtistQuestion;
  onAnswer: (answer: ArtistAnswer) => void;
  renderQuestion: RenderPlayer;
};

// renderQuestion: (song: Song, index: number) => React.ReactElement;

const GameArtist: React.FunctionComponent<Props> = (props) => {
  const {question, onAnswer, renderQuestion} = props;
  const {answers, song} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderQuestion<Song>(song, 0)}
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
};

// GameArtist.propTypes = {
//   question: PropTypes.shape({
//     type: PropTypes.string.isRequired,
//     song: PropTypes.shape({
//       artist: PropTypes.string.isRequired,
//       src: PropTypes.string.isRequires,
//     }).isRequired,
//     answers: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       picture: PropTypes.string.isRequired,
//       artist: PropTypes.string.isRequired
//     })).isRequired
//   }),
//   onAnswer: PropTypes.func.isRequired,
//   renderQuestion: PropTypes.func.isRequired
// };

export default GameArtist;
