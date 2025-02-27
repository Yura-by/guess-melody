import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

import Mistakes from '../mistakes/mistakes';
import Timer from '../timer/timer';

import {getMistakes, getTimerId} from '../../reducer/game/selectors';
import {ActionCreator as GameActionCreator} from '../../reducer/game/game';

interface Props {
  type: string;
  mistakes: number;
  onHeaderClick: (id: number) => void;
  timerId: number;
  children: React.ReactNode;
}

const GameScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {type, children, mistakes, onHeaderClick, timerId} = props;
  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link className="game__back"
          to={AppRoute.ROOT}
          onClick={() => onHeaderClick(timerId)}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" />
        </svg>

        <Timer />

        <Mistakes
          mistakes={mistakes}
        />
      </header>
      {children}
    </section>
  );
};

const mapStateToProps = (state) => ({
  mistakes: getMistakes(state),
  timerId: getTimerId(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onHeaderClick: (timerId) => {
      dispatch(GameActionCreator.resetGame(timerId));
    }
  };
};

export {GameScreen};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
