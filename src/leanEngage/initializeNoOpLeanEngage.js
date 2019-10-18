const noOp = () => {};

const initializeNoOpLeanEngage = () => {
  window.leanengage = (action, survey) => console.log(action, survey);
  return noOp;
};

export default initializeNoOpLeanEngage;
