import * as React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

interface Props {
  gameTime: number;
  currentTime: number;
  mistakes: number;
  onResetGame: () => void;
}

const WinScreen: React.FunctionComponent<Props> = (props: Props) => {
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
      <p className="result__total">{`За ${minute} минуты и ${second} секунд вы ответили на все вопросы, совершив ${mistakes} ошибки`}</p>
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

export default WinScreen;
