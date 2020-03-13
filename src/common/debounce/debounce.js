let timer;

export default (handler, delay = 500) => (...args) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => handler(...args), delay);
};
