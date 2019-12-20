import { AUTHORISE_WITH_CODE, GET_CODE_TO_AUTHORISE } from '../../paySuper/paySuperAuthorisationModal/paySuperAuthorisationModalIntents';
import getAuthorisationPayload from '../data/paySuperAuthorisation/getAuthorisationPayload';

const PaySuperAuthorisationModalMapping = {
  [GET_CODE_TO_AUTHORISE]:
    ({ onSuccess }) => onSuccess(getAuthorisationPayload),
  [AUTHORISE_WITH_CODE]:
    ({ onSuccess }) => onSuccess({ message: 'Pay super authorised.' }),
};

export default PaySuperAuthorisationModalMapping;
