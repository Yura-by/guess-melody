import React from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = (props) => {
  const {onPlayButtonClick, isLoading, isPlaying, children} = props;

  return (
    <>
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
    </>
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
};

export default AudioPlayer;
