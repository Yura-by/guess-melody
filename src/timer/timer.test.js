import Timer from './timer.js';

it(`Timer currently tick timer`, () => {
  const onTimerEnd = jest.fn();

  const newTimer = new Timer(10, onTimerEnd);

  expect(newTimer).toEqual({
    _totalTime: 10,
    _onTimerEnd: onTimerEnd,
    _lastTime: 10,
    tick: expect.any(Function)
  });

  newTimer.tick();

  expect(newTimer).toEqual({
    _totalTime: 10,
    _onTimerEnd: onTimerEnd,
    _lastTime: 9,
    tick: expect.any(Function)
  });
});

it(`Timer currently gives time, calles callback when time ends`, () => {
  const onTimerEnd = jest.fn();

  const newTimer = new Timer(1, onTimerEnd);
  expect(newTimer.getLastTime()).toBe(1);
  newTimer.tick();
  expect(newTimer.getLastTime()).toBe(0);
  expect(onTimerEnd).toHaveBeenCalledTimes(1);
  newTimer.tick();
  expect(newTimer.getLastTime()).toBe(0);
});
