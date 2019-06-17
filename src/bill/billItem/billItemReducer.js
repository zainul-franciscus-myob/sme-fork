import dateFormat from 'dateformat';

import {
  ADD_LINE,
  CLOSE_MODAL,
  FORMAT_LINE_AMOUNT,
  OPEN_MODAL,
  REMOVE_LINE,
  RESET_TOTALS,
  SET_ADDRESS,
  SET_ALERT_MESSAGE,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  SET_SUBMITTING_STATE,
  TABLE_ROW_CHANGE,
  UPDATE_BILL_OPTION,
  UPDATE_LINES,
} from './BillItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultState = () => ({
  layout: '',
  bill: {
    supplierId: '',
    address: '',
    expirationTerm: '',
    expirationDays: '',
    isTaxInclusive: false,
    isReportable: false,
    billNumber: '',
    note: '',
    lines: [],
    issueDate: '',
  },
  suppliers: [],
  expirationTerms: [],
  items: [],
  taxCodes: [],
  newLine: {
    units: '',
    itemId: '',
    description: '',
    unitPrice: '',
    discount: '',
    displayDiscount: '',
    taxCodeId: '',
    amount: '',
    displayAmount: '',
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  alertMessage: '',
  isLineAmountDirty: false,
  isSubmitting: false,
  isPageEdited: false,
  areLinesCalculating: false,
  modalType: '',
});

const setIssueDate = (context, payload) => {
  if (context.billId === 'newItem') {
    return convertToDateString(Date.now());
  }
  return payload.bill.issueDate;
};

const setInitialState = (state, action) => {
  const { payload, context, layout } = action.context;

  return {
    ...state,
    layout,
    bill: {
      ...payload.bill,
      issueDate: setIssueDate(context, payload),
    },
    suppliers: payload.suppliers,
    expirationTerms: payload.expirationTerms,
    items: payload.items,
    taxCodes: payload.taxCodes,
    newLine: payload.newLine,
    totals: payload.totals,
    ...context,
  };
};

const resetState = () => (getDefaultState());

const addLine = (state, action) => {
  const { id, ...partialLine } = action.line;

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      lines: [
        ...state.bill.lines,
        {
          ...state.newLine,
          ...partialLine,
        },
      ],
    },
  };
};

const updateLines = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    isTaxInclusive: action.bill.isTaxInclusive,
    lines: action.bill.lines,
  },
  totals: action.totals,
});

const changeTableRow = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (index === action.index) {
        return {
          ...line,
          [action.key]: action.value,
          displayDiscount: action.key === 'discount' ? action.value : line.displayDiscount,
          displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
        };
      }
      return line;
    }),
  },
});

const removeLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: state.bill.lines.filter((_, index) => index !== action.index),
  },
});

const resetTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});

const updateBillOption = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    [action.key]: action.value,
  },
});

const setAddress = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    address: action.address,
  },
});

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

const formatLineAmount = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.bill.lines[index][key]);

  return {
    ...state,
    bill: {
      ...state.bill,
      lines: state.bill.lines.map(
        (line, lineIndex) => (lineIndex === index
          ? {
            ...line,
            [key]: parsedNumber,
          }
          : line),
      ),
    },
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const setLineAmountDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

const setAreLinesCalculating = (state, action) => ({
  ...state,
  areLinesCalculating: action.areLinesCalculating,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: undefined,
});

const handlers = {
  [RESET_STATE]: resetState,
  [RESET_TOTALS]: resetTotals,
  [SET_INITIAL_STATE]: setInitialState,
  [ADD_LINE]: addLine,
  [UPDATE_LINES]: updateLines,
  [TABLE_ROW_CHANGE]: changeTableRow,
  [REMOVE_LINE]: removeLine,
  [UPDATE_BILL_OPTION]: updateBillOption,
  [SET_ADDRESS]: setAddress,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_LINE_AMOUNT_DIRTY]: setLineAmountDirty,
  [SET_ARE_LINES_CALCULATING]: setAreLinesCalculating,
  [FORMAT_LINE_AMOUNT]: formatLineAmount,
};

const billItemReducer = createReducer(getDefaultState(), handlers);

export default billItemReducer;
