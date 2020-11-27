import { GET_IRD_NUMBER } from '../OnboardingIntents';
import getIrdNumber from './data/getIrdNumber.json';

const PayDayOnboardingMapping = {
  [GET_IRD_NUMBER]: ({ onSuccess }) => onSuccess(getIrdNumber),
};

export default PayDayOnboardingMapping;
