import Timer from './timer.js';

it(`Timer currently gets arguments`, () => {
  const onTimerEnd = jest.fn();
  const newTimer = new Timer(10, onTimerEnd);
  expect(newTimer).toEqual({
    _totalTime: expect(10),
    _onTimerEnd: expect.toEqual(onTimerEnd),
    _lastTime: expect(10),
    tick: expect.any(Function)
  });
});
