import * as React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

interface Props {
  onResetGame: () => void;
}

const GameOver: React.FunctionComponent<Props> = (props: Props) => {
  const {onResetGame} = props;
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Какая жалость!</h2>
      <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
      <Link
        onClick={onResetGame}
        className="replay"
        to={AppRoute.ROOT}
      >
          Попробовать ещё раз
      </Link>
    </section>
  );
};

export default GameOver;
