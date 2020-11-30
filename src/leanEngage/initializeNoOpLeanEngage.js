const noOp = () => {};

const initializeNoOpLeanEngage = () => {
  // eslint-disable-next-line no-console
  window.leanengage = (action, survey) => console.log(action, survey);
  return {
    startLeanEngage: noOp,
  };
};

export default initializeNoOpLeanEngage;
