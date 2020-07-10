import {
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SUBMIT_BUSINESS_DETAILS,
} from '../stpErrorsIntents';

const StpErrorsMapping = {
  [LOAD_STP_ERRORS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/stp/registration_items_validation`,
  },
  [LOAD_BUSINESS_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/business_details`,
  },
  [SUBMIT_BUSINESS_DETAILS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/stp/business_details`,
  },
};

export default StpErrorsMapping;
