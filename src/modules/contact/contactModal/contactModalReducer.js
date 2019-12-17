import {
  LOAD_CONTACT_MODAL,
  SET_ALERT,
  SET_CONTACT_MODAL_BILLING_ADDRESS,
  SET_CONTACT_MODAL_DETAILS,
  SET_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_LOADING_STATE,
  SET_SHOW_CONTACT_MODAL_BILLING_ADDRESS,
  SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_SUBMITTING_STATE,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  alert: undefined,
  isOpen: false,
  isLoading: true,
  isSubmitting: false,
  showContactType: true,
  showBillingAddress: false,
  showShippingAddress: false,
  contact: {
    contactType: '',
    designation: '',
    referenceId: '',
    companyName: '',
    firstName: '',
    lastName: '',
    abn: '',
    isInactive: false,
    isReportable: false,
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
  contactTypeOptions: [],
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();

  return ({
    ...defaultState,
    businessId: context.businessId,
    region: context.region,
    isOpen: true,
    showContactType: !context.contactType,
    contact: {
      ...defaultState.contact,
      contactType: context.contactType || defaultState.contact.contactType,
    },
  });
};

const resetState = () => (getDefaultState());

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({ ...state, isSubmitting });

const setAlert = (state, { alert }) => ({ ...state, alert });

const loadContactModal = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    ...action.contact,
    billingAddress: {
      ...state.contact.billingAddress,
      ...action.contact.billingAddress,
    },
    shippingAddress: {
      ...state.contact.shippingAddress,
      ...action.contact.shippingAddress,
    },
  },
  contactTypeOptions: action.contactTypeOptions,
});

const setContactModalDetails = (state, { key, value }) => ({
  ...state,
  contact: {
    ...state.contact,
    [key]: value,
  },
});

const setShowContactModalBillingAddress = (state, { showBillingAddress }) => ({
  ...state, showBillingAddress,
});

const setContactModalBillingAddress = (state, { key, value }) => ({
  ...state,
  contact: {
    ...state.contact,
    billingAddress: {
      ...state.contact.billingAddress,
      [key]: value,
    },
  },
});

const setShowContactModalShippingAddress = (state, { showShippingAddress }) => ({
  ...state, showShippingAddress,
});

const setContactModalShippingAddress = (state, { key, value }) => ({
  ...state,
  contact: {
    ...state.contact,
    shippingAddress: {
      ...state.contact.shippingAddress,
      [key]: value,
    },
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,

  [LOAD_CONTACT_MODAL]: loadContactModal,
  [SET_CONTACT_MODAL_DETAILS]: setContactModalDetails,
  [SET_SHOW_CONTACT_MODAL_BILLING_ADDRESS]: setShowContactModalBillingAddress,
  [SET_CONTACT_MODAL_BILLING_ADDRESS]: setContactModalBillingAddress,
  [SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS]: setShowContactModalShippingAddress,
  [SET_CONTACT_MODAL_SHIPPING_ADDRESS]: setContactModalShippingAddress,
};

export default createReducer(getDefaultState(), handlers);
