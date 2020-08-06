import * as React from 'react';
import {Subtract} from 'utility-types';

import AudioPlayer from '../../components/audio-player/audio-player';
import withPlayer from '../../hocs/with-player/with-player';
import {ArtistQuestion, GenreQuestion, RenderPlayer, GenreAnswer, Song} from '../../types';

interface State {
  activePlayer: number;
};

interface Props {
  question: ArtistQuestion | GenreQuestion;
};

interface InjectingProps {
  renderPlayer: RenderPlayer;
};

const AudioPlayerWrapped = withPlayer(AudioPlayer);

const withActivePlayer = (Component) => {

  type P = React.ComponentProps<typeof Component>;

  type T = Props & Subtract<P, InjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    _onPlayButtonClick(index: number) {
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
        renderPlayer={(it: GenreAnswer | Song, index: number): React.ReactElement => {
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

  return WithActivePlayer;
};

export default withActivePlayer;
