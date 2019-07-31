import dateFormat from 'dateformat';

import {
  ADD_LINE, FORMAT_LINE_AMOUNT, REMOVE_LINE, RESET_TOTALS, SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY, TABLE_ROW_CHANGE,
  UPDATE_INVOICE_ITEM_OPTION, UPDATE_LINES,
} from './InvoiceItemIntents';
import {
  CLOSE_MODAL, LOAD_CONTACT_ADDRESS,
  OPEN_MODAL, SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
} from '../../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const buildIssueDate = (invoiceId, issueDate) => {
  if (invoiceId === 'newItem') {
    return convertToDateString(Date.now());
  }
  return issueDate;
};

const getDefaultState = () => ({
  alertMessage: '',
  isLineAmountDirty: false,
  isSubmitting: false,
  isPageEdited: false,
  areLinesCalculating: false,
  modalType: '',
  invoice: {
    customerId: '',
    address: '',
    expirationTerm: '',
    expirationDays: 0,
    chargeForLatePayment: '',
    discountForEarlyPayment: '',
    numberOfDaysForDiscount: 0,
    invoiceNumber: '',
    isTaxInclusive: false,
    lines: [],
    note: '',
    issueDate: '',
    purchaseOrderNumber: '',
    isAllowOnlinePayments: false,
  },
  payDirect: {
    isRegistered: false,
    baseUrl: '',
    serialNumber: '',
  },
  customers: [],
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
    displaySubTotal: '$0.00',
    displayTotalTax: '$0.00',
    displayTotalAmount: '$0.00',
    displayAmountDue: '$0.00',
    displayAmountPaid: '$0.00',
    amountPaid: '0.00',
  },
  comments: [],
});

const setInitialState = (state, action) => {
  const {
    payload: {
      customers, expirationTerms, invoice, items, newLine, taxCodes, totals, comments, payDirect,
    },
    context: {
      region, businessId, invoiceId,
    },
  } = action.context;

  return {
    ...state,
    invoice: {
      ...state.invoice,
      ...invoice,
      issueDate: buildIssueDate(invoiceId, invoice.issueDate),
    },
    payDirect,
    customers,
    expirationTerms,
    items,
    taxCodes,
    newLine,
    totals: {
      ...state.totals,
      ...totals,
    },
    region,
    businessId,
    invoiceId,
    comments,
  };
};

const resetState = () => (getDefaultState());


const buildInvoiceOptionValue = ({ key, value }) => (
  key === 'expirationDays'
    ? Number(value)
    : value
);

const updateInvoiceItemOption = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    [action.key]: buildInvoiceOptionValue(action),
  },
});

const loadContactAddress = (state, action) => ({
  ...state,
  invoice: {
    ...state.invoice,
    address: action.address,
  },
});

const setAreLinesCalculating = (state, action) => ({
  ...state,
  areLinesCalculating: action.areLinesCalculating,
});

const setLineAmountDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

const updateLines = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    isTaxInclusive: action.invoice.isTaxInclusive,
    lines: action.invoice.lines,
  },
  totals: {
    ...state.totals,
    ...action.totals,
  },
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

const closeModal = state => ({
  ...state,
  modalType: '',
});

const addLine = (state, action) => {
  const { id, ...partialLine } = action.line;

  return {
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: [
        ...state.invoice.lines,
        {
          ...state.newLine,
          ...partialLine,
        },
      ],
    },
  };
};

const changeTableRow = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

const resetTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

const formatLineAmount = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.invoice.lines[index][key]);

  return {
    ...state,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map(
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

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [UPDATE_INVOICE_ITEM_OPTION]: updateInvoiceItemOption,
  [LOAD_CONTACT_ADDRESS]: loadContactAddress,
  [SET_ARE_LINES_CALCULATING]: setAreLinesCalculating,
  [SET_LINE_AMOUNT_DIRTY]: setLineAmountDirty,
  [UPDATE_LINES]: updateLines,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [ADD_LINE]: addLine,
  [TABLE_ROW_CHANGE]: changeTableRow,
  [REMOVE_LINE]: removeLine,
  [RESET_TOTALS]: resetTotals,
  [FORMAT_LINE_AMOUNT]: formatLineAmount,
};

const invoiceItemReducer = createReducer(getDefaultState(), handlers);

export default invoiceItemReducer;
