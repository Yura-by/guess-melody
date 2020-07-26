import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const FailTime = ({onUserClick}) => {
  return (
    <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
      <h2 className="result__title">Увы и ах!</h2>
      <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>
      <Link className="replay"
        onClick={onUserClick}
        to={AppRoute.ROOT}
      >
        Попробовать ещё раз
      </Link>
    </section>
  );
};

FailTime.propTypes = {
  onUserClick: PropTypes.func.isRequired
};

export default FailTime;
