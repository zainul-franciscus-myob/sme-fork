import {
  COPY_CONTACT_MODAL_BILLING_ADDRESS,
  LOAD_CONTACT_MODAL,
  SET_ALERT,
  SET_CONTACT_MODAL_BILLING_ADDRESS,
  SET_CONTACT_MODAL_DETAILS,
  SET_CONTACT_MODAL_PAYMENT_DETAILS,
  SET_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_LOADING_STATE,
  SET_SHOW_CONTACT_MODAL_BILLING_ADDRESS,
  SET_SHOW_CONTACT_MODAL_PAYMENT_DETAILS,
  SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_SUBMITTING_STATE,
  TOGGLE_SHIPPING_ADDRESS_EDITING,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const address = {
  street: '',
  city: '',
  state: '',
  postcode: '',
  country: '',
  phoneNumbers: [],
  fax: '',
  email: '',
  website: '',
};

export const getDefaultState = () => ({
  alert: undefined,
  isOpen: false,
  isLoading: true,
  isSubmitting: false,
  showContactType: true,
  showBillingAddress: false,
  showShippingAddress: false,
  togglePaymentDetails: false,
  contact: {
    contactType: '',
    designation: 'Company',
    referenceId: '',
    companyName: '',
    firstName: '',
    lastName: '',
    abn: '',
    isInactive: false,
    isReportable: false,
    notes: '',
    isBillingAddressCopied: false,
    shippingAddress: {
      ...address,
    },
    billingAddress: {
      ...address,
    },
    paymentDetails: {
      bankNumber: '',
      accountNumber: '',
      accountName: '',
      statementText: '',
      email: '',
    },
  },
  contactTypeOptions: [],
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();
  return {
    ...defaultState,
    businessId: context.businessId,
    region: context.region,
    isOpen: true,
    showContactType: !context.contactType,
    contact: {
      ...defaultState.contact,
      contactType: context.contactType || defaultState.contact.contactType,
    },
  };
};

const resetState = () => getDefaultState();

const setLoadingState = (state, { isLoading }) => ({ ...state, isLoading });

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

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
    paymentDetails: {
      ...state.contact.paymentDetails,
      ...action.contact.paymentDetails,
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
  ...state,
  showBillingAddress,
});

const setContactModalBillingAddress = (state, { key, value }) => {
  const shippingAddress = state.contact.isBillingAddressCopied
    ? {
        ...state.contact.shippingAddress,
        [key]: value,
      }
    : state.contact.shippingAddress;

  return {
    ...state,
    contact: {
      ...state.contact,
      billingAddress: {
        ...state.contact.billingAddress,
        [key]: value,
      },
      shippingAddress,
    },
  };
};

const setCopyBillingAddress = (state) => ({
  ...state,
  contact: {
    ...state.contact,
    shippingAddress: {
      ...state.contact.billingAddress,
    },
  },
});

const setShowContactModalShippingAddress = (
  state,
  { showShippingAddress }
) => ({
  ...state,
  showShippingAddress,
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

const setShowContactModalPaymentDetails = (
  state,
  { togglePaymentDetails }
) => ({
  ...state,
  togglePaymentDetails,
});

const getAppliedFormatRestrictions = (currentText, text, length) => {
  const pattern = `^(?=.{0,${length}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matchedText = text.match(pattern);

  return matchedText === null ? currentText : matchedText[0].toUpperCase();
};

const setContactModalPaymentDetails = (state, action) => {
  const maxLengthForFields = { accountName: 32, statementText: 18 };
  const formattedText = maxLengthForFields[action.key]
    ? getAppliedFormatRestrictions(
        state.contact.paymentDetails[action.key],
        action.value,
        maxLengthForFields[action.key]
      )
    : action.value;

  return {
    ...state,
    contact: {
      ...state.contact,
      paymentDetails: {
        ...state.contact.paymentDetails,
        [action.key]: formattedText,
      },
    },
  };
};

const toggleShippingAddressEditing = (state, action) => {
  return {
    ...state,
    contact: {
      ...state.contact,
      isBillingAddressCopied: action.value,
    },
  };
};

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
  [COPY_CONTACT_MODAL_BILLING_ADDRESS]: setCopyBillingAddress,
  [TOGGLE_SHIPPING_ADDRESS_EDITING]: toggleShippingAddressEditing,
  [SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS]: setShowContactModalShippingAddress,
  [SET_CONTACT_MODAL_SHIPPING_ADDRESS]: setContactModalShippingAddress,
  [SET_SHOW_CONTACT_MODAL_PAYMENT_DETAILS]: setShowContactModalPaymentDetails,
  [SET_CONTACT_MODAL_PAYMENT_DETAILS]: setContactModalPaymentDetails,
};

export default createReducer(getDefaultState(), handlers);
