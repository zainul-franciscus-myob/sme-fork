import Decimal from 'decimal.js';

import {
  ADD_BILL_LINE,
  CALCULATE_BILL_LINE_AMOUNTS,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  REMOVE_BILL_LINE,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_HEADER_OPTIONS,
  UPDATE_BILL_LAYOUT,
  UPDATE_BILL_LINE,
  UPDATE_BILL_SUPPLIER_OPTIONS,
  UPDATE_SCHEDULE_OPTIONS,
} from '../RecurringBillIntents';
import {
  DEFAULT_DISCOUNT,
  DEFAULT_UNITS,
  getDefaultState,
} from './getDefaultState';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  calculateBillLineAmounts,
  getTaxCalculations,
} from './CalculationReducer';
import { getScheduleRemainingTimes } from '../selectors/RecurringBillSelectors';
import LineTaxTypes from '../types/LineTaxTypes';
import PurchaseLineType from '../types/PurchaseLineType';
import createReducer from '../../../../store/createReducer';

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const setLoadingState = (state, action) => ({
  ...state,
  loadingState: action.loadingState,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const loadRecurringBill = (state, action) => ({
  ...state,
  ...action.response,
  schedule: {
    ...state.schedule,
    ...action.response.schedule,
  },
  bill: {
    ...state.bill,
    ...action.response.bill,
    lines: action.response.bill.lines.map((line) => {
      if (
        [
          PurchaseLineType.SERVICE,
          PurchaseLineType.ITEM,
          PurchaseLineType.SUB_TOTAL,
        ].includes(line.type)
      ) {
        const amount = action.response.bill.isTaxInclusive
          ? new Decimal(line.taxExclusiveAmount).add(line.taxAmount).valueOf()
          : new Decimal(line.taxExclusiveAmount).valueOf();

        return { ...line, amount };
      }

      return line;
    }),
  },
  newLine: {
    ...state.newLine,
    ...action.response.newLine,
  },
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

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updateBillHeaderOptions = (state, action) => {
  const isUpdatingExpirationTermToDayOfMonth =
    action.key === 'expirationTerm' &&
    ['DayOfMonthAfterEOM', 'OnADayOfTheMonth'].includes(action.value);
  const isExpirationDays0 = state.bill.expirationDays === '0';
  const shouldSetExpirationDaysTo1 =
    isUpdatingExpirationTermToDayOfMonth && isExpirationDays0;

  return {
    ...state,
    bill: {
      ...state.bill,
      expirationDays: shouldSetExpirationDaysTo1
        ? '1'
        : state.bill.expirationDays,
      [action.key]: action.value,
    },
    isPageEdited: true,
  };
};

const updateBillSupplierOptions = (state, { item }) => {
  const defaultState = getDefaultState();
  const {
    id = '',
    displayName = '',
    isReportable = defaultState.bill.isReportable,
  } = item || {};

  return {
    ...state,
    bill: {
      ...state.bill,
      supplierId: id,
      supplierAddress: defaultState.bill.supplierAddress,
      isReportable,
      memo: displayName && `Purchase; ${displayName}`,
    },
    abn: defaultState.abn,
  };
};

const updateBillLayout = (state, { value }) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    layout: value,
    lines: state.bill.lines
      .filter((line) => line.type === PurchaseLineType.SERVICE)
      .map((line) => ({
        ...line,
        id: '',
      })),
  },
});

const addRecurringBillLine = (state) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: [...state.bill.lines, state.newLine],
  },
});

const calculateLineLayout = (lineLayout, updateKey) => {
  const isUpdateItemId = updateKey === 'itemId';

  if (lineLayout === PurchaseLineType.ITEM) {
    return lineLayout;
  }

  return isUpdateItemId ? PurchaseLineType.ITEM : PurchaseLineType.SERVICE;
};

const getLineSubTypeId = (type) =>
  type === PurchaseLineType.ITEM
    ? LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID
    : LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID;

const setIsLineEdited = (key) =>
  ['discount', 'amount', 'units', 'unitPrice'].includes(key);

const updateRecurringBillLine = (state, action) => ({
  ...state,
  isLineEdited: Boolean(setIsLineEdited(action.key)),
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (index === action.index) {
        const type = calculateLineLayout(line.type, action.key);
        return {
          ...line,
          id: type === line.type ? line.id : '',
          taxCodeId:
            action.key === 'accountId'
              ? getDefaultTaxCodeId({
                  accountId: action.value,
                  accountOptions: state.accountOptions,
                })
              : line.taxCodeId,
          type,
          lineSubTypeId: getLineSubTypeId(type),
          [action.key]: action.value,
        };
      }
      return line;
    }),
  },
});

const removeRecurringBillLine = (state, action) => {
  const lines = state.bill.lines.filter((_, index) => index !== action.index);
  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      lines,
    },
  };
};

const loadSupplier = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierAddress: action.response.supplierAddress,
  },
});

const loadAbnFromSupplier = (state, action) => ({
  ...state,
  abn: action.abn,
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

const loadItem = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (index === action.index) {
        const { unitPrice, description, taxCodeId, accountId } = action.item;

        return {
          ...line,
          units: DEFAULT_UNITS,
          unitPrice,
          discount: DEFAULT_DISCOUNT,
          description,
          taxCodeId,
          accountId,
          amount: unitPrice,
        };
      }

      return line;
    }),
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,

  [SET_ALERT]: setAlert,
  [SET_MODAL]: setModal,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_REDIRECT_URL]: setRedirectUrl,

  [LOAD_RECURRING_BILL]: loadRecurringBill,

  [UPDATE_SCHEDULE_OPTIONS]: updateScheduleOptions,
  [UPDATE_BILL_HEADER_OPTIONS]: updateBillHeaderOptions,
  [UPDATE_BILL_SUPPLIER_OPTIONS]: updateBillSupplierOptions,
  [UPDATE_BILL_LAYOUT]: updateBillLayout,

  [ADD_BILL_LINE]: addRecurringBillLine,
  [REMOVE_BILL_LINE]: removeRecurringBillLine,
  [UPDATE_BILL_LINE]: updateRecurringBillLine,
  [CALCULATE_BILL_LINE_AMOUNTS]: calculateBillLineAmounts,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,

  [LOAD_SUPPLIER]: loadSupplier,
  [LOAD_ABN_FROM_SUPPLIER]: loadAbnFromSupplier,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,

  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,

  [LOAD_ITEM]: loadItem,
};

const recurringBillReducer = createReducer(getDefaultState(), handlers);

export default recurringBillReducer;
