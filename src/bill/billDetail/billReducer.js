import {
  ADD_BILL_ITEM_LINE,
  ADD_BILL_SERVICE_LINE,
  CLOSE_ALERT,
  CLOSE_MODAL,
  FORMAT_BILL_SERVICE_LINES,
  ITEM_CALCULATE,
  LINE_AMOUNT_CALCULATED,
  LINE_AMOUNT_PENDING_CALCULATION,
  LOAD_BILL,
  LOAD_SUPPLIER_ADDRESS,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SERVICE_CALCULATE,
  START_BLOCKING,
  START_LOADING,
  STOP_BLOCKING,
  STOP_LOADING,
  UPDATE_BILL_ID,
  UPDATE_BILL_ITEM_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_SERVICE_LINE,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatAmount from '../../valueFormatters/formatAmount';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  today: new Date(),
  businessId: '',
  billId: '',
  duplicatedBillId: '',
  region: '',
  layout: '',
  bill: {
    supplierId: '',
    supplierAddress: '',
    supplierInvoiceNumber: '',
    expirationTerm: '',
    expirationDays: '',
    isTaxInclusive: false,
    isReportable: false,
    billNumber: '',
    issueDate: '',
    orderNumber: '',
    lines: [],
    status: '',
    amountPaid: '',
  },
  supplierOptions: [],
  expirationTermOptions: [],
  itemOptions: [],
  accountOptions: [],
  taxCodeOptions: [],
  newLine: {
    id: '',
    description: '',
    amount: '',
    displayAmount: '',
    taxCodeId: '',

    // service
    accountId: '',

    // item
    units: '',
    discount: '',
    displayDiscount: '',
    unitPrice: '',
    itemId: '',
  },
  totals: {
    subTotal: '',
    totalTax: '',
    totalAmount: '',
    amountDue: '',
  },
  isLoading: false,
  isPageEdited: false,
  isLineAmountPendingCalculation: false,
  modalType: undefined,
  alert: undefined,
  inTrayDocumentId: '',
  inTrayPrefillDetails: undefined,
  inTrayDocument: undefined,
});

const loadBill = (state, action) => {
  const isCreating = state.billId === 'new';

  return ({
    ...state,
    ...action.response,
    bill: {
      ...action.response.bill,
      issueDate: isCreating
        ? formatIsoDate(state.today)
        : action.response.bill.issueDate,
    },
  });
};

const setInitialState = (state, action) => ({ ...state, ...action.context });

const resetState = () => getDefaultState();

const updateBillOption = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

const closeModal = state => ({
  ...state,
  modalType: undefined,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeAlert = state => ({
  ...state,
  alert: undefined,
});

const openAlert = (state, action) => ({
  ...state,
  alert: {
    message: action.message,
    type: action.type,
  },
});

const startLoading = state => ({
  ...state,
  isLoading: true,
});

const stopLoading = state => ({
  ...state,
  isLoading: false,
});

const getTaxCodeIdByAccountId = (state, accountId) => {
  const selectedAccountOption = state.accountOptions
    .find(accountOption => accountOption.id === accountId);
  const { taxCodeId } = selectedAccountOption;
  return taxCodeId;
};

const addBillServiceLine = (state, action) => {
  const { newLine } = state;
  const selectedAccountId = action.accountId;
  const taxCodeId = getTaxCodeIdByAccountId(state, selectedAccountId);

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      lines: [
        ...state.bill.lines,
        {
          ...newLine,
          accountId: selectedAccountId,
          taxCodeId,
        },
      ],
    },
  };
};

const addBillItemLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: [
      ...state.bill.lines,
      {
        ...state.newLine,
        itemId: action.itemId,
      },
    ],
  },

});

const updateBillServiceLine = (state, action) => {
  const lines = state.bill.lines.map((line, index) => {
    if (index === action.index) {
      if (action.key === 'accountId') {
        return {
          ...line,
          taxCodeId: getTaxCodeIdByAccountId(state, action.value),
          accountId: action.value,
        };
      }

      return {
        ...line,
        [action.key]: action.value,
        displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
      };
    }

    return line;
  });

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      lines,
    },
  };
};

const updateBillItemLine = (state, action) => ({
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

const removeBillLine = (state, action) => {
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

const formatBillServiceLines = (state) => {
  const lines = state.bill.lines.map(line => ({
    ...line,
    displayAmount: formatAmount(line.amount),
  }));

  return {
    ...state,
    bill: {
      ...state.bill,
      lines,
    },
  };
};

const serviceCalculate = (state, action) => ({
  ...state,
  totals: action.response.totals,
});

const loadSupplierAddress = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierAddress: action.response.supplierAddress,
  },
});

const startBlocking = state => ({
  ...state,
  isBlocking: true,
});

const stopBlocking = state => ({
  ...state,
  isBlocking: false,
});

const itemCalculate = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    isTaxInclusive: action.response.bill.isTaxInclusive,
    lines: action.response.bill.lines,
  },
  totals: action.response.totals,
});

const lineAmountPendingCalculation = state => ({
  ...state,
  isLineAmountPendingCalculation: true,
});

const lineAmountCalculated = state => ({
  ...state,
  isLineAmountPendingCalculation: false,
});

const getPrefilledNewLineFromInTray = (state, newLine) => ({
  ...state.newLine,
  amount: newLine.amount,
  displayAmount: newLine.amount,
});

const prefillNewBillFromInTray = (state, action) => {
  const { bill, newLine, document } = action.response;

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

const resetTotals = state => ({
  ...state,
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
    amountDue: '$0.00',
  },
});

const updateBillId = (state, action) => ({
  ...state,
  billId: action.id,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_BILL]: loadBill,
  [UPDATE_BILL_OPTION]: updateBillOption,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [OPEN_ALERT]: openAlert,
  [CLOSE_ALERT]: closeAlert,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading,
  [START_BLOCKING]: startBlocking,
  [STOP_BLOCKING]: stopBlocking,
  [ADD_BILL_SERVICE_LINE]: addBillServiceLine,
  [ADD_BILL_ITEM_LINE]: addBillItemLine,
  [UPDATE_BILL_SERVICE_LINE]: updateBillServiceLine,
  [UPDATE_BILL_ITEM_LINE]: updateBillItemLine,
  [REMOVE_BILL_LINE]: removeBillLine,
  [FORMAT_BILL_SERVICE_LINES]: formatBillServiceLines,
  [SERVICE_CALCULATE]: serviceCalculate,
  [LOAD_SUPPLIER_ADDRESS]: loadSupplierAddress,
  [ITEM_CALCULATE]: itemCalculate,
  [LINE_AMOUNT_CALCULATED]: lineAmountCalculated,
  [LINE_AMOUNT_PENDING_CALCULATION]: lineAmountPendingCalculation,
  [PREFILL_NEW_BILL_FROM_IN_TRAY]: prefillNewBillFromInTray,
  [RESET_TOTALS]: resetTotals,
  [UPDATE_BILL_ID]: updateBillId,
};

const billReducer = createReducer(getDefaultState(), handlers);

export default billReducer;
