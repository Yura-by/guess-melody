import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import {getStep, getMistakes, getGameTime, getMaxMistakes, getTimerId, getCurrentTime} from '../../reducer/game/selectors.js';
import {getQuestions} from '../../reducer/data/selectors.js';
import {getIsRequireAuthorization, getIsBadLoginData} from '../../reducer/user/selectors.js';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game.js';
import {ActionCreator as UserActionCreator} from '../../reducer/user/user.js';

import {Operation as UserOperation} from '../../reducer/user/user.js';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import GameGenre from '../../components/game-genre/game-genre.jsx';
import GameArtist from '../../components/game-artist/game-artist.jsx';
import GameScreen from '../../components/game-screen/game-screen.jsx';
import FailTime from '../../components/fail-time/fail-time.jsx';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen.jsx';
import WinScreen from '../../components/win-screen/win-screen.jsx';
import GameOver from '../../components/game-over/game-over.jsx';

import Timer from '../../timer.js';

import withActivePlayer from '../with-active-player/with-active-player.jsx';
import withUserAnswer from '../with-user-answer/with-user-answer.jsx';
import withTransformProps from '../with-transform-props/with-transform-props.jsx';

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer
  });
  delete newProps.renderPlayer;
  return newProps;
};

const transformPlayerToQuestion = (props) => {
  const newProps = Object.assign({}, props, {
    renderQuestion: props.renderPlayer
  });
  delete newProps.renderPlayer;
  return newProps;
};

const GameGenreWrapped = withUserAnswer(
    withActivePlayer(
        withTransformProps(transformPlayerToAnswer)(GameGenre)));

const GameArtistWrapped = withActivePlayer(
    withTransformProps(transformPlayerToQuestion)(GameArtist));

const questionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {

    constructor(props) {
      super(props);
      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        renderScreen={this._getScreen}
      />;
    }

    _getScreen() {
      const {
        gameTime,
        questions,
        mistakes,
        maxMistakes,
        step,
        onWelcomeScreenClick,
        onUserAnswer,
        onUserResetGame,
        timerId,
        isRequireAuthorization,
        onUserLogin,
        isBadLoginData,
        currentTime
      } = this.props;

      const question = questions[step];

      if (isRequireAuthorization) {
        return <AuthorizationScreen
          onAuthFormSubmit={onUserLogin}
          isBadLoginData={isBadLoginData ? true : false}
        />;
      }

      if (step === -2) {
        return (
          <FailTime
            onUserClick={onUserResetGame}
          />
        );
      }

      if (mistakes >= maxMistakes) {
        return <GameOver
          onResetGame={onUserResetGame}
        />;
      }

      if (!question) {
        if (step > questions.length - 1) {
          return <WinScreen
            gameTime={gameTime}
            currentTime={currentTime}
            mistakes={mistakes}
            onResetGame={onUserResetGame}
          />;
        } else {

          return <WelcomeScreen
            time={gameTime / 60}
            errorCount={maxMistakes}
            onStartButtonClick={
              () => {
                onWelcomeScreenClick(gameTime, timerId, step, questions.length);
              }
            }
          />;
        }
      }

      if (question) {
        const {type} = question;
        switch (type) {
          case questionType.GENRE:
            return (
              <GameScreen
                type={type}
              >
                <GameGenreWrapped
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
                <GameArtistWrapped
                  question={question}
                  onAnswer={(userAnswer) => {
                    onUserAnswer(userAnswer, question, mistakes, maxMistakes, step, timerId, questions.length);
                  }}
                />
              </GameScreen>
            );
        }
      }

      return null;
    }
  }

  WithScreenSwitch.propTypes = {
    gameTime: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    onUserResetGame: PropTypes.func,
    timerId: PropTypes.number.isRequired,
    isRequireAuthorization: PropTypes.bool.isRequired,
    onUserLogin: PropTypes.func.isRequired,
    isBadLoginData: PropTypes.bool.isRequired,
    currentTime: PropTypes.number.isRequired
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state) => {
  return {
    step: getStep(state),
    mistakes: getMistakes(state),
    gameTime: getGameTime(state),
    questions: getQuestions(state),
    maxMistakes: getMaxMistakes(state),
    timerId: getTimerId(state),
    isRequireAuthorization: getIsRequireAuthorization(state),
    isBadLoginData: getIsBadLoginData(state),
    currentTime: getCurrentTime(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: (gameTime, currentTimerId, step, questionsLength) => {
    dispatch(GameActionCreator.incrementStep(step, currentTimerId, questionsLength));
    const timer = new Timer(gameTime, () => {
      clearInterval(timerID);
      dispatch(GameActionCreator.timeEnded());
    });

    let timerID = setInterval(() => {
      timer.tick();
      dispatch(GameActionCreator.reduceTime(timer.getLastTime()));
    }, 1000);
    dispatch(GameActionCreator.setTimerId(timerID));
  },

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes, step, timerId, questionsLength) => {
    dispatch(GameActionCreator.incrementMistake(userAnswer, question, mistakes, maxMistakes, timerId));
    dispatch(GameActionCreator.incrementStep(step, timerId, questionsLength));
  },

  onUserResetGame: () => {
    dispatch(GameActionCreator.resetGame());
    dispatch(UserActionCreator.resetData());
  },

  onUserLogin(userData) {
    dispatch(UserOperation.login(userData));
  }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
