import { LOAD_TAX_DETAIL, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  taxCodeId: undefined,
  businessId: undefined,
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
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadTaxDetail = (state, action) => ({
  ...state,
  ...action.content,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_TAX_DETAIL]: loadTaxDetail,
  [SET_LOADING_STATE]: setLoadingState,
};

const taxDetailReducer = createReducer(getDefaultState(), handlers);

export default taxDetailReducer;
