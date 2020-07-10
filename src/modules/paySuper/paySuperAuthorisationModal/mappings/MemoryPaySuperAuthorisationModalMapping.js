import {
  AUTHORISE_WITH_CODE,
  GET_CODE_TO_AUTHORISE,
} from '../paySuperAuthorisationModalIntents';
import getAuthorisationPayload from './data/getAuthorisationPayload';

const MemoryPaySuperAuthorisationModalMapping = {
  [GET_CODE_TO_AUTHORISE]: ({ onSuccess }) =>
    onSuccess(getAuthorisationPayload),
  [AUTHORISE_WITH_CODE]: ({ onSuccess }) =>
    onSuccess({ message: 'Pay super authorised.' }),
};

export default MemoryPaySuperAuthorisationModalMapping;
