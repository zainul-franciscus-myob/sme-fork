import { isBefore } from 'date-fns';
import Decimal from 'decimal.js';

import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  CONVERT_TO_PRE_CONVERSION_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  RELOAD_BILL,
  REMOVE_BILL_LINE,
  RESET_SUPPLIER,
  SET_ABN_LOADING_STATE,
  SET_ATTACHMENT_ID,
  SET_DOCUMENT_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_PAYMENT_MODAL_ALERT,
  SET_PAYMENT_MODAL_LOADING_STATE,
  SET_PAYMENT_MODAL_SUBMITTING_STATE,
  SET_REDIRECT_URL,
  SET_SHOW_PRE_CONVERSION_ALERT,
  SET_SHOW_SPLIT_VIEW,
  SET_SOURCE,
  SET_UPGRADE_MODAL_SHOWING,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL_ID,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_PAYMENT_AMOUNT_FIELDS,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_HEADER_OPTION,
  UPDATE_ISSUE_DATE,
  UPDATE_LAYOUT,
  UPDATE_REFERENCE_ID,
} from '../BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  calculateAmountDue,
  calculateTotals,
  getBillId,
  getBusinessId,
  getConversionDate,
  getIsCreatingFromInTray,
  getRegion,
} from '../selectors/billSelectors';
import { calculateLineAmounts, getTaxCalculations } from './calculationReducer';
import {
  defaultLinePrefillStatus,
  defaultPrefillStatus,
  getDefaultState,
} from './getDefaultState';
import { getHasInTrayDocumentId } from '../selectors/BillInTrayDocumentSelectors';
import {
  loadNewBillPayment,
  setPaymentModalAlert,
  setPaymentModalLoadingState,
  setPaymentModalSubmittingState,
  updateBillPaymentAmountFields,
  updateHeaderOption,
  updateReferenceId,
} from './billRecordPaymentReducer';
import BillLayout from '../types/BillLayout';
import BillLineType from '../types/BillLineType';
import BillStatus from '../types/BillStatus';
import LineTaxTypes from '../types/LineTaxTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

const setOriginalAmountDue = ({
  isTaxInclusive,
  lines,
  amountPaid,
  taxExclusiveFreightAmount = '0',
  freightTaxAmount = '0',
}) => {
  const { totalAmount } = calculateTotals({
    isTaxInclusive,
    lines,
    taxExclusiveFreightAmount,
    freightTaxAmount,
  });
  return calculateAmountDue(totalAmount, amountPaid);
};

const getIsBeforeConversionDate = (date, conversionDate) =>
  Boolean(date) &&
  Boolean(conversionDate) &&
  isBefore(new Date(date), new Date(conversionDate));

const loadBill = (state, action) => {
  const defaultState = getDefaultState();

  const isCreating = state.billId === 'new';
  const isPreConversion = getIsBeforeConversionDate(
    action.response.bill.issueDate,
    action.response.conversionDate
  );

  return {
    ...state,
    ...action.response,
    bill: {
      ...state.bill,
      ...action.response.bill,
      status: action.response.bill.status || BillStatus.NONE,
      issueDate: isCreating
        ? formatIsoDate(state.today)
        : action.response.bill.issueDate,
      lines: action.response.bill.lines.map((line) => {
        if (
          [
            BillLineType.SERVICE,
            BillLineType.ITEM,
            BillLineType.SUB_TOTAL,
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
    originalAmountDue: setOriginalAmountDue(action.response.bill),
    newLine: {
      ...state.newLine,
      ...action.response.newLine,
    },
    template: action.response.template || state.template,
    subscription: action.response.subscription
      ? {
          monthlyLimit: action.response.subscription.monthlyLimit,
          isUpgradeModalShowing: !!action.response.subscription.monthlyLimit
            .hasHitLimit,
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
    isPreConversion,
    showPreConversionAlert: isPreConversion,
  };
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

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updateAllLinesWithExpenseAccount = (
  lines,
  accountOptions,
  expenseAccountId
) => {
  const taxCodeId = getDefaultTaxCodeId({
    accountId: expenseAccountId,
    accountOptions,
  });
  return lines.map((line) => ({
    ...line,
    accountId: expenseAccountId,
    taxCodeId,
  }));
};

const updateBillOption = (state, action) => {
  const isUpdatingExpirationTermToDayOfMonth =
    action.key === 'expirationTerm' &&
    ['DayOfMonthAfterEOM', 'OnADayOfTheMonth'].includes(action.value);
  const isExpirationDays0 = state.bill.expirationDays === '0';
  const shouldSetExpirationDaysTo1 =
    isUpdatingExpirationTermToDayOfMonth && isExpirationDays0;
  const isPrefillFields = Object.keys(defaultPrefillStatus).includes(
    action.key
  );

  return {
    ...state,
    bill: {
      ...state.bill,
      expirationDays: shouldSetExpirationDaysTo1
        ? '1'
        : state.bill.expirationDays,
      lines:
        state.bill.lines.length > 0 && action.key === 'expenseAccountId'
          ? updateAllLinesWithExpenseAccount(
              state.bill.lines,
              state.accountOptions,
              action.value
            )
          : state.bill.lines,
      [action.key]: action.value,
    },
    isPageEdited: true,
    prefillStatus: isPrefillFields
      ? { ...state.prefillStatus, [action.key]: false }
      : state.prefillStatus,
  };
};

const updateLayout = (state, { value }) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    layout: value,
    lines: state.bill.lines
      .filter((line) => line.type === BillLineType.SERVICE)
      .map((line) => ({
        ...line,
        id: '',
      })),
  },
});

const closeModal = (state) => ({
  ...state,
  modalType: undefined,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeAlert = (state) => ({
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

const startLoading = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING,
});

const stopLoading = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
});

const failLoading = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_FAIL,
});

const addBillLine = (state) => ({
  ...state,
  isPageEdited: true,
  bill: {
    ...state.bill,
    lines: [...state.bill.lines, state.newLine],
  },
});

const calculateLineLayout = (lineLayout, updateKey) => {
  const isUpdateItemId = updateKey === 'itemId';

  if (lineLayout === BillLineType.ITEM) {
    return lineLayout;
  }

  return isUpdateItemId ? BillLineType.ITEM : BillLineType.SERVICE;
};

const getLineSubTypeId = (type) =>
  type === BillLineType.ITEM
    ? LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID
    : LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID;

const getLinePrefillStatus = (key, currentStateLinePrefillStatus) => {
  const isPrefillField = Object.keys(defaultLinePrefillStatus).includes(key);
  return isPrefillField
    ? {
        ...currentStateLinePrefillStatus,
        [key]: false,
      }
    : currentStateLinePrefillStatus;
};

const setIsLineEdited = (key) =>
  ['discount', 'amount', 'units', 'unitPrice'].includes(key);

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
          taxCodeId:
            action.key === 'accountId'
              ? getDefaultTaxCodeId({
                  accountId: action.value,
                  accountOptions: state.accountOptions,
                })
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

const loadSupplierDetail = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierAddress: action.response.supplierAddress,
    expenseAccountId: getIsCreatingFromInTray(state)
      ? action.response.expenseAccountId
      : state.bill.expenseAccountId,
    isReportable: action.response.isReportable,
    lines:
      state.bill.lines.length > 0 && getIsCreatingFromInTray(state)
        ? updateAllLinesWithExpenseAccount(
            state.bill.lines,
            state.accountOptions,
            action.response.expenseAccountId
          )
        : state.bill.lines,
  },
});

const startBlocking = (state) => ({
  ...state,
  isBlocking: true,
});

const stopBlocking = (state) => ({
  ...state,
  isBlocking: false,
});

const startModalBlocking = (state) => ({
  ...state,
  isModalBlocking: true,
});

const stopModalBlocking = (state) => ({
  ...state,
  isModalBlocking: false,
});

const getPrefilledLines = (state, lines, expenseAccountId) =>
  lines.map((line) => ({
    ...state.newLine,
    ...line,
    accountId: expenseAccountId || state.newLine.accountId,
    taxCodeId: expenseAccountId
      ? getDefaultTaxCodeId({
          accountId: expenseAccountId,
          accountOptions: state.accountOptions,
        })
      : state.newLine.taxCodeId,
    prefillStatus: {
      description: Boolean(line.description),
      amount: Boolean(line.amount),
      discount: Boolean(line.discount),
      units: Boolean(line.units),
      unitPrice: Boolean(line.unitPrice),
    },
  }));

const getPrefillIssueDate = (state, prefillIssueDate) => {
  if (prefillIssueDate) {
    return getIsBeforeConversionDate(prefillIssueDate, getConversionDate(state))
      ? state.bill.issueDate
      : prefillIssueDate;
  }

  return state.bill.issueDate;
};

const prefillBillFromInTray = (state, action) => {
  const { bill, lines, document } = action.response;

  const shouldPrefillLines = state.bill.lines.length === 0 && lines.length > 0;
  const isIssueDateBeforeConversionDate = getIsBeforeConversionDate(
    bill.issueDate,
    getConversionDate(state)
  );

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      supplierId: state.bill.supplierId || bill.supplierId,
      supplierInvoiceNumber:
        state.bill.supplierInvoiceNumber || bill.supplierInvoiceNumber,
      layout: shouldPrefillLines ? bill.layout : state.bill.layout,
      issueDate: getPrefillIssueDate(state, bill.issueDate),
      isTaxInclusive: shouldPrefillLines
        ? bill.isTaxInclusive
        : state.bill.isTaxInclusive,
      isReportable:
        !state.bill.supplierId && bill.isReportable !== undefined
          ? bill.isReportable
          : state.bill.isReportable,
      originalExpenseAccountId:
        bill.expenseAccountId || state.bill.originalExpenseAccountId,
      expenseAccountId: bill.expenseAccountId || state.bill.expenseAccountId,
      note: state.bill.note || bill.note,
      lines: shouldPrefillLines
        ? getPrefilledLines(state, lines, bill.expenseAccountId)
        : state.bill.lines,
    },
    prefillStatus: {
      supplierId: !state.bill.supplierId && Boolean(bill.supplierId),
      supplierInvoiceNumber:
        !state.bill.supplierInvoiceNumber &&
        Boolean(bill.supplierInvoiceNumber),
      issueDate: Boolean(bill.issueDate) && !isIssueDateBeforeConversionDate,
      note: !state.bill.note && Boolean(bill.note),
    },
    inTrayDocument: document,
    showPrefillInfo: true,
  };
};

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

export const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
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

export const unlinkInTrayDocument = (state) => ({
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

export const hidePrefillInfo = (state) => ({
  ...state,
  showPrefillInfo: false,
});

export const setAttachmentId = (state, { attachmentId }) => ({
  ...state,
  attachmentId,
});

const setUpgradeModalShowing = (
  state,
  { isUpgradeModalShowing, monthlyLimit }
) => ({
  ...state,
  subscription: {
    isUpgradeModalShowing,
    monthlyLimit: monthlyLimit || state.subscription.monthlyLimit,
  },
});

const setDuplicateId = (state, action) => ({
  ...state,
  duplicateId: action.duplicateId,
});

const setSource = (state, action) => ({
  ...state,
  source: action.source,
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const loadAbnFromSupplier = (state, action) => ({
  ...state,
  abn: action.abn,
});

const resetSupplier = (state) => {
  const defaultState = getDefaultState();

  return {
    ...state,
    bill: {
      ...state.bill,
      supplierAddress: defaultState.bill.supplierAddress,
      isReportable: defaultState.bill.isReportable,
    },
    abn: defaultState.abn,
  };
};

const updateIssueDate = (state, action) => ({
  ...state,
  bill: {
    ...state.bill,
    issueDate: action.date,
  },
});

const getPreConversionLineAmount = (state) => {
  const isCreatingFromInTray = getIsCreatingFromInTray(state);
  const hasInTrayDocumentId = getHasInTrayDocumentId(state);
  return (isCreatingFromInTray || hasInTrayDocumentId) &&
    state.bill.lines.length > 0
    ? state.bill.lines[0].amount
    : '';
};

const convertToPreConversionBill = (state) => {
  const preConversionLineAmount = getPreConversionLineAmount(state);
  return {
    ...state,
    isLineEdited: true,
    isPreConversion: true,
    bill: {
      ...state.bill,
      isTaxInclusive: true,
      layout: BillLayout.SERVICE,
      lines: [
        {
          description: 'Historical Purchase',
          accountId: state.linkedAccountId,
          amount: preConversionLineAmount,
          taxAmount: preConversionLineAmount
            ? state.bill.lines[0].taxAmount
            : '',
          taxExclusiveAmount: preConversionLineAmount
            ? state.bill.lines[0].taxExclusiveAmount
            : '',
          jobId: '',
          taxCodeId: getDefaultTaxCodeId({
            accountId: state.linkedAccountId,
            accountOptions: state.accountOptions,
          }),
          lineTypeId: LineTaxTypes.SERVICE,
          type: BillLineType.SERVICE,
        },
      ],
    },
  };
};

const setShowPreConversionAlert = (state, { showPreConversionAlert }) => ({
  ...state,
  showPreConversionAlert,
});

const setViewedAccountToolTipState = (state, { viewedAccountToolTip }) => ({
  ...state,
  viewedAccountToolTip,
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
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [REMOVE_BILL_LINE]: removeBillLine,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [LOAD_ITEM_DETAIL_FOR_LINE]: loadItemDetailForLine,
  [LOAD_SUPPLIER_DETAIL]: loadSupplierDetail,
  [RESET_SUPPLIER]: resetSupplier,
  [PREFILL_BILL_FROM_IN_TRAY]: prefillBillFromInTray,
  [UPDATE_BILL_ID]: updateBillId,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_NEW_BILL_PAYMENT]: loadNewBillPayment,
  [SET_SHOW_SPLIT_VIEW]: setShowSplitView,
  [SET_IN_TRAY_DOCUMENT_ID]: setInTrayDocumentId,
  [DOWNLOAD_IN_TRAY_DOCUMENT]: loadInTrayDocumentUrl,
  [UNLINK_IN_TRAY_DOCUMENT]: unlinkInTrayDocument,
  [SET_DOCUMENT_LOADING_STATE]: setDocumentLoadingState,
  [SET_PAYMENT_MODAL_LOADING_STATE]: setPaymentModalLoadingState,
  [HIDE_PREFILL_INFO]: hidePrefillInfo,
  [SET_ATTACHMENT_ID]: setAttachmentId,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [SET_SOURCE]: setSource,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [LOAD_ABN_FROM_SUPPLIER]: loadAbnFromSupplier,
  [UPDATE_ISSUE_DATE]: updateIssueDate,
  [UPDATE_HEADER_OPTION]: updateHeaderOption,
  [UPDATE_REFERENCE_ID]: updateReferenceId,
  [UPDATE_BILL_PAYMENT_AMOUNT_FIELDS]: updateBillPaymentAmountFields,
  [SET_PAYMENT_MODAL_ALERT]: setPaymentModalAlert,
  [SET_PAYMENT_MODAL_SUBMITTING_STATE]: setPaymentModalSubmittingState,
  [CONVERT_TO_PRE_CONVERSION_BILL]: convertToPreConversionBill,
  [SET_SHOW_PRE_CONVERSION_ALERT]: setShowPreConversionAlert,
  [SET_VIEWED_ACCOUNT_TOOL_TIP_STATE]: setViewedAccountToolTipState,
};

const billReducer = createReducer(getDefaultState(), handlers);

export default billReducer;
