import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameGenre from '../game-genre/game-genre.jsx';
import GameArtist from '../game-artist/game-artist.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GameScreen from '../game-screen/game-screen.jsx';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import Timer from '../../timer.js';
import FailTime from '../fail-time/fail-time.jsx';

const questionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

class App extends PureComponent {

  _renderGameScreen() {
    const {
      gameTime,
      questions,
      mistakes,
      maxMistakes,
      step,
      onWelcomeScreenClick,
      onUserAnswer,
      onUserResetGame,
      timerId
    } = this.props;

    const question = questions[step];

    if (step === -1 || step >= questions.length) {

      return (
        <WelcomeScreen
          time={gameTime / 60}
          errorCount={maxMistakes}
          onStartButtonClick={
            () => {
              onWelcomeScreenClick(gameTime, timerId, step, questions.length);
            }
          }
        />);
    }

    if (step === -2) {
      return (
        <FailTime
          onUserClick={onUserResetGame}
        />
      );
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
                onAnswer={(userAnswer) => {
                  onUserAnswer(userAnswer, question, mistakes, maxMistakes, step, timerId, questions.length);
                }}
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
                onAnswer={(userAnswer) => {
                  // userAnswer, question, mistakes, maxMistakes, timerId, step, questionsLength
                  onUserAnswer(userAnswer, question, mistakes, maxMistakes, step, timerId, questions.length);
                }}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;
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
      maxMistakes: PropTypes.number.isRequired
    }).isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    step: state.step,
    mistakes: state.mistakes,
    gameTime: state.gameTime,
    questions: state.questions,
    maxMistakes: state.maxMistakes,
    timerId: state.timerId,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: (gameTime, currentTimerId, step, questionsLength) => {
    dispatch(ActionCreator.incrementStep(step, currentTimerId, questionsLength));
    const timer = new Timer(gameTime, () => {
      clearInterval(timerID);
      dispatch(ActionCreator.timeEnded());
    });

    let timerID = setInterval(() => {
      timer.tick();
      dispatch(ActionCreator.reduceTime(timer.getLastTime()));
    }, 1000);
    dispatch(ActionCreator.setTimerId(timerID));
  },

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, timerId, questionsLength) => {
    dispatch(ActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes, timerId));
    dispatch(ActionCreator.incrementStep(step, timerId, questionsLength));
  },

  onUserResetGame: () => {
    dispatch(ActionCreator.resetGame());
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
