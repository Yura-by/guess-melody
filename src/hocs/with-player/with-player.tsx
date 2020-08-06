import * as React from 'react';
import {Subtract} from 'utility-types';

interface Props {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
};

interface State {
  progress: number;
  isLoading: boolean;
  isPlaying: boolean;
};

interface InjectedProps {
  isLoading: boolean;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
};

const withPlayer = (NeededComponent) => {

  type P = React.ComponentProps<typeof NeededComponent>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithPlayer extends React.Component<T, State> {
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

    private _buttonClickHandler() {
      const {onPlayButtonClick} = this.props;
      onPlayButtonClick();
      this.setState(({isPlaying}) => {
        return {
          isPlaying: !isPlaying
        };
      });
    }

    private _setIsPlaying() {
      this.setState({
        isPlaying: true
      });
    }

    private _setIsNotPlaying() {
      this.setState({
        isPlaying: false
      });
    }

    private _setProgress() {
      const audio = this._audioRef.current;
      this.setState({
        progress: audio.currentTime
      });
    }

    private _setIsLoading() {
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

  return WithPlayer;
};

export default withPlayer;
