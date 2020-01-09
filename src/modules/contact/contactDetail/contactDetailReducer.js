import {
  CLOSE_MODAL,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_SHIPPING_ADDRESS,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  contact: {
    id: '',
    isInactive: false,
    isReportable: false,
    selectedContactType: '',
    designation: '',
    referenceId: '',
    companyName: '',
    firstName: '',
    lastName: '',
    abn: '',
    notes: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      phoneNumbers: [],
      fax: '',
      email: '',
      website: '',
      businessContact: '',
      salutation: '',
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
      phoneNumbers: [],
      fax: '',
      email: '',
      website: '',
      businessContact: '',
      salutation: '',
    },
  },
  readonly: {
    title: '',
    status: '',
    contactType: '',
    averageDaysToPay: '',
    balanceDue: '',
    overDue: '',
  },
  contactTypes: [],
  isCreating: false,
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  modalType: '',
  alertMessage: '',
  isPageEdited: false,
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());
const pageEdited = { isPageEdited: true };

const loadContactDetail = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    ...action.contact,
    shippingAddress: {
      ...state.contact.shippingAddress,
      ...action.contact.shippingAddress,
    },
    billingAddress: {
      ...state.contact.billingAddress,
      ...action.contact.billingAddress,
    },
  },
  readonly: {
    ...state.readonly,
    ...action.readonly,
  },
  contactTypes: action.contactTypes,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const updateContactDetails = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    [action.key]: action.value,
  },
  ...pageEdited,
});

const updateBillingAddress = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    billingAddress: {
      ...state.contact.billingAddress,
      [action.key]: action.value,
    },
  },
  ...pageEdited,
});

const updateShippingAddress = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    shippingAddress: {
      ...state.contact.shippingAddress,
      [action.key]: action.value,
    },
  },
  ...pageEdited,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});


const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_NEW_CONTACT]: loadContactDetail,
  [LOAD_CONTACT_DETAIL]: loadContactDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_CONTACT_DETAILS]: updateContactDetails,
  [UPDATE_BILLING_ADDRESS]: updateBillingAddress,
  [UPDATE_SHIPPING_ADDRESS]: updateShippingAddress,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_INITIAL_STATE]: setInitialState,
};

const contactDetailReducer = createReducer(getDefaultState(), handlers);

export default contactDetailReducer;
