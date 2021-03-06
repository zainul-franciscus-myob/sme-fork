import {
  CLEAR_ABN_VALIDATION_RESULT,
  CLOSE_MODAL,
  LOAD_ABN_VALIDATION_RESULT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  OPEN_MODAL,
  SET_ABN_VALIDATE_STATE,
  SET_ALERT_MESSAGE,
  SET_LOADING_SINGLE_ACCOUNT_STATE,
  SET_LOADING_STATE,
  SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS,
  SET_SUBMITTING_STATE,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_SELECTED_AUTOCOMPLETE_BILLING_ADDRESS,
  UPDATE_SELECTED_AUTOCOMPLETE_SHIPPING_ADDRESS,
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
    expenseAccountId: '',
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
    paymentDetails: {
      bankNumber: '',
      accountNumber: '',
      accountName: '',
      statementText: '',
      email: '',
    },
    uid: '',
    isShippingAddressSameAsBillingAddress: false,
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
  accountOptions: [],
  isCreating: false,
  loadingState: LoadingState.LOADING,
  isLoadingAccount: false,
  isSubmitting: false,
  modalType: '',
  alertMessage: '',
  isPageEdited: false,
  businessId: '',
  region: '',
  reminders: {
    url: '',
  },
  abnValidationResult: undefined,
  isValidatingAbn: false,
  isAutocompleteAddressEnabled: false,
});

const resetState = () => getDefaultState();
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
  accountOptions: action.accountOptions,
  abnValidationResult: action.abnValidationResult,
  reminders: {
    ...state.reminders,
    ...action.reminders,
  },
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

const getAppliedFormatRestrictions = (currentText, text, length) => {
  const pattern = `^(?=.{0,${length}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matchedText = text.match(pattern);

  return matchedText === null ? currentText : matchedText[0].toUpperCase();
};

const updatePaymentDetails = (state, action) => {
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
    ...pageEdited,
  };
};

const updateBillingAddress = (state, action) => ({
  ...state,
  contact: {
    ...state.contact,
    billingAddress: {
      ...state.contact.billingAddress,
      [action.key]: action.value,
    },
    shippingAddress: state.contact.isShippingAddressSameAsBillingAddress
      ? {
          ...state.contact.billingAddress,
          [action.key]: action.value,
        }
      : { ...state.contact.shippingAddress },
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

const closeModal = (state) => ({
  ...state,
  modalType: '',
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

export const loadAccountAfterCreate = (state, { account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

export const setLoadingSingleAccountState = (state, action) => ({
  ...state,
  isLoadingAccount: action.isLoadingAccount,
});

const setAbnValidateState = (state, { isValidatingAbn }) => ({
  ...state,
  isValidatingAbn,
});

const setAbnValidationResult = (state, action) => ({
  ...state,
  abnValidationResult: {
    ...action,
  },
});

const clearAbnValidationResult = (state) => ({
  ...state,
  abnValidationResult: undefined,
});

const updateSelectedAutocompleteBillingAddress = (state, { selected }) => {
  const updatedBillingAddress = {
    ...state.contact.billingAddress,
    street: selected.streetLine,
    city: selected.suburb,
    state: selected.state,
    postcode: selected.postcode,
  };
  return {
    ...state,
    contact: {
      ...state.contact,
      billingAddress: { ...updatedBillingAddress },
      shippingAddress: state.contact.isShippingAddressSameAsBillingAddress
        ? { ...updatedBillingAddress }
        : { ...state.contact.shippingAddress },
    },
    ...pageEdited,
  };
};

const updateSelectedAutocompleteShippingAddress = (state, { selected }) => ({
  ...state,
  contact: {
    ...state.contact,
    shippingAddress: {
      ...state.contact.shippingAddress,
      street: selected.streetLine,
      city: selected.suburb,
      state: selected.state,
      postcode: selected.postcode,
    },
  },
  ...pageEdited,
});

const setShippingAddressSameAsBillingAddress = (
  state,
  { isShippingAddressSameAsBillingAddress }
) => ({
  ...state,
  contact: {
    ...state.contact,
    shippingAddress: isShippingAddressSameAsBillingAddress
      ? { ...state.contact.billingAddress }
      : { ...state.contact.shippingAddress },
    isShippingAddressSameAsBillingAddress,
  },
  ...pageEdited,
});

const handlers = {
  [RESET_STATE]: resetState,
  [LOAD_NEW_CONTACT]: loadContactDetail,
  [LOAD_CONTACT_DETAIL]: loadContactDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_CONTACT_DETAILS]: updateContactDetails,
  [UPDATE_PAYMENT_DETAILS]: updatePaymentDetails,
  [UPDATE_BILLING_ADDRESS]: updateBillingAddress,
  [UPDATE_SHIPPING_ADDRESS]: updateShippingAddress,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_LOADING_SINGLE_ACCOUNT_STATE]: setLoadingSingleAccountState,
  [SET_ABN_VALIDATE_STATE]: setAbnValidateState,
  [LOAD_ABN_VALIDATION_RESULT]: setAbnValidationResult,
  [CLEAR_ABN_VALIDATION_RESULT]: clearAbnValidationResult,
  [UPDATE_SELECTED_AUTOCOMPLETE_SHIPPING_ADDRESS]: updateSelectedAutocompleteShippingAddress,
  [UPDATE_SELECTED_AUTOCOMPLETE_BILLING_ADDRESS]: updateSelectedAutocompleteBillingAddress,
  [SET_SHIPPING_ADDRESS_SAME_AS_BILLING_ADDRESS]: setShippingAddressSameAsBillingAddress,
};

const contactDetailReducer = createReducer(getDefaultState(), handlers);

export default contactDetailReducer;
