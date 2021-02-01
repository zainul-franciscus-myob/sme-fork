import {
  CLOSE_MODAL,
  LOAD_TAX_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  UPDATE_TAX_FIELD,
} from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  taxCodeId: undefined,
  businessId: undefined,
  pageTitle: '',
  code: '',
  description: '',
  type: '',
  rate: '',
  taxCollectedAccountId: '',
  taxPaidAccountId: '',
  linkedContactId: '',
  includeInGSTReturn: false,
  isWithholding: false,
  luxuryCarTax: '',
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modal: {
    type: '',
    url: '',
  },
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadTaxDetail = (state, action) => ({
  ...state,
  ...action.content,
  pageTitle: `${action.content.code} - ${action.content.description}`,
});

const updateTaxField = (state, { key, value }) => ({
  ...state,
  [key]: value,
  isPageEdited: true,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsSubmitting = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const openModal = (state, action) => ({
  ...state,
  modal: {
    ...action.modal,
  },
});

const closeModal = (state) => ({
  ...state,
  modal: {
    type: '',
    url: '',
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [LOAD_TAX_DETAIL]: loadTaxDetail,
  [UPDATE_TAX_FIELD]: updateTaxField,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const taxDetailReducer = createReducer(getDefaultState(), handlers);

export default taxDetailReducer;
