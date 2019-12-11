import {
  CLOSE_MODAL,
  FORMAT_AMOUNT_INPUT,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASE_RETURN,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_PURCHASE_OPTION,
  UPDATE_TABLE_AMOUNT_FIELDS,
} from './SupplierReturnPurchaseIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';
import formatIsoDate from '../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  supplierReturnPurchase: {
    supplierName: '',
    supplierId: '',
    description: '',
    referenceId: '',
    originalReferenceId: '',
    date: formatIsoDate(new Date()),
    purchases: [],
    debitAmount: '',
  },
  isLoading: false,
  isSubmitting: false,
  isPagedEdited: false,
  modalType: '',
  alertMessage: '',
});

const pageEdited = { isPageEdited: true };


const loadPurchaseReturn = (state, action) => ({
  ...state,
  supplierReturnPurchase: {
    ...state.supplierReturnPurchase,
    ...action.purchaseReturn,
    originalReferenceId: action.purchaseReturn.referenceId,
  },
});

const loadNewPurchaseReturn = loadPurchaseReturn;

const updatePurchaseOptions = (state, action) => ({
  ...state,
  ...pageEdited,
  supplierReturnPurchase: {
    ...state.supplierReturnPurchase,
    [action.key]: action.value,
  },
});

const updateTableAmountFields = (state, action) => ({
  ...state,
  ...pageEdited,
  supplierReturnPurchase: {
    ...state.supplierReturnPurchase,
    purchases: state.supplierReturnPurchase.purchases.map((purchase, index) => (
      index === action.index
        ? {
          ...purchase,
          [action.key]: action.value,
        }
        : purchase
    )),
  },
});

const formatAmountInput = (state, action) => ({
  ...state,
  supplierReturnPurchase: {
    ...state.supplierReturnPurchase,
    purchases: state.supplierReturnPurchase.purchases.map((purchase, index) => (
      index === action.index && action.value.length > 0
        ? {
          ...purchase,
          [action.key]: Number(action.value) ? Number(action.value).toFixed(2) : '',
        }
        : purchase
    )),
  },
});

const resetState = () => (getDefaultState());

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlertMessage,
  [LOAD_NEW_PURCHASE_RETURN]: loadNewPurchaseReturn,
  [LOAD_PURCHASE_RETURN]: loadPurchaseReturn,
  [UPDATE_PURCHASE_OPTION]: updatePurchaseOptions,
  [UPDATE_TABLE_AMOUNT_FIELDS]: updateTableAmountFields,
  [FORMAT_AMOUNT_INPUT]: formatAmountInput,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const supplierReturnPurchaseReducer = createReducer(getDefaultState(), handlers);

export default supplierReturnPurchaseReducer;
