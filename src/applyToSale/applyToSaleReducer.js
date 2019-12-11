import {
  FORMAT_TABLE_AMOUNT_INPUT,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
  UPDATE_APPLY_TO_SALE_OPTION,
  UPDATE_TABLE_AMOUNT_INPUT,
} from './ApplyToSaleIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';
import formatAmount from './formatAmount';
import formatIsoDate from '../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  region: '',
  businessId: '',
  customerReturnId: '',
  customerId: '',
  applyToSaleId: '',
  customerName: '',
  amount: '',
  description: '',
  reference: '',
  originalReferenceId: '',
  date: '',
  invoices: [],
  modalType: '',
  alertMessage: '',
  isPageEdited: false,
  isSubmitting: false,
  isLoading: false,
});

const safeParseNumber = string => (Number(string) ? Number(string) : 0);

const setInitialState = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...state,
    region: action.context.region,
    businessId: action.context.businessId,
    customerReturnId: action.context.customerReturnId || defaultState.customerReturnId,
    applyToSaleId: action.context.applyToSaleId || defaultState.applyToSaleId,
  });
};

const resetState = () => getDefaultState();

const setIsLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setIsPageEdited = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const loadNewApplyToSale = (state, action) => ({
  ...state,
  customerId: action.applyToSale.customerId,
  customerName: action.applyToSale.customerName,
  amount: action.applyToSale.amount,
  description: action.applyToSale.description,
  reference: action.applyToSale.reference,
  originalReferenceId: action.applyToSale.reference,
  date: formatIsoDate(new Date()),
  invoices: action.applyToSale.invoices,
});

const loadApplyToSale = (state, action) => ({
  ...state,
  customerName: action.applyToSale.customerName,
  description: action.applyToSale.description,
  reference: action.applyToSale.reference,
  date: action.applyToSale.date,
  invoices: action.applyToSale.invoices,
});

const updateApplyToSaleOption = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const updateTableAmountInput = (state, action) => ({
  ...state,
  invoices: state.invoices.map((invoice, index) => {
    if (index === action.index) {
      if (action.key === 'discount') {
        return {
          ...invoice,
          discount: safeParseNumber(action.value),
          displayDiscount: action.value,
        };
      }

      if (action.key === 'amountApplied') {
        return {
          ...invoice,
          amountApplied: safeParseNumber(action.value),
          displayAmountApplied: action.value,
        };
      }
    }

    return invoice;
  }),
});

const formatTableAmountInput = (state, action) => ({
  ...state,
  invoices: state.invoices.map((invoice, index) => {
    if (index === action.index) {
      return {
        ...invoice,
        displayAmountApplied: Number(invoice.displayAmountApplied) ? formatAmount(invoice.displayAmountApplied) : '',
        displayDiscount: Number(invoice.displayDiscount) ? formatAmount(invoice.displayDiscount) : '',
      };
    }
    return invoice;
  }),
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_LOADING]: setIsLoading,
  [SET_IS_PAGE_EDITED]: setIsPageEdited,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_MODAL_TYPE]: setModalType,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [LOAD_NEW_APPLY_TO_SALE]: loadNewApplyToSale,
  [LOAD_APPLY_TO_SALE]: loadApplyToSale,
  [UPDATE_APPLY_TO_SALE_OPTION]: updateApplyToSaleOption,
  [UPDATE_TABLE_AMOUNT_INPUT]: updateTableAmountInput,
  [FORMAT_TABLE_AMOUNT_INPUT]: formatTableAmountInput,
};

const applyToSaleReducer = createReducer(getDefaultState(), handlers);

export default applyToSaleReducer;
