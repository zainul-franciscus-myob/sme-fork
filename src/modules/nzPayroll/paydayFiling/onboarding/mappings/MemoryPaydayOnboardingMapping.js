import { GET_IRD_NUMBER, ONBOARD_USER } from '../OnboardingIntents';
import getIrdNumber from './data/getIrdNumber.json';
import onboardUser from './data/onboardUser.json';

const PayDayOnboardingMapping = {
  [GET_IRD_NUMBER]: ({ onSuccess }) => onSuccess(getIrdNumber),
  [ONBOARD_USER]: ({ onSuccess }) => onSuccess(onboardUser),
};

export default PayDayOnboardingMapping;
