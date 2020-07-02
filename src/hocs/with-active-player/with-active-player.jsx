import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withPlayer from '../../hocs/with-player/with-player.jsx';

const AudioPlayerWrapped = withPlayer(AudioPlayer);

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

    componentDidUpdate(prevProps) {
      if (prevProps.question !== this.props.question) {
        this.setState({activePlayer: -1});
      }
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

  WithActivePlayer.propTypes = {question: PropTypes.object.isRequired};

  return WithActivePlayer;
};

export default withActivePlayer;
