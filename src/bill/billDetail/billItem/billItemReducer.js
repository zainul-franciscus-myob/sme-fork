import dateFormat from 'dateformat';

import {
  ADD_LINE,
  CLOSE_MODAL,
  FORMAT_LINE_AMOUNT,
  OPEN_MODAL,
  PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY,
  PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY_ON_SUPPLIER_SELECT,
  REMOVE_LINE,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  SET_SUBMITTING_STATE,
  TABLE_ROW_CHANGE,
  UPDATE_BILL_OPTION,
  UPDATE_LINES,
} from './BillItemIntents';
import {
  LOAD_SUPPLIER_ADDRESS,
} from '../../BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getInTrayPrefillDetails,
  isContactIncludedInContactOptions,
  shouldPrefillANewLineFromInTray,
} from './billItemSelectors';
import createReducer from '../../../store/createReducer';

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
  inTrayDocumentId: '',
  inTrayPrefillDetails: undefined,
  inTrayDocument: undefined,
});

const setIssueDate = (context, payload) => {
  if (context.billId === 'new') {
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

const loadSupplierAddress = (state, action) => ({
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

const getPrefilledNewLineFromInTray = (state, newLine) => ({
  ...state.newLine,
  amount: newLine.amount,
  displayAmount: newLine.amount,
});

const prefillFromInTray = ({
  state, bill, newLine, document,
}) => {
  const lines = newLine.amount
    ? [...state.bill.lines, getPrefilledNewLineFromInTray(state, newLine)]
    : [...state.bill.lines];

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      ...bill,
      lines,
    },
    inTrayDocument: document,
  };
};

const storeInTrayPrefillDetails = ({
  state, bill, newLine, document,
}) => ({
  ...state,
  inTrayPrefillDetails: {
    bill,
    newLine,
    originalBill: {
      supplierId: state.bill.supplierId,
      invoiceNumber: state.bill.invoiceNumber,
      issueDate: state.bill.issueDate,
      isTaxInclusive: state.bill.isTaxInclusive,
    },
  },
  inTrayDocument: document,
});

const prefillNewBillFromInTray = (state, { bill, newLine, document }) => {
  const prefillImmediately = isContactIncludedInContactOptions(state, bill.supplierId);

  if (prefillImmediately) {
    return prefillFromInTray({
      state, bill, newLine, document,
    });
  }
  return storeInTrayPrefillDetails({
    state, bill, newLine, document,
  });
};

const getSupplierIdToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillSupplierId = inTrayPrefillDetails.bill.supplierId;
  const originalSupplierId = inTrayPrefillDetails.originalBill.supplierId;
  const currentSupplierId = state.bill.supplierId;

  const isSupplierIdEdited = currentSupplierId !== originalSupplierId;
  return isSupplierIdEdited ? currentSupplierId : prefillSupplierId;
};

const getInvoiceNumberToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillInvoiceNumber = inTrayPrefillDetails.bill.invoiceNumber;
  const originalInvoiceNumber = inTrayPrefillDetails.originalBill.invoiceNumber;
  const currentInvoiceNumber = state.bill.invoiceNumber;

  const isInvoiceNumberEdited = currentInvoiceNumber !== originalInvoiceNumber;
  return isInvoiceNumberEdited ? currentInvoiceNumber : prefillInvoiceNumber;
};

const getIsTaxInclusiveToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillIsTaxInclusive = inTrayPrefillDetails.bill.isTaxInclusive;
  const originalIsTaxInclusive = inTrayPrefillDetails.originalBill.isTaxInclusive;
  const currentIsTaxInclusive = state.bill.isTaxInclusive;

  const isTaxInclusiveEdited = currentIsTaxInclusive !== originalIsTaxInclusive;
  return isTaxInclusiveEdited || prefillIsTaxInclusive === undefined
    ? currentIsTaxInclusive
    : prefillIsTaxInclusive;
};

const getIssueDateToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillIssueDate = inTrayPrefillDetails.bill.issueDate;
  const originalIssueDate = inTrayPrefillDetails.originalBill.issueDate;
  const currentIssueDate = state.bill.issueDate;

  const isIssueDateEdited = currentIssueDate !== originalIssueDate;
  return isIssueDateEdited ? currentIssueDate : prefillIssueDate;
};

const prefillNewBillFromInTrayOnSupplierSelect = (state) => {
  const supplierId = getSupplierIdToPrefillFromInTray(state);
  const invoiceNumber = getInvoiceNumberToPrefillFromInTray(state);
  const issueDate = getIssueDateToPrefillFromInTray(state);
  const isTaxInclusive = getIsTaxInclusiveToPrefillFromInTray(state);

  const currentLines = state.bill.lines;
  const lines = shouldPrefillANewLineFromInTray(state)
    ? [...currentLines,
      getPrefilledNewLineFromInTray(state, getInTrayPrefillDetails(state).newLine)]
    : [...currentLines];

  const inTrayPrefillCompleted = { inTrayPrefillDetails: undefined };

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      supplierId,
      invoiceNumber,
      issueDate,
      isTaxInclusive,
      lines,
    },
    ...inTrayPrefillCompleted,
  };
};

const handlers = {
  [RESET_STATE]: resetState,
  [RESET_TOTALS]: resetTotals,
  [SET_INITIAL_STATE]: setInitialState,
  [ADD_LINE]: addLine,
  [UPDATE_LINES]: updateLines,
  [TABLE_ROW_CHANGE]: changeTableRow,
  [REMOVE_LINE]: removeLine,
  [UPDATE_BILL_OPTION]: updateBillOption,
  [LOAD_SUPPLIER_ADDRESS]: loadSupplierAddress,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_LINE_AMOUNT_DIRTY]: setLineAmountDirty,
  [SET_ARE_LINES_CALCULATING]: setAreLinesCalculating,
  [FORMAT_LINE_AMOUNT]: formatLineAmount,
  [PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY]: prefillNewBillFromInTray,
  [PREFILL_NEW_BILL_ITEM_FROM_IN_TRAY_ON_SUPPLIER_SELECT]:
  prefillNewBillFromInTrayOnSupplierSelect,
};

const billItemReducer = createReducer(getDefaultState(), handlers);

export default billItemReducer;
