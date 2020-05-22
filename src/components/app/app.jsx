import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameGenre from '../game-genre/game-genre.jsx';
import GameArtist from '../game-artist/game-artist.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GameScreen from '../game-screen/game-screen.jsx';

const questionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

export default class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      step: -1
    };


    this._onUserAnswer = this._onUserAnswer.bind(this);
  }

  _renderGameScreen() {
    const {settings: {gameTime: gameTime}, settings: {errorCount: errorCount}, questions} = this.props.gameData;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          time={gameTime}
          errorCount={errorCount}
          onStartButtonClick={() => {
            this.setState({
              step: 0
            });
          }}
        />);
    }

    if (question) {
      const {type} = question;
      switch (type) {
        case questionType.GENRE:
          return (
            <GameScreen
              type={type}
            >
              <GameGenre
                question={question}
                onAnswer={this._onUserAnswer}
              />
            </GameScreen>
          );
        case questionType.ARTIST:
          return (
            <GameScreen
              type={type}
            >
              <GameArtist
                question={question}
                onAnswer={this._onUserAnswer}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  _onUserAnswer() {
    this.setState(
        (prevState) => {
          return {
            step: prevState.step + 1
          };
        }
    );
  }

  render() {
    const {gameData: {questions}} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <GameArtist
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route path="/genre">
            <GameGenre
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
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
