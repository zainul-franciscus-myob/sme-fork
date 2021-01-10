import {
  CREATE_ONBOARD_USER,
  GET_IRD_NUMBER,
  UPDATE_ONBOARD_USER,
} from '../OnboardingIntents';
import getIrdNumber from './data/getIrdNumber.json';
import onboardUser from './data/onboardUser.json';

const PayDayOnboardingMapping = {
  [GET_IRD_NUMBER]: ({ onSuccess }) => onSuccess(getIrdNumber),
  [CREATE_ONBOARD_USER]: ({ onSuccess }) => onSuccess(onboardUser),
  [UPDATE_ONBOARD_USER]: ({ onSuccess }) => onSuccess({}),
};

export default PayDayOnboardingMapping;
