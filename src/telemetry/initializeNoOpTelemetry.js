const noOp = () => {};

const initializeNoOpTelemetry = () => {
  return {
    trackUserEvent: noOp,
    recordPageVisit: noOp,
  };
};

export default initializeNoOpTelemetry;
