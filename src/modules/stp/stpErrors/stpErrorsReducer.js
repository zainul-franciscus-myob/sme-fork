import {
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SET_BUSINESS_DETAIL_IS_LOADING,
  SET_ERROR_MESSAGE,
  SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
  SET_IS_LOADING,
} from './stpErrorsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  businessId: '',
  region: '',
  errorMessage: '',
  errors: {
    businessDetails: [],
    employees: [],
    payItems: [],
  },
  businessDetailsModalIsOpen: false,
  businessDetailsModalIsLoading: false,
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
    businessDetails: [
      ...errorsPayload.businessDetail,
    ],
    employees: [
      ...errorsPayload.employees,
    ],
    payItems: [
      ...errorsPayload.payItems,
    ],
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_STP_ERRORS]: loadStpErrors,
  [SET_ERROR_MESSAGE]: setErrorMessage,
  [SET_IS_LOADING]: setIsLoading,
  [SET_IS_BUSINESS_DETAILS_MODAL_OPEN]: setBusinessDetailsModalIsOpen,
  [SET_BUSINESS_DETAIL_IS_LOADING]: setBusinessDetailModalIsLoading,
  [LOAD_BUSINESS_DETAILS]: loadBusinessDetails,
};

const stpErrorsReducer = createReducer(getDefaultState(), handlers);

export default stpErrorsReducer;
