import Decimal from 'decimal.js';

import {
  ADD_INVOICE_LINE,
  CALCULATE_INVOICE_LINES,
  CALCULATE_INVOICE_LINE_AMOUNTS,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_ITEM,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  RELOAD_RECURRING_INVOICE,
  REMOVE_INVOICE_LINE,
  RESET_CUSTOMER,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_INVOICE_ITEM_LINE_DIRTY,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_REDIRECT_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_INVOICE_HEADER_OPTIONS,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
  UPDATE_RECURRING_INVOICE_ID_AFTER_CREATE,
  UPDATE_SCHEDULE_OPTIONS,
} from '../RecurringInvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  calculateInvoiceLines,
  calculateLineAmounts,
} from './CalculationReducer';
import {
  getBusinessId,
  getRecurringTransactionId,
  getRegion,
  getScheduleRemainingTimes,
} from '../selectors/RecurringInvoiceSelectors';
import { getIsRecurringTransactionEnabled } from '../../recurringTransactionList/recurringTransactionListSelectors';
import { getPayDirect } from '../selectors/PayDirectSelectors';
import { loadPayDirect, setPayDirectLoadingState } from './PayDirectReducer';
import LoadingState from '../../../../components/PageView/LoadingState';
import SalesLineType from '../../types/SalesLineType';
import createReducer from '../../../../store/createReducer';
import getDefaultState, {
  DEFAULT_DISCOUNT,
  DEFAULT_UNITS,
} from './getDefaultState';

const setInitialState = (state, { context }) => ({ ...state, ...context });

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const setAlert = (state, { alert }) => ({ ...state, alert });

const setModalType = (state, { modalType }) => ({ ...state, modalType });

const loadRecurringInvoice = (state, action) => ({
  ...state,
  ...action,
  schedule: {
    ...state.schedule,
    ...action.schedule,
  },
  invoice: {
    ...state.invoice,
    ...action.invoice,
    lines: action.invoice.lines.map((line) => {
      if (
        [
          SalesLineType.SERVICE,
          SalesLineType.ITEM,
          SalesLineType.SUB_TOTAL,
        ].includes(line.type)
      ) {
        const amount = action.invoice.isTaxInclusive
          ? new Decimal(line.taxExclusiveAmount).add(line.taxAmount).valueOf()
          : new Decimal(line.taxExclusiveAmount).valueOf();

        return { ...line, amount };
      }

      return line;
    }),
  },
  newLine: {
    ...state.newLine,
    ...action.newLine,
  },
  commentOptions: action.commentOptions || state.commentOptions,
  expirationTermOptions:
    action.expirationTermOptions || state.expirationTermOptions,
  taxCodeOptions: action.taxCodeOptions || state.taxCodeOptions,
});

const reloadRecurringInvoice = (state, action) => {
  const defaultState = getDefaultState();

  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const recurringTransactionId = getRecurringTransactionId(state);
  const isRecurringTransactionEnabled = getIsRecurringTransactionEnabled(state);
  const payDirect = getPayDirect(state);

  const context = {
    businessId,
    region,
    recurringTransactionId,
    isRecurringTransactionEnabled,
  };

  const initialState = {
    ...defaultState,
    ...context,
  };

  const loadState = loadRecurringInvoice(initialState, action);

  return {
    ...loadState,
    payDirect,
    loadingState: LoadingState.LOADING_SUCCESS,
  };
};

const updateInvoiceState = (state, partialInvoice) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    ...partialInvoice,
  },
});

const loadCustomer = (state, { address }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address,
  },
});

const resetCustomer = (state) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address: '',
  },
  abn: undefined,
});

const updateInvoiceIdAfterCreate = (state, { recurringTransactionId }) => ({
  ...state,
  recurringTransactionId,
});

const updateScheduleOptions = (state, { key, value }) => {
  const remainingTimes =
    key === 'numberOfTimes' ? value : getScheduleRemainingTimes(state);

  return {
    ...state,
    schedule: {
      ...state.schedule,
      [key]: value,
      remainingTimes,
    },
    isPageEdited: true,
  };
};

const updateInvoiceHeaderOptions = (state, { key, value }) =>
  updateInvoiceState(state, { [key]: value });

const updateInvoiceLayout = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    layout: action.layout,
    lines: state.invoice.lines
      .filter((line) => line.type === SalesLineType.SERVICE)
      .map((line) => ({
        ...line,
        id: '',
      })),
  },
});

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updateInvoiceLine = (state, action) => {
  const isUpdateAccountId = action.key === 'accountId';
  const isUpdateJob = action.key === 'jobId';

  const getLineType = (layout, key) => {
    if (layout === SalesLineType.ITEM) {
      return layout;
    }

    return key === 'itemId' ? SalesLineType.ITEM : SalesLineType.SERVICE;
  };

  return {
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map((line, index) => {
        if (index === action.index) {
          const type = getLineType(line.type, action.key);

          return {
            ...line,
            type,
            id: type === line.type ? line.id : '',
            taxCodeId: isUpdateAccountId
              ? getDefaultTaxCodeId({
                  accountId: action.value,
                  accountOptions: state.accountOptions,
                })
              : line.taxCodeId,
            jobId: isUpdateJob ? action.value : line.jobId,
            [action.key]: action.value,
          };
        }

        return line;
      }),
    },
  };
};

const addInvoiceLine = (state) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: [...state.invoice.lines, state.newLine],
  },
});

const removeInvoiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const setInvoiceItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

export const setRedirectState = (state, { redirectUrl, isOpenInNewTab }) => ({
  ...state,
  redirectUrl,
  isOpenInNewTab,
});

const loadItemSellingDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
      if (index !== action.index) return line;
      const {
        unitOfMeasure,
        description,
        sellTaxCodeId,
        incomeAccountId,
        unitPrice,
      } = action.item;

      return {
        ...line,
        units: DEFAULT_UNITS,
        unitOfMeasure,
        discount: DEFAULT_DISCOUNT,
        description,
        taxCodeId: sellTaxCodeId,
        accountId: incomeAccountId,
        unitPrice,
        amount: unitPrice,
      };
    }),
  },
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const loadAbnFromCustomer = (state, action) => ({
  ...state,
  abn: action.abn,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [SET_MODAL_TYPE]: setModalType,
  [SET_REDIRECT_STATE]: setRedirectState,

  [LOAD_RECURRING_INVOICE]: loadRecurringInvoice,
  [RELOAD_RECURRING_INVOICE]: reloadRecurringInvoice,
  [UPDATE_RECURRING_INVOICE_ID_AFTER_CREATE]: updateInvoiceIdAfterCreate,

  [UPDATE_SCHEDULE_OPTIONS]: updateScheduleOptions,
  [UPDATE_INVOICE_HEADER_OPTIONS]: updateInvoiceHeaderOptions,
  [UPDATE_INVOICE_LAYOUT]: updateInvoiceLayout,

  [ADD_INVOICE_LINE]: addInvoiceLine,
  [REMOVE_INVOICE_LINE]: removeInvoiceLine,
  [UPDATE_INVOICE_LINE]: updateInvoiceLine,
  [CALCULATE_INVOICE_LINES]: calculateInvoiceLines,
  [CALCULATE_INVOICE_LINE_AMOUNTS]: calculateLineAmounts,
  [SET_INVOICE_ITEM_LINE_DIRTY]: setInvoiceItemLineDirty,
  [LOAD_ITEM]: loadItemSellingDetails,

  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [LOAD_CUSTOMER]: loadCustomer,
  [RESET_CUSTOMER]: resetCustomer,

  [LOAD_ABN_FROM_CUSTOMER]: loadAbnFromCustomer,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,

  [LOAD_PAY_DIRECT]: loadPayDirect,
  [SET_PAY_DIRECT_LOADING_STATE]: setPayDirectLoadingState,
};

const recurringInvoiceReducer = createReducer(getDefaultState(), handlers);

export default recurringInvoiceReducer;
