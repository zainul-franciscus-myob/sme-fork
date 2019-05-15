// http://en.wikipedia.org/wiki/Smoothstep
const smoothStep = (start, end, point) => {
  if (point <= start) {
    return 0;
  }
  if (point >= end) {
    return 1;
  }
  const x = (point - start) / (end - start); // interpolation
  return x * x * (3 - 2 * x);
};

const scrollFrame = (
  element,
  startTime,
  endTime,
  startTop,
  previousTop,
  distance,
) => () => {
  if (element.scrollTop !== previousTop) {
    return;
  }

  const now = Date.now();
  const point = smoothStep(startTime, endTime, now);
  const frameTop = Math.round(startTop + distance * point);
  element.scrollTop = frameTop; // eslint-disable-line no-param-reassign

  if (now >= endTime) {
    return;
  }

  if (element.scrollTop === previousTop && element.scrollTop !== frameTop) {
    return;
  }
  const newPreviousTop = element.scrollTop;

  setTimeout(
    scrollFrame(
      element,
      startTime,
      endTime,
      startTop,
      newPreviousTop,
      distance,
    ),
    0,
  );
};

const smoothScrollTo = (element, target, duration) => {
  const roundedTarget = Math.round(target);
  const roundedDuration = Math.round(duration);
  if (duration < 0) {
    return;
  }
  if (duration === 0) {
    element.scrollTop = roundedTarget; // eslint-disable-line no-param-reassign
    return;
  }

  const startTime = Date.now();
  const endTime = startTime + roundedDuration;

  const startTop = element.scrollTop;
  const distance = roundedTarget - startTop;

  const previousTop = element.scrollTop;

  setTimeout(
    scrollFrame(element, startTime, endTime, startTop, previousTop, distance),
    0,
  );
};

export default smoothScrollTo;
