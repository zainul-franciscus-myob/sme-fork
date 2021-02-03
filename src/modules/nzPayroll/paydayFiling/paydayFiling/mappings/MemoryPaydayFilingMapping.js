import {
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYDAY_USER_SESSION,
} from '../PaydayFilingIntents';
import loadBusinessOnboardedResponse from './data/loadBusinessOnboardedResponse.json';
import loadInitialEiSubmissions from './data/loadInitialEiSubmissions.json';
import paydayUserSession from './data/paydayUserSession.json';

const loadUserSession = ({ onSuccess }) => onSuccess(paydayUserSession);

const loadBusinessOnboarded = ({ onSuccess }) => {
  onSuccess(loadBusinessOnboardedResponse);
};

const removeUserAuthorisation = ({ onSuccess }) => {
  onSuccess();
};

const PaydayFilingMapping = {
  [LOAD_PAYDAY_USER_SESSION]: loadUserSession,
  [LOAD_BUSINESS_ONBOARDED_DETAILS]: loadBusinessOnboarded,
  [DELETE_ONBOARD_USER]: removeUserAuthorisation,
  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: ({ onSuccess }) =>
    onSuccess(loadInitialEiSubmissions),
};

export default PaydayFilingMapping;
