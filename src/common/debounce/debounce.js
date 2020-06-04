let timer;

// @TODO: there is a risk here if we use two debounces on the same page
// it will override the global `timer`
export default (handler, delay = 500) => (...args) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => handler(...args), delay);
};
