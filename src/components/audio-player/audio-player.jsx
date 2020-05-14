import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying
    };

    this._audio = null;

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={this._onPlayButtonClick}
      >
      </button>
    );
  }

  componentDidMount() {
    const {src} = this.props;

    this._audio = new Audio(src);

    this._audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true
      });
    };

    this._audio.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };

    this._audio.ontimeupdate = () => {
      this.setState({
        progress: this._audio.currentTime
      });
    };
  }

  componentWillUnmount() {
    this._audio.oncanplaythrough = null;
    this._audio.onplay = null;
    this._audio.onpause = null;
    this._audio.ontimeupdate = null;
    this._audio.src = ``;
    this._audio = null;
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  _onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState(({isPlaying}) => {
      return {
        isPlaying: !isPlaying
      };
    });
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};
