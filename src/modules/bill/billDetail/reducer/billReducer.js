import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_LINE,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  RELOAD_BILL,
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
} from '../BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { calculateLineAmounts, getTaxCalculations } from './calculationReducer';
import { defaultLinePrefillStatus, defaultPrefillStatus, getDefaultState } from './getDefaultState';
import {
  getBillId,
  getBusinessId,
  getIsCreating,
  getRegion,
  getUpdatedSupplierOptions,
} from '../selectors/billSelectors';
import BillLayout from '../types/BillLayout';
import BillLineLayout from '../types/BillLineLayout';
import LineTaxTypes from '../types/LineTaxTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatDisplayAmount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayAmount';
import formatDisplayDiscount from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayDiscount';
import formatDisplayUnitPrice from '../../../../common/valueFormatters/formatTaxCalculation/formatDisplayUnitPrice';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';
import formatUnits from '../../../../common/valueFormatters/formatTaxCalculation/formatUnits';

const loadBill = (state, action) => {
  const defaultState = getDefaultState();

  const isCreating = state.billId === 'new';

  return ({
    ...state,
    ...action.response,
    bill: {
      ...action.response.bill,
      issueDate: isCreating
        ? formatIsoDate(state.today)
        : action.response.bill.issueDate,
      displayAmountPaid: formatCurrency(action.response.bill.amountPaid || 0),
      lines: action.response.bill.lines.map(line => ({
        ...line,
        displayAmount: formatDisplayAmount(line.amount || 0),
        displayDiscount: line.discount ? formatDisplayDiscount(line.discount) : '',
        displayUnitPrice: line.unitPrice ? formatDisplayUnitPrice(line.unitPrice) : '',
      })),
    },
    newLine: {
      ...state.newLine,
      ...action.response.newLine,
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
    inTrayDocument: {
      ...action.response.inTrayDocument,
      uploadedDate: '', // PAPI can not provide correct uploadedDate as part of bill loading, ignore it before the fix is in place
    },
  });
};

const reloadBill = (state, action) => {
  const defaultState = getDefaultState();

  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const billId = getBillId(state);

  const context = { businessId, region, billId };

  const initialState = {
    ...defaultState,
    ...context,
    loadingState: LoadingState.LOADING_SUCCESS,
  };

  return loadBill(initialState, action);
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

const formatDisplayField = (line, key) => {
  const fieldMap = {
    unitPrice: { displayField: 'displayUnitPrice', formatter: formatDisplayUnitPrice },
    amount: { displayField: 'displayAmount', formatter: formatDisplayAmount },
    discount: { displayField: 'displayDiscount', formatter: formatDisplayDiscount },
    units: { displayField: 'units', formatter: formatUnits },
  };
  const { displayField, formatter } = fieldMap[key] || {};

  return formatter ? {
    [displayField]: line[key] && formatter(line[key]),
  } : {};
};

const formatBillLine = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line, index) => (
      index === action.index ? {
        ...line,
        ...formatDisplayField(line, action.key),
      } : line
    )),
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

const loadSupplierDetail = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierAddress: action.response.supplierAddress,
    expenseAccountId: getIsCreating(state)
      ? action.response.expenseAccountId
      : state.bill.expenseAccountId,
    lines: state.bill.lines.length > 0 && getIsCreating(state)
      ? updateAllLinesWithExpenseAccount(
        state.bill.lines,
        state.accountOptions,
        action.response.expenseAccountId,
      )
      : state.bill.lines,
  },
});

const loadSupplierAfterCreate = (state, {
  supplierId, supplierAddress, option, expenseAccountId,
}) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierId,
    supplierAddress,
    expenseAccountId: getIsCreating(state)
      ? expenseAccountId
      : state.bill.expenseAccountId,
    lines: state.bill.lines.length > 0 && getIsCreating(state)
      ? updateAllLinesWithExpenseAccount(
        state.bill.lines,
        state.accountOptions,
        expenseAccountId,
      )
      : state.bill.lines,
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
    displayAmount: formatDisplayAmount(line.amount || 0),
    displayDiscount: line.discount ? formatDisplayDiscount(line.discount) : '',
    displayUnitPrice: line.unitPrice ? formatDisplayUnitPrice(line.unitPrice) : '',
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

      const updatedLine = {
        ...line,
        ...action.updatedLine,
      };

      return ({
        ...updatedLine,
        displayAmount: formatDisplayAmount(updatedLine.amount || 0),
        displayDiscount: formatDisplayDiscount(updatedLine.discount || 0),
        displayUnitPrice: formatDisplayUnitPrice(updatedLine.unitPrice || 0),
      });
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
  [RELOAD_BILL]: reloadBill,
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
  [FORMAT_BILL_LINE]: formatBillLine,
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [REMOVE_BILL_LINE]: removeBillLine,
  [SET_CALCULATED_BILL_LINES_AND_TOTALS]: setCalculatedBillLinesAndTotals,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [LOAD_ITEM_OPTION]: loadItemOption,
  [LOAD_ITEM_DETAIL_FOR_LINE]: loadItemDetailForLine,
  [LOAD_SUPPLIER_DETAIL]: loadSupplierDetail,
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
