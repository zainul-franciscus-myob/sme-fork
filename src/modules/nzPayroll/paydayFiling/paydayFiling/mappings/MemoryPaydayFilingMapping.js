import {
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_PAYDAY_USER_SESSION,
} from '../PaydayFilingIntents';
import loadBusinessOnboardedResponse from './data/loadBusinessOnboardedResponse.json';
import paydayUserSession from './data/paydayUserSession.json';

const loadUserSession = ({ onSuccess }) => onSuccess(paydayUserSession);

const loadBusinessOnboarded = ({ onSuccess }) => {
  onSuccess(loadBusinessOnboardedResponse);
};

const PaydayFilingMapping = {
  [LOAD_PAYDAY_USER_SESSION]: loadUserSession,
  [LOAD_BUSINESS_ONBOARDED_STATUS]: loadBusinessOnboarded,
};

export default PaydayFilingMapping;
