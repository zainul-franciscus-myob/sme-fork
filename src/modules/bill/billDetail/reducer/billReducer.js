import Decimal from 'decimal.js';

import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_JOB_AFTER_CREATE,
  LOAD_SUPPLIER_AFTER_CREATE,
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
  SET_REDIRECT_URL,
  SET_SHOW_SPLIT_VIEW,
  SET_SOURCE,
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
import {
  calculateAmountDue,
  calculateTotals,
  getBillId,
  getBusinessId,
  getIsCreating,
  getRegion,
  getUpdatedSupplierOptions,
} from '../selectors/billSelectors';
import { calculateLineAmounts, getTaxCalculations } from './calculationReducer';
import {
  defaultLinePrefillStatus,
  defaultPrefillStatus,
  getDefaultState,
} from './getDefaultState';
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

const buildJobOptions = ({ action, jobId }) => {
  const { jobOptions = [] } = action.response;
  return jobOptions.filter(({ isActive, id }) => isActive || id === jobId);
};

const loadBill = (state, action) => {
  const defaultState = getDefaultState();

  const isCreating = state.billId === 'new';

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
        const lineJobOptions = buildJobOptions({ action, jobId: line.jobId });

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

          return { ...line, amount, lineJobOptions };
        }

        return { ...line, lineJobOptions };
      }),
    },
    originalAmountDue: setOriginalAmountDue(action.response.bill),
    newLine: {
      ...state.newLine,
      ...action.response.newLine,
      lineJobOptions: buildJobOptions({ action }),
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
    isBillJobColumnEnabled: state.isBillJobColumnEnabled,
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
    expenseAccountId: getIsCreating(state)
      ? action.response.expenseAccountId
      : state.bill.expenseAccountId,
    lines:
      state.bill.lines.length > 0 && getIsCreating(state)
        ? updateAllLinesWithExpenseAccount(
            state.bill.lines,
            state.accountOptions,
            action.response.expenseAccountId
          )
        : state.bill.lines,
  },
});

const loadSupplierAfterCreate = (
  state,
  { supplierId, supplierAddress, option, expenseAccountId }
) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierId,
    supplierAddress,
    expenseAccountId: getIsCreating(state)
      ? expenseAccountId
      : state.bill.expenseAccountId,
    lines:
      state.bill.lines.length > 0 && getIsCreating(state)
        ? updateAllLinesWithExpenseAccount(
            state.bill.lines,
            state.accountOptions,
            expenseAccountId
          )
        : state.bill.lines,
  },
  supplierOptions: getUpdatedSupplierOptions(state, option),
  prefillStatus: {
    ...state.prefillStatus,
    supplierId: false,
  },
});

const startSupplierBlocking = (state) => ({
  ...state,
  isSupplierBlocking: true,
});

const stopSupplierBlocking = (state) => ({
  ...state,
  isSupplierBlocking: false,
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

const prefillBillFromInTray = (state, action) => {
  const { bill, lines, document, supplierOptions } = action.response;

  const shouldPrefillLines = state.bill.lines.length === 0 && lines.length > 0;

  return {
    ...state,
    isPageEdited: true,
    bill: {
      ...state.bill,
      supplierId: state.bill.supplierId || bill.supplierId,
      supplierInvoiceNumber:
        state.bill.supplierInvoiceNumber || bill.supplierInvoiceNumber,
      layout: shouldPrefillLines ? bill.layout : state.bill.layout,
      issueDate: bill.issueDate ? bill.issueDate : state.bill.issueDate,
      isTaxInclusive: shouldPrefillLines
        ? bill.isTaxInclusive
        : state.bill.isTaxInclusive,
      originalExpenseAccountId:
        bill.expenseAccountId || state.bill.originalExpenseAccountId,
      expenseAccountId: bill.expenseAccountId || state.bill.expenseAccountId,
      note: state.bill.note || bill.note,
      lines: shouldPrefillLines
        ? getPrefilledLines(state, lines, bill.expenseAccountId)
        : state.bill.lines,
    },
    supplierOptions:
      supplierOptions.length &&
      !supplierOptions.some((so) =>
        state.supplierOptions.some(({ id }) => id === so.id)
      )
        ? [...supplierOptions, ...state.supplierOptions]
        : state.supplierOptions,
    prefillStatus: {
      supplierId: !state.bill.supplierId && Boolean(bill.supplierId),
      supplierInvoiceNumber:
        !state.bill.supplierInvoiceNumber &&
        Boolean(bill.supplierInvoiceNumber),
      issueDate: Boolean(bill.issueDate),
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

const loadItemOption = (state, action) => ({
  ...state,
  itemOptions: [action.response, ...state.itemOptions],
});

export const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  accountOptions: [account, ...state.accountOptions],
  isPageEdited: true,
});

export const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  bill: {
    ...state.bill,
    lines: state.bill.lines.map((line) => ({
      ...line,
      lineJobOptions: [job, ...line.lineJobOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    lineJobOptions: [job, ...state.newLine.lineJobOptions],
  },
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

const resetSupplier = (state) => ({
  ...state,
  bill: {
    ...state.bill,
    supplierAddress: '',
  },
  abn: undefined,
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
  [LOAD_ITEM_OPTION]: loadItemOption,
  [LOAD_ITEM_DETAIL_FOR_LINE]: loadItemDetailForLine,
  [LOAD_SUPPLIER_DETAIL]: loadSupplierDetail,
  [LOAD_SUPPLIER_AFTER_CREATE]: loadSupplierAfterCreate,
  [START_SUPPLIER_BLOCKING]: startSupplierBlocking,
  [STOP_SUPPLIER_BLOCKING]: stopSupplierBlocking,
  [RESET_SUPPLIER]: resetSupplier,
  [PREFILL_BILL_FROM_IN_TRAY]: prefillBillFromInTray,
  [UPDATE_BILL_ID]: updateBillId,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_SHOW_SPLIT_VIEW]: setShowSplitView,
  [SET_IN_TRAY_DOCUMENT_ID]: setInTrayDocumentId,
  [DOWNLOAD_IN_TRAY_DOCUMENT]: loadInTrayDocumentUrl,
  [UNLINK_IN_TRAY_DOCUMENT]: unlinkInTrayDocument,
  [SET_DOCUMENT_LOADING_STATE]: setDocumentLoadingState,
  [HIDE_PREFILL_INFO]: hidePrefillInfo,
  [SET_ATTACHMENT_ID]: setAttachmentId,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [SET_SOURCE]: setSource,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [LOAD_ABN_FROM_SUPPLIER]: loadAbnFromSupplier,
};

const billReducer = createReducer(getDefaultState(), handlers);

export default billReducer;
