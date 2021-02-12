import {
  CREATE_ONBOARD_USER,
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_FILTERED_EI_SUBMISSIONS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYDAY_USER_SESSION,
  UPDATE_ONBOARD_USER,
} from '../PaydayFilingIntents';
import loadBusinessOnboardedResponse from './data/loadBusinessOnboardedResponse.json';
import loadFilteredEiSubmissions from './data/loadFilteredEiSubmissions.json';
import loadInitialEiSubmissions from './data/loadInitialEiSubmissions.json';
import onboardUser from './data/onboardUser.json';
import paydayUserSession from './data/paydayUserSession.json';
import updateOnboardUserResponse from './data/updateOnboardUserResponse.json';

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
  [CREATE_ONBOARD_USER]: ({ onSuccess }) => onSuccess(onboardUser),
  [UPDATE_ONBOARD_USER]: ({ onSuccess }) =>
    onSuccess(updateOnboardUserResponse),
  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: ({ onSuccess }) =>
    onSuccess(loadInitialEiSubmissions),
  [LOAD_FILTERED_EI_SUBMISSIONS]: ({ onSuccess }) =>
    onSuccess(loadFilteredEiSubmissions),
};

export default PaydayFilingMapping;
