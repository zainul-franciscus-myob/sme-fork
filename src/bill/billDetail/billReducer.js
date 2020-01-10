import {
  ADD_BILL_ITEM_LINE,
  ADD_BILL_SERVICE_LINE,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_SERVICE_LINES,
  HIDE_PREFILL_INFO,
  ITEM_CALCULATE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SERVICE_CALCULATE,
  SET_ACCOUNT_LOADING_STATE,
  SET_ATTACHMENT_ID,
  SET_DOCUMENT_LOADING_STATE,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_SHOW_SPLIT_VIEW,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  START_PENDING_CALCULATION,
  START_SUPPLIER_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  STOP_PENDING_CALCULATION,
  STOP_SUPPLIER_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL_ID,
  UPDATE_BILL_ITEM_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_SERVICE_LINE,
  UPDATE_EXPORT_PDF_DETAIL,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getLoadBillModalType, getUpdatedSupplierOptions } from './selectors/billSelectors';
import createReducer from '../../store/createReducer';
import formatAmount from '../../common/valueFormatters/formatAmount';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const defaultPrefillStatus = {
  supplierId: false,
  supplierInvoiceNumber: false,
  issueDate: false,
};

const getDefaultState = () => ({
  today: new Date(),
  isAccountLoading: false,
  businessId: '',
  billId: '',
  duplicatedBillId: '',
  openExportPdf: undefined,
  region: '',
  layout: '',
  bill: {
    uid: '',
    supplierId: '',
    supplierAddress: '',
    supplierInvoiceNumber: '',
    expirationTerm: '',
    expirationDays: '',
    isTaxInclusive: false,
    isReportable: false,
    billNumber: '',
    issueDate: formatIsoDate(new Date()),
    orderNumber: '',
    lines: [],
    status: '',
    amountPaid: '',

    // arl compatibility fields
    // used for update, but not visible
    note: '',
    journalMemo: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
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
  isPendingCalculation: false,
  isSupplierBlocking: false,
  modalType: undefined,
  isModalBlocking: false,
  alert: undefined,
  isDocumentLoading: false,
  /*
   * attachmentId vs. inTrayDocumentId
   *
   * This confusion comes from the current implementation of cash out in tray service
   * Basically, when a document is just in the in tray list, it has only `inTrayDocumentId`,
   * but once it links to a business event, it will get another `attachmentId`
   * Due to the technical difficulty in Huxley/PAPI side, we have to
   *   - retrieve `attachmentId` but not `inTrayDocumentId` when we read an existing bill
   *   - use `attachmentId` for unlink a in tray document
   *   - use `inTrayDocumentId` for all the other cases
   */
  attachmentId: '',
  inTrayDocumentId: '',
  inTrayDocument: undefined,
  inTrayDocumentUrl: undefined,
  showPrefillInfo: false,
  prefillStatus: defaultPrefillStatus,
  exportPdf: {
    templateOptions: [],
    template: '',
  },
  showSplitView: false,
});

const loadBill = (state, action) => {
  const defaultState = getDefaultState();

  const isCreating = state.billId === 'new';

  const modalType = getLoadBillModalType(state);

  return ({
    ...state,
    ...action.response,
    bill: {
      ...action.response.bill,
      issueDate: isCreating
        ? formatIsoDate(state.today)
        : action.response.bill.issueDate,
    },
    monthlyLimit: action.response.monthlyLimit,
    exportPdf: {
      ...state.exportPdf,
      ...action.response.exportPdf,
    },
    openExportPdf: defaultState.openExportPdf,
    modalType,
  });
};

const setInitialState = (state, action) => ({ ...state, ...action.context });

const resetState = () => getDefaultState();

const updateBillOption = (state, action) => {
  const isUpdatingExpirationTermToDayOfMonth = action.key === 'expirationTerm' && ['DayOfMonthAfterEOM', 'OnADayOfTheMonth'].includes(action.value);
  const isExpirationDays0 = state.bill.expirationDays === '0';
  const shouldSetExpirationDaysTo1 = isUpdatingExpirationTermToDayOfMonth
  && isExpirationDays0;
  const isPrefillFields = Object.keys(defaultPrefillStatus).includes(action.key);

  return ({
    ...state,
    bill: {
      ...state.bill,
      expirationDays: shouldSetExpirationDaysTo1 ? '1' : state.bill.expirationDays,
      [action.key]: action.value,
    },
    isPageEdited: true,
    prefillStatus: isPrefillFields
      ? { ...state.prefillStatus, [action.key]: false } : state.prefillStatus,
  });
};

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

const formatAmountPaid = state => ({
  ...state,
  bill: {
    ...state.bill,
    displayAmountPaid: formatAmount(state.bill.amountPaid),
  },
});

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

const loadSupplierAfterCreate = (state, { supplierId, supplierAddress, option }) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierId,
    supplierAddress,
  },
  supplierOptions: getUpdatedSupplierOptions(state, option),
  prefillStatus: {
    ...state.prefillStatus,
    supplierId: false,
  },
});

const startSupplierBlocking = state => ({ ...state, isSupplierBlocking: true });

const stopSupplierBlocking = state => ({ ...state, isSupplierBlocking: false });

const startBlocking = state => ({
  ...state,
  isBlocking: true,
});

const stopBlocking = state => ({
  ...state,
  isBlocking: false,
});

const startModalBlocking = state => ({
  ...state,
  isModalBlocking: true,
});

const stopModalBlocking = state => ({
  ...state,
  isModalBlocking: false,
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

const startPendingCalculation = state => ({
  ...state,
  isPendingCalculation: true,
});

const stopPendingCalculation = state => ({
  ...state,
  isPendingCalculation: false,
});

const getPrefilledNewLineFromInTray = (state, newLine) => ({
  ...state.newLine,
  amount: newLine.amount,
  displayAmount: newLine.amount,
});

const prefillBillFromInTray = (state, action) => {
  let { lines, isTaxInclusive } = state.bill;
  const { supplierId, supplierInvoiceNumber, issueDate } = state.bill;
  const { bill, newLine, document } = action.response;

  if (newLine.amount && state.bill.lines.length === 0) {
    lines = [getPrefilledNewLineFromInTray(state, newLine)];
    isTaxInclusive = bill.isTaxInclusive || isTaxInclusive;
  }

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      supplierId: supplierId || bill.supplierId,
      supplierInvoiceNumber: supplierInvoiceNumber || bill.supplierInvoiceNumber,
      issueDate: bill.issueDate ? bill.issueDate : issueDate,
      isTaxInclusive,
      lines,
    },
    prefillStatus: {
      supplierId: !supplierId && Boolean(bill.supplierId),
      supplierInvoiceNumber: !supplierInvoiceNumber && Boolean(bill.supplierInvoiceNumber),
      issueDate: Boolean(bill.issueDate),
    },
    inTrayDocument: document,
    showPrefillInfo: true,
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

const updateExportPdfDetail = (state, { value }) => ({
  ...state,
  exportPdf: {
    ...state.exportPdf,
    template: value,
  },
});

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [
    action.response,
    ...state.itemOptions,
  ],
});

export const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [
    account,
    ...state.accountOptions,
  ],
  isPageEdited: true,
});

export const setAccountLoadingState = (state, { isAccountLoading }) => (
  { ...state, isAccountLoading }
);

export const setShowSplitView = (state, { showSplitView }) => ({
  ...state,
  showSplitView,
});

export const setInTrayDocumentId = (state, { inTrayDocumentId }) => ({
  ...state,
  inTrayDocumentId,
});

export const loadInTrayDocumentUrl = (state, { inTrayDocumentUrl }) => ({
  ...state,
  inTrayDocumentUrl,
});

export const unlinkInTrayDocument = state => ({
  ...state,
  isDocumentLoading: false,
  inTrayDocumentId: '',
  attachmentId: '',
  inTrayDocument: undefined,
  inTrayDocumentUrl: undefined,
  showPrefillInfo: false,
  prefillStatus: defaultPrefillStatus,
  showSplitView: false,
});

export const setDocumentLoadingState = (state, { isDocumentLoading }) => ({
  ...state,
  isDocumentLoading,
});

export const hidePrefillInfo = state => ({
  ...state,
  showPrefillInfo: false,
});

export const setAttachmentId = (state, { attachmentId }) => ({
  ...state,
  attachmentId,
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
  [START_MODAL_BLOCKING]: startModalBlocking,
  [STOP_MODAL_BLOCKING]: stopModalBlocking,
  [ADD_BILL_SERVICE_LINE]: addBillServiceLine,
  [ADD_BILL_ITEM_LINE]: addBillItemLine,
  [UPDATE_BILL_SERVICE_LINE]: updateBillServiceLine,
  [UPDATE_BILL_ITEM_LINE]: updateBillItemLine,
  [REMOVE_BILL_LINE]: removeBillLine,
  [FORMAT_BILL_SERVICE_LINES]: formatBillServiceLines,
  [SERVICE_CALCULATE]: serviceCalculate,
  [LOAD_SUPPLIER_ADDRESS]: loadSupplierAddress,
  [LOAD_SUPPLIER_AFTER_CREATE]: loadSupplierAfterCreate,
  [START_SUPPLIER_BLOCKING]: startSupplierBlocking,
  [STOP_SUPPLIER_BLOCKING]: stopSupplierBlocking,
  [ITEM_CALCULATE]: itemCalculate,
  [STOP_PENDING_CALCULATION]: stopPendingCalculation,
  [START_PENDING_CALCULATION]: startPendingCalculation,
  [PREFILL_BILL_FROM_IN_TRAY]: prefillBillFromInTray,
  [RESET_TOTALS]: resetTotals,
  [UPDATE_BILL_ID]: updateBillId,
  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,
  [FORMAT_AMOUNT_PAID]: formatAmountPaid,
  [LOAD_ITEM_OPTION]: loadItemOption,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_ACCOUNT_LOADING_STATE]: setAccountLoadingState,
  [SET_SHOW_SPLIT_VIEW]: setShowSplitView,
  [SET_IN_TRAY_DOCUMENT_ID]: setInTrayDocumentId,
  [DOWNLOAD_IN_TRAY_DOCUMENT]: loadInTrayDocumentUrl,
  [UNLINK_IN_TRAY_DOCUMENT]: unlinkInTrayDocument,
  [SET_DOCUMENT_LOADING_STATE]: setDocumentLoadingState,
  [HIDE_PREFILL_INFO]: hidePrefillInfo,
  [SET_ATTACHMENT_ID]: setAttachmentId,
};

const billReducer = createReducer(getDefaultState(), handlers);

export default billReducer;
