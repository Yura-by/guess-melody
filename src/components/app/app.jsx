import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameGenre from '../game-genre/game-genre.jsx';
import GameArtist from '../game-artist/game-artist.jsx';

export default class App extends PureComponent {

  static getScreen(question, props, onUserAnswer) {
    if (question === -1) {
      const {settings: {gameTime: gameTime}, settings: {errorCount: errorCount}} = props.gameData;

      return (
        <WelcomeScreen
          time={gameTime}
          errorCount={errorCount}
          onStartButtonClick={onUserAnswer}
        />
      );
    }

    const {questions} = props.gameData;
    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return (
          <GameGenre
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );

      case `artist`:
        return (
          <GameArtist
            question={currentQuestion}
            onAnswer={onUserAnswer}
          />
        );
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      question: -1
    };

    this.clickScreenHandler = this.clickScreenHandler.bind(this);
  }

  clickScreenHandler() {
    const {questions} = this.props.gameData;

    this.setState(
        (prevState) => {
          const nextIndex = prevState.question + 1;
          const isEnd = nextIndex >= questions.length;
          return Object.assign({}, prevState, {
            question: !isEnd ? nextIndex : -1
          });
        }
    );
  }

  render() {
    const {question} = this.state;
    return App.getScreen(question, this.props, this.clickScreenHandler);
  }
}

App.propTypes = {
  gameData: PropTypes.shape({
    settings: PropTypes.shape({
      gameTime: PropTypes.number.isRequired,
      errorCount: PropTypes.number.isRequired
    }).isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
  })
};
