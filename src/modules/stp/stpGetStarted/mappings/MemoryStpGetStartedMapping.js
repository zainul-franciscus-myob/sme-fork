import { LOAD_REGISTRATION_ITEMS_VALIDATION } from '../stpGetStartedIntents';
import loadRegistrationItemsValidation from './data/loadRegistrationItemsValidation';

const StpGetStartedMapping = {
  [LOAD_REGISTRATION_ITEMS_VALIDATION]: ({ onSuccess }) =>
    onSuccess(loadRegistrationItemsValidation),
};

export default StpGetStartedMapping;
