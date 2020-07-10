import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getCurrentTime} from '../../reducer/game/selectors.js';

const correctTime = (value) => {
  if (value / 10 >= 1) {
    return value;
  }

  return `0${value}`;
};

const Timer = ({currentTime}) => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  return (
    <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{correctTime(minutes)}</span>
      <span className="timer__dots" >:</span>
      <span className="timer__secs">{correctTime(seconds)}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTime: getCurrentTime(state)
  };
};

Timer.propTypes = {
  currentTime: PropTypes.number.isRequired,
};

export {Timer};

export default connect(mapStateToProps)(Timer);
