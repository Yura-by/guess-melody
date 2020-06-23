import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import GameGenre from '../../components/game-genre/game-genre.jsx';
import GameArtist from '../../components/game-artist/game-artist.jsx';
import GameScreen from '../../components/game-screen/game-screen.jsx';
import FailTime from '../../components/fail-time/fail-time.jsx';

import {ActionCreator} from '../../reducer.js';

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
        timerId
      } = this.props;

      const question = questions[step];

      if (step === -2) {
        return (
          <FailTime
            onUserClick={onUserResetGame}
          />
        );
      }

      if (mistakes >= maxMistakes) {
        // Временное решение, которое мы заменим в следущем модуле
        // eslint-disable-next-line
        if (window.confirm(`Слишком много ошибок!`)) {
          onUserResetGame();
        }
        return null;
      }

      if (!question) {
        if (step > questions.length - 1) {
          // Временное решение, которое мы заменим в следущем модуле
          // eslint-disable-next-line
          window.alert(`Больше нет вопросов!`);
          return null;
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
    timerId: PropTypes.number.isRequired
  };

  return WithScreenSwitch;
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
