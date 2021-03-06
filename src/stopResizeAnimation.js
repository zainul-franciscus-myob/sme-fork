// Reference: https://css-tricks.com/stop-animations-during-window-resizing/

export default () => {
  let resizeTimer;
  window.addEventListener('resize', () => {
    if (document.body) {
      document.body.classList.add('resize-animation-stopper');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 50);
    }
  });
};
