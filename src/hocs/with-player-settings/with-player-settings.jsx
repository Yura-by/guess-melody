import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withPlayerSettings = (Component) => {
  class WithPlayerSettings extends PureComponent {

    constructor(props) {
      super(props);

      this._audioRef = createRef();

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
      return <Component
        {...this.props}
        reference={this._audioRef}
        isLoading={isLoading}
        isPlaying={isPlaying}
        onPlayButtonClick={this._buttonClickHandler}
      />;
    }

    _buttonClickHandler() {
      this.props.onPlayButtonClick();
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

    componentDidUpdate() {
      const audio = this._audioRef.current;
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  WithPlayerSettings.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired
  };

  return WithPlayerSettings;
};

export default withPlayerSettings;
