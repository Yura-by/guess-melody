import * as React from 'react';
// import PropTypes from 'prop-types';

interface Props {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
};

interface State {

};

const withPlayer = (NeededComponent) => {
  class WithPlayer extends React.Component {
    private _audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: false
      };

      this._buttonClickHandler = this._buttonClickHandler.bind(this);
      this._setIsPlaying = this._setIsPlaying.bind(this);
      this._setIsNotPlaying = this._setIsNotPlaying.bind(this);
      this._setProgress = this._setProgress.bind(this);
      this._setIsLoading = this._setIsLoading.bind(this);
    }

    render() {
      const {isLoading, isPlaying} = this.state;
      return <NeededComponent
        {...this.props}
        isLoading={isLoading}
        isPlaying={isPlaying}
        onPlayButtonClick={this._buttonClickHandler}
      >
        <audio
          ref={this._audioRef}
        />
      </NeededComponent>;
    }

    _buttonClickHandler() {
      const {onPlayButtonClick} = this.props;
      onPlayButtonClick();
      this.setState(({isPlaying}) => {
        return {
          isPlaying: !isPlaying
        };
      });
    }

    _setIsPlaying() {
      this.setState({
        isPlaying: true
      });
    }

    _setIsNotPlaying() {
      this.setState({
        isPlaying: false
      });
    }

    _setProgress() {
      const audio = this._audioRef.current;
      this.setState({
        progress: audio.currentTime
      });
    }

    _setIsLoading() {
      this.setState({
        isLoading: false
      });
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = this._setIsLoading;

      audio.onplay = this._setIsPlaying;

      audio.onpause = this._setIsNotPlaying;

      audio.ontimeupdate = this._setProgress;
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;
      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.progress !== this.state.progress) {
        return false;
      }

      return true;
    }

    componentDidUpdate(prevProps) {
      const audio = this._audioRef.current;
      if (prevProps.src !== this.props.src) {
        audio.pause();
        audio.src = this.props.src;
        this.setState({
          isLoading: true,
          isPlaying: false,
        });
        return;
      }
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  // WithPlayer.propTypes = {
  //   isPlaying: PropTypes.bool.isRequired,
  //   src: PropTypes.string.isRequired,
  //   onPlayButtonClick: PropTypes.func.isRequired
  // };

  return WithPlayer;
};

export default withPlayer;
