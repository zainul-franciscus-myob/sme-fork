import { AUTHORISE_WITH_CODE, GET_CODE_TO_AUTHORISE } from '../../paySuper/paySuperAuthorisationModal/paySuperAuthorisationModalIntents';

const PaySuperAuthorisationModalMapping = {
  [GET_CODE_TO_AUTHORISE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/paySuper/get_code_to_authorise`,
  },
  [AUTHORISE_WITH_CODE]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/paySuper/authorise_with_code`,
  },
};

export default PaySuperAuthorisationModalMapping;
