import * as React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Mistakes from '../mistakes/mistakes.jsx';
import Timer from '../timer/timer.jsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

import {getMistakes, getTimerId} from '../../reducer/game/selectors.js';
import {ActionCreator as GameActionCreator} from '../../reducer/game/game.js';

interface Props {
  type: string;
  mistakes: number;
  onHeaderClick: (id: number) => void;
  timerId: number;
};

const GameScreen: React.FunctionComponent<Props> = (props) => {
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

// GameScreen.propTypes = {
//   type: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.array,
//     PropTypes.object
//   ]).isRequired,
//   mistakes: PropTypes.number.isRequired,
//   onHeaderClick: PropTypes.func.isRequired,
//   timerId: PropTypes.number.isRequired
// };

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
