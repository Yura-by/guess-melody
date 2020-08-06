import * as React from 'react';
import {connect} from 'react-redux';

import {getCurrentTime} from '../../reducer/game/selectors.js';

interface Props {
  currentTime: number;
};

const correctTime = (value) => {
  if (value / 10 >= 1) {
    return value;
  }

  return `0${value}`;
};

const Timer: React.FunctionComponent<Props> = ({currentTime}) => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  return (
    <div className="timer__value">
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

export {Timer};

export default connect(mapStateToProps)(Timer);
