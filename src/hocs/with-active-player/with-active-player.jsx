import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withPlayerSettings from '../with-player-settings/with-player-settings.jsx';

const AudioPlayerWrapped = withPlayerSettings(AudioPlayer);


const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    _onPlayButtonClick(index) {
      this.setState((prevProps) => {
        return {
          activePlayer: prevProps.activePlayer === index ? -1 : index
        };
      });
    }

    render() {
      const {activePlayer} = this.state;
      return <Component
        {...this.props}
        renderPlayer={(it, index) => {
          return (
            <AudioPlayerWrapped
              src={it.src}
              isPlaying={index === activePlayer}
              onPlayButtonClick={() => {
                this._onPlayButtonClick(index);
              }}
            />);
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
