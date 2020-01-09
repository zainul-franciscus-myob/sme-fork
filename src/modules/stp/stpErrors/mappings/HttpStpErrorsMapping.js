import { LOAD_BUSINESS_DETAILS, LOAD_STP_ERRORS } from '../stpErrorsIntents';


const StpErrorsMapping = {
  [LOAD_STP_ERRORS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/registration_items_validation`,
  },
  [LOAD_BUSINESS_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/load_business_details`,
  },
};

export default StpErrorsMapping;
