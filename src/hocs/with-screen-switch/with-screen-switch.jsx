import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Route, Switch, Redirect, Router} from 'react-router-dom';
import history from '../../history.js';

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
import PrivateRoute from '../../components/private-route/private-route.jsx';

import Timer from '../../timer/timer.js';
import {AppRoute} from '../../const.js';

import withActivePlayer from '../with-active-player/with-active-player.jsx';
import withUserAnswer from '../with-user-answer/with-user-answer.jsx';
import withTransformProps from '../with-transform-props/with-transform-props.jsx';
import withAuthData from '../with-auth-data/with-auth-data.jsx';

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

const AuthorizationScreenWrapped = withAuthData(AuthorizationScreen);

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
      return (
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact
              render={() => {
                return <Component
                  {...this.props}
                  renderScreen={this._getScreen} />;
              }}
            />
            <Route path={AppRoute.LOSE} exact
              render={() => {
                return <GameOver
                  onResetGame={this.props.onUserResetGame}
                />;
              }}
            />
            <Route path={AppRoute.TIME} exact
              render={() => {
                return <FailTime
                  onUserClick={this.props.onUserResetGame}
                />;
              }}
            />
            <Route path={AppRoute.LOGIN} exact
              render={() => {
                return <AuthorizationScreenWrapped
                  onAuthFormSubmit={this.props.onUserLogin}
                  isBadLoginData={this.props.isBadLoginData}
                />;
              }}
            />
            <PrivateRoute
              path={AppRoute.RESULT}
              exact={true}
              render={() => {
                return (
                  <WinScreen
                    gameTime={this.props.gameTime}
                    currentTime={this.props.currentTime}
                    mistakes={this.props.mistakes}
                    onResetGame={this.props.onUserResetGame}
                  />
                );
              }}
            />
          </Switch>
        </Router>

      );
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
        timerId,
        isRequireAuthorization,
      } = this.props;

      if (step === -1) {
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
      const question = questions[step];

      if (mistakes >= maxMistakes) {
        return <Redirect to={AppRoute.LOSE} />;
      }

      if (!question) {
        if (step >= questions.length && !isRequireAuthorization) {
          return <Redirect to={AppRoute.RESULT} />;
        } else {
          return <Redirect to={AppRoute.LOGIN} />;
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
      history.push(AppRoute.TIME);
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

export {withScreenSwitch};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
