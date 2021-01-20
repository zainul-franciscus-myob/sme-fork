import { LOAD_BUSINESS_ONBOARDED_STATUS } from '../paydayFiling/PaydayFilingIntents';
import loadBusinessOnboardedResponse from './data/loadBusinessOnboardedResponse';

const loadBusinessOnboarded = ({ onSuccess }) => {
  onSuccess(loadBusinessOnboardedResponse);
};

const PaydayFilingNzMapping = {
  [LOAD_BUSINESS_ONBOARDED_STATUS]: loadBusinessOnboarded,
};

export default PaydayFilingNzMapping;
