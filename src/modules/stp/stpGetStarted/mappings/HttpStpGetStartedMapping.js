import { LOAD_REGISTRATION_ITEMS_VALIDATION } from '../stpGetStartedIntents';

const StpGetStartedMapping = {
  [LOAD_REGISTRATION_ITEMS_VALIDATION]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/stp/registration_items_validation`,
  },
};

export default StpGetStartedMapping;
