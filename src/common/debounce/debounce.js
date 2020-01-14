let timer;

export default (handler, delay) => (...args) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => handler(...args), delay);
};
