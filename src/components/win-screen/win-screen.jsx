import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const WinScreen = (props) => {
  const {
    gameTime,
    currentTime,
    mistakes,
    onResetGame
  } = props;
  const diffTime = gameTime - currentTime;
  const minute = Math.floor(diffTime / 60);
  const second = diffTime % 60;
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">{`За ${minute} минуты и ${second} секунд вы набрали 12 баллов (8 быстрых), совершив ${mistakes} ошибки`}</p>
      <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
      <Link
        onClick={onResetGame}
        className="replay"
        to={AppRoute.ROOT}
      >
          Сыграть ещё раз
      </Link>
    </section>
  );
};

WinScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onResetGame: PropTypes.func.isRequired
};

export default WinScreen;
