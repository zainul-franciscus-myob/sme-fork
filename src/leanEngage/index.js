import LeanEngageType from './LeanEngageType';
import initializeHttpLeanEngage from './initializeHttpLeanEngage';
import initializeNoOpLeanEngage from './initializeNoOpLeanEngage';

let leanEngage = {};

class BadLeanEngageTypeError extends Error {
  constructor(leanEngageType) {
    super(`"${leanEngageType}" is not a valid leanEngage type`);
    this.leanEngageType = leanEngageType;
  }
}

const getInitializer = (leanEngageType) => {
  switch (leanEngageType) {
    case LeanEngageType.Http:
      return initializeHttpLeanEngage;
    case LeanEngageType.NoOp:
      return initializeNoOpLeanEngage;
    default:
      throw new BadLeanEngageTypeError(leanEngageType);
  }
};

export const initializeLeanEngage = (telemetryType, getLeanEngageInfo) => {
  const initializer = getInitializer(telemetryType);
  leanEngage = initializer(getLeanEngageInfo);
};

export const startLeanEngage = () => leanEngage.startLeanEngage();
