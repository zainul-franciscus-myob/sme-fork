import {
  BUSINESS_DETAIL_FIELD_CHANGE,
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SET_BUSINESS_DETAIL_IS_LOADING,
  SET_BUSINESS_DETAIL_MODAL_ALERT_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
  SET_IS_LOADING,
} from './stpErrorsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import States from '../common/States';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  businessId: '',
  region: '',
  source: '',
  errorMessage: '',
  errors: {
    businessDetails: [],
    employees: [],
    payItems: [],
  },
  businessDetailsModalIsOpen: false,
  businessDetailsModalIsLoading: false,
  businessDetailModalAlertMessage: '',
  businessDetails: {
    businessName: '',
    abnWpn: '',
    abnBranch: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  },
});

const resetState = () => ({
  ...getDefaultState(),
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const loadStpErrors = (state, { errorsPayload }) => ({
  ...state,
  hasErrors: errorsPayload.hasRegistrationErrors,
  errors: {
    businessDetails: [...errorsPayload.businessDetail],
    employees: [...errorsPayload.employees],
    payItems: [...errorsPayload.payItems],
  },
});

const setErrorMessage = (state, { message }) => ({
  ...state,
  errorMessage: message,
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setBusinessDetailsModalIsOpen = (state, { isOpen }) => ({
  ...state,
  businessDetailsModalIsOpen: isOpen,
});

const setBusinessDetailModalIsLoading = (state, { isLoading }) => ({
  ...state,
  businessDetailsModalIsLoading: isLoading,
});
const loadBusinessDetails = (state, { businessDetails }) => ({
  ...state,
  businessDetails: {
    businessName: businessDetails.businessName || '',
    abnWpn: businessDetails.abnWpn || '',
    abnBranch: businessDetails.abnBranch || '',
    streetAddress1: businessDetails.streetAddress1 || '',
    streetAddress2: businessDetails.streetAddress2 || '',
    city: businessDetails.city || '',
    state: businessDetails.state || '',
    postcode: businessDetails.postcode || '',
    country: businessDetails.country || '',
  },
});

const handleBusinessDetailFieldChange = (state, { key, value }) => ({
  ...state,
  businessDetails: {
    ...state.businessDetails,
    // If the user selects OTH state, the postcode should default to 9999.
    postcode:
      key === 'state' && value === States.OTH
        ? '9999'
        : state.businessDetails.postcode,
    [key]: value,
  },
});

const setBusinessDetailModalAlertMessage = (state, { message }) => ({
  ...state,
  businessDetailModalAlertMessage: message,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_STP_ERRORS]: loadStpErrors,
  [SET_ERROR_MESSAGE]: setErrorMessage,
  [SET_IS_LOADING]: setIsLoading,
  [SET_IS_BUSINESS_DETAILS_MODAL_OPEN]: setBusinessDetailsModalIsOpen,
  [SET_BUSINESS_DETAIL_IS_LOADING]: setBusinessDetailModalIsLoading,
  [LOAD_BUSINESS_DETAILS]: loadBusinessDetails,
  [BUSINESS_DETAIL_FIELD_CHANGE]: handleBusinessDetailFieldChange,
  [SET_BUSINESS_DETAIL_MODAL_ALERT_MESSAGE]: setBusinessDetailModalAlertMessage,
};

const stpErrorsReducer = createReducer(getDefaultState(), handlers);

export default stpErrorsReducer;
