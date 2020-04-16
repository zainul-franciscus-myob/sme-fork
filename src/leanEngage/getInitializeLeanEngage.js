import LeanEngageType from './LeanEngageType';
import initializeHttpLeanEngage from './initializeHttpLeanEngage';
import initializeNoOpLeanEngage from './initializeNoOpLeanEngage';

class BadLeanEngageTypeError extends Error {
  constructor(leanEngageType) {
    super(`"${leanEngageType}" is not a valid leanEngage type`);
    this.leanEngageType = leanEngageType;
  }
}

const getInitializeLeanEngage = (leanEngageType) => {
  switch (leanEngageType) {
    case LeanEngageType.Http:
      return initializeHttpLeanEngage;
    case LeanEngageType.NoOp:
      return initializeNoOpLeanEngage;
    default:
      throw new BadLeanEngageTypeError(leanEngageType);
  }
};

export default getInitializeLeanEngage;
