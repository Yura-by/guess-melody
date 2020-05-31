class Timer {

  constructor(totalTime, onTimerEnd) {
    this._totalTime = totalTime;
    this._onTimerEnd = onTimerEnd;
    this._lastTime = totalTime;

    this.tick = this.tick.bind(this);
  }

  tick() {
    const updateTime = this._lastTime - 1;
    if (updateTime < 0) {
      return;
    }
    if (updateTime > 0) {
      this._lastTime = updateTime;
      return;
    }
    if (this._lastTime === 1 && updateTime === 0) {
      this._lastTime = 0;
      this._onTimerEnd();
      return;
    }
  }

  getLastTime() {
    return this._lastTime;
  }
}

export default Timer;
