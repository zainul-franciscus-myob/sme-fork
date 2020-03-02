import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL, DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_LINE,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SET_ATTACHMENT_ID,
  SET_CALCULATED_BILL_LINES_AND_TOTALS,
  SET_DOCUMENT_LOADING_STATE,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_SHOW_SPLIT_VIEW,
  SET_UPGRADE_MODAL_SHOWING,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  START_SUPPLIER_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  STOP_SUPPLIER_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL_ID,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_LAYOUT,
  UPDATE_LINE_ITEM_ID,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { calculateLineAmounts, getTaxCalculations } from './calculationReducer';
import { getLoadBillModalType, getUpdatedSupplierOptions } from './selectors/billSelectors';
import BillLayout from './types/BillLayout';
import BillLineLayout from './types/BillLineLayout';
import LineTaxTypes from './types/LineTaxTypes';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const defaultPrefillStatus = {
  supplierId: false,
  supplierInvoiceNumber: false,
  issueDate: false,
};

const defaultLinePrefillStatus = {
  description: false,
  amount: false,
  discount: false,
  units: false,
  unitPrice: false,
};

const getDefaultState = () => ({
  today: new Date(),
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
    originalExpenseAccountId: '',
    expenseAccountId: '',
    billNumber: '',
    issueDate: formatIsoDate(new Date()),
    lines: [],
    status: '',
    amountPaid: '',
    displayAmountPaid: '',

    // arl compatibility fields
    // used for update, but not visible
    note: '',
    memo: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
  },
  subscription: {
    monthlyLimit: {
      hasHitLimit: false,
    },
    isUpgradeModalShowing: false,
  },
  supplierOptions: [],
  expirationTermOptions: [],
  itemOptions: [],
  accountOptions: [],
  taxCodeOptions: [],
  newLine: {
    id: '',
    type: '',
    description: '',
    amount: '',
    displayAmount: '',
    taxCodeId: '',
    accountId: '',
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
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isLineEdited: false,
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
  itemTemplateOptions: {
    templateOptions: [],
    defaultTemplate: '',
  },
  serviceTemplateOptions: {
    templateOptions: [],
    defaultTemplate: '',
  },
  exportPdf: {
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
    itemTemplateOptions: action.response.itemTemplateOptions || state.itemTemplateOptions,
    serviceTemplateOptions: action.response.serviceTemplateOptions || state.serviceTemplateOptions,
    subscription: action.response.subscription
      ? {
        monthlyLimit: action.response.subscription.monthlyLimit,
        isUpgradeModalShowing: !!action.response.subscription.monthlyLimit.hasHitLimit,
      }
      : defaultState.subscription,
    exportPdf: {
      ...state.exportPdf,
      ...action.response.exportPdf,
    },
    openExportPdf: defaultState.openExportPdf,
    modalType,
    inTrayDocument: {
      ...action.response.inTrayDocument,
      uploadedDate: '', // PAPI can not provide correct uploadedDate as part of bill loading, ignore it before the fix is in place
    },
  });
};

const setInitialState = (state, action) => ({ ...state, ...action.context });

const resetState = () => getDefaultState();

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updateAllLinesWithExpenseAccount = (lines, accountOptions, expenseAccountId) => {
  const taxCodeId = getDefaultTaxCodeId({ accountId: expenseAccountId, accountOptions });
  return lines.map(line => ({
    ...line,
    accountId: expenseAccountId,
    taxCodeId,
  }));
};

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
      displayAmountPaid: action.key === 'amountPaid' ? action.value : state.bill.displayAmountPaid,
      lines: state.bill.lines.length > 0 && action.key === 'expenseAccountId'
        ? updateAllLinesWithExpenseAccount(state.bill.lines, state.accountOptions, action.value)
        : state.bill.lines,
      [action.key]: action.value,
    },
    isPageEdited: true,
    prefillStatus: isPrefillFields
      ? { ...state.prefillStatus, [action.key]: false } : state.prefillStatus,
  });
};

const getDefaultTemplate = (value, itemTemplateOptions, serviceTemplateOptions) => {
  if (value === BillLayout.ITEM_AND_SERVICE) {
    return itemTemplateOptions ? itemTemplateOptions.defaultTemplate : '';
  }
  return serviceTemplateOptions ? serviceTemplateOptions.defaultTemplate : '';
};

const updateLayout = (state, { value }) => ({
  ...state,
  isPageEdited: true,
  layout: value,
  bill: {
    ...state.bill,
    lines: state.bill.lines
      .filter(line => line.type === BillLineLayout.SERVICE)
      .map(line => ({
        ...line,
        id: '',
      })),
  },
  exportPdf: {
    ...state.exportPdf,
    template: getDefaultTemplate(value, state.itemTemplateOptions, state.serviceTemplateOptions),
  },
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
  loadingState: LoadingState.LOADING,
});

const stopLoading = state => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
});

const failLoading = state => ({
  ...state,
  loadingState: LoadingState.LOADING_FAIL,
});

const addBillLine = state => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: [
      ...state.bill.lines,
      state.newLine,
    ],
  },

});

const calculateLineLayout = (lineLayout, updateKey) => {
  const isUpdateItemId = updateKey === 'itemId';

  if (lineLayout === BillLineLayout.ITEM) {
    return lineLayout;
  }

  return isUpdateItemId ? BillLineLayout.ITEM : BillLineLayout.SERVICE;
};

const getLineSubTypeId = type => (type === BillLineLayout.ITEM
  ? LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID
  : LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID);

const getLinePrefillStatus = (key, currentStateLinePrefillStatus) => {
  const isPrefillField = Object.keys(defaultLinePrefillStatus).includes(key);
  return isPrefillField ? {
    ...currentStateLinePrefillStatus,
    [key]: false,
  } : currentStateLinePrefillStatus;
};

const setIsLineEdited = key => ['discount', 'amount', 'units', 'unitPrice'].includes(key);

const updateBillLine = (state, action) => ({
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
          displayDiscount: action.key === 'discount' ? action.value : line.displayDiscount,
          displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
          taxCodeId: action.key === 'accountId'
            ? getDefaultTaxCodeId({ accountId: action.value, accountOptions: state.accountOptions })
            : line.taxCodeId,
          type,
          lineSubTypeId: getLineSubTypeId(type),
          prefillStatus: line.prefillStatus
            ? getLinePrefillStatus(action.key, line.prefillStatus)
            : undefined,
          [action.key]: action.value,
        };
      }
      return line;
    }),
  },
});

const updateLineItemId = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map(
      (line, index) => (index === action.index
        ? ({
          ...line,
          itemId: action.value,
        })
        : line),
    ),
  },
});

// @TO-DO: Confirm if this behaviour is still necessary. It can either be removed or combined when
// we calculate line amounts
const DEFAULT_UNITS = '1';
const formatBillLine = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (index === action.index) {
        const isFormatUnits = action.key === 'units';
        const isUnitsCleared = Number(line.units) === 0;

        return {
          ...line,
          units: isFormatUnits && isUnitsCleared ? DEFAULT_UNITS : line.units,
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

const formatAmountPaid = state => ({
  ...state,
  bill: {
    ...state.bill,
    displayAmountPaid: formatAmount(state.bill.amountPaid),
  },
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

const setCalculatedBillLinesAndTotals = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    isTaxInclusive: action.response.bill.isTaxInclusive,
    lines: action.response.bill.lines,
  },
  totals: action.response.totals,
});

const getPrefilledLines = (state, lines, expenseAccountId) => lines.map(
  line => ({
    ...state.newLine,
    ...line,
    accountId: expenseAccountId || state.newLine.accountId,
    taxCodeId: expenseAccountId
      ? getDefaultTaxCodeId({ accountId: expenseAccountId, accountOptions: state.accountOptions })
      : state.newLine.taxCodeId,
    prefillStatus: {
      description: Boolean(line.description),
      amount: Boolean(line.amount),
      discount: Boolean(line.discount),
      units: Boolean(line.units),
      unitPrice: Boolean(line.unitPrice),
    },
  }),
);

const prefillBillFromInTray = (state, action) => {
  const {
    layout, bill, lines, document,
  } = action.response;

  const shouldPrefillLines = state.bill.lines.length === 0
    && lines.length > 0;

  return {
    ...state,
    isPageEdited: true,
    layout: shouldPrefillLines ? layout : state.layout,
    bill: {
      ...state.bill,
      supplierId: state.bill.supplierId || bill.supplierId,
      supplierInvoiceNumber: state.bill.supplierInvoiceNumber || bill.supplierInvoiceNumber,
      issueDate: bill.issueDate ? bill.issueDate : state.bill.issueDate,
      isTaxInclusive: shouldPrefillLines ? bill.isTaxInclusive : state.bill.isTaxInclusive,
      originalExpenseAccountId: bill.expenseAccountId || state.bill.originalExpenseAccountId,
      expenseAccountId: bill.expenseAccountId || state.bill.expenseAccountId,
      lines: shouldPrefillLines
        ? getPrefilledLines(state, lines, bill.expenseAccountId)
        : state.bill.lines,
    },
    prefillStatus: {
      supplierId: !state.bill.supplierId && Boolean(bill.supplierId),
      supplierInvoiceNumber: !state.bill.supplierInvoiceNumber
        && Boolean(bill.supplierInvoiceNumber),
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

const loadItemDetailForLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => {
      if (index !== action.index) {
        return line;
      }
      return {
        ...line,
        ...action.updatedLine,
      };
    }),
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

const setUpgradeModalShowing = (state, { isUpgradeModalShowing, monthlyLimit }) => ({
  ...state,
  subscription: {
    isUpgradeModalShowing,
    monthlyLimit: monthlyLimit || state.subscription.monthlyLimit,
  },
});


const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_BILL]: loadBill,
  [UPDATE_BILL_OPTION]: updateBillOption,
  [UPDATE_LAYOUT]: updateLayout,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [OPEN_ALERT]: openAlert,
  [CLOSE_ALERT]: closeAlert,
  [START_LOADING]: startLoading,
  [STOP_LOADING]: stopLoading,
  [FAIL_LOADING]: failLoading,
  [START_BLOCKING]: startBlocking,
  [STOP_BLOCKING]: stopBlocking,
  [START_MODAL_BLOCKING]: startModalBlocking,
  [STOP_MODAL_BLOCKING]: stopModalBlocking,
  [ADD_BILL_LINE]: addBillLine,
  [UPDATE_BILL_LINE]: updateBillLine,
  [UPDATE_LINE_ITEM_ID]: updateLineItemId,
  [FORMAT_BILL_LINE]: formatBillLine,
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [REMOVE_BILL_LINE]: removeBillLine,
  [SET_CALCULATED_BILL_LINES_AND_TOTALS]: setCalculatedBillLinesAndTotals,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [LOAD_ITEM_OPTION]: loadItemOption,
  [LOAD_ITEM_DETAIL_FOR_LINE]: loadItemDetailForLine,
  [LOAD_SUPPLIER_ADDRESS]: loadSupplierAddress,
  [LOAD_SUPPLIER_AFTER_CREATE]: loadSupplierAfterCreate,
  [START_SUPPLIER_BLOCKING]: startSupplierBlocking,
  [STOP_SUPPLIER_BLOCKING]: stopSupplierBlocking,
  [PREFILL_BILL_FROM_IN_TRAY]: prefillBillFromInTray,
  [RESET_TOTALS]: resetTotals,
  [UPDATE_BILL_ID]: updateBillId,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,
  [FORMAT_AMOUNT_PAID]: formatAmountPaid,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
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
