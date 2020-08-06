import * as React from 'react';

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

export default AudioPlayer;
