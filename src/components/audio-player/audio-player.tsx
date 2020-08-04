import * as React from 'react';
// import PropTypes from 'prop-types';

interface Props {
  isPlaying: boolean;
  isLoading: boolean;
  onPlayButtonClick: () => void;
};

const AudioPlayer: React.FunctionComponent<Props> = (props) => {
  const {onPlayButtonClick, isLoading, isPlaying, children} = props;
  return (
    <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      >
      </button>
      <div className="track__status">
        {children}
      </div>
    </React.Fragment>
  );
};

// AudioPlayer.propTypes = {
//   isPlaying: PropTypes.bool.isRequired,
//   onPlayButtonClick: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.object
//   ])
// };

export default AudioPlayer;
