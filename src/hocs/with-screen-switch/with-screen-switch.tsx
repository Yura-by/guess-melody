import * as React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Route, Switch, Redirect, Router} from 'react-router-dom';

import history from '../../history';
import {getStep, getMistakes, getGameTime, getMaxMistakes, getTimerId, getCurrentTime} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getIsRequireAuthorization, getIsBadLoginData} from '../../reducer/user/selectors';

import {ActionCreator as GameActionCreator} from '../../reducer/game/game';
import {ActionCreator as UserActionCreator} from '../../reducer/user/user';

import {Operation as UserOperation} from '../../reducer/user/user';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen';
import GameGenre from '../../components/game-genre/game-genre';
import GameArtist from '../../components/game-artist/game-artist';
import GameScreen from '../../components/game-screen/game-screen';
import FailTime from '../../components/fail-time/fail-time';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';
import WinScreen from '../../components/win-screen/win-screen';
import GameOver from '../../components/game-over/game-over';
import PrivateRoute from '../../components/private-route/private-route';

import Timer from '../../timer/timer';
import {AppRoute} from '../../const';
import {ArtistAnswer, Question} from '../../types';

import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';
import withTransformProps from '../with-transform-props/with-transform-props';
import withAuthData from '../with-auth-data/with-auth-data';

interface Props {
  gameTime: number;
  maxMistakes: number;
  step: number;
  mistakes: number;
  onWelcomeScreenClick: (gameTime: number, currentTimerId: number, step: number, questionsLength: number) => void;
  onUserAnswer: (userAnswer: boolean[] | ArtistAnswer, question: Question, mistakes: number, maxMistakes: number, step: number, timerId: number, questionsLength: number) => void;
  questions: Question[];
  onUserResetGame: () => void;
  timerId: number;
  isRequireAuthorization: boolean;
  onUserLogin: (state: {email: string, password: string}) => void;
  isBadLoginData: boolean;
  currentTime: number;
};

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

  class WithScreenSwitch extends React.PureComponent<Props, null>{

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
