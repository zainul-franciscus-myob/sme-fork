import {
  CLOSE_MODAL,
  LOAD_TAX_COMBINE,
  OPEN_MODAL,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  UPDATE_COMBINE_FIELD,
} from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  taxCodeIdToDelete: undefined,
  taxCodeIdToPersist: undefined,
  taxCodeOptions: [],
  isSubmitting: false,
  alert: undefined,
  modalOpen: false,
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadTaxCombine = (state, action) => ({
  ...state,
  ...action.content,
});

const updateCombineField = (state, { key, value }) => ({
  ...state,
  [key]: value,
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

const openModal = (state) => ({
  ...state,
  modalOpen: true,
});

const closeModal = (state) => ({
  ...state,
  modalOpen: false,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [LOAD_TAX_COMBINE]: loadTaxCombine,
  [UPDATE_COMBINE_FIELD]: updateCombineField,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const taxCombineReducer = createReducer(getDefaultState(), handlers);

export default taxCombineReducer;
