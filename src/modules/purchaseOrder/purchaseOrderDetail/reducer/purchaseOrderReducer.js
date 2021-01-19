import Decimal from 'decimal.js';

import {
  ADD_EMAIL_ATTACHMENTS,
  ADD_PURCHASE_ORDER_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DELETE_PURCHASE_ORDER_FAILED,
  DELETING_PURCHASE_ORDER,
  EXPORT_PURCHASE_ORDER_PDF_FAILED,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  LOADING_AFTER_CREATE,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_DETAIL_FOR_LINE_FAILED,
  LOAD_JOB_AFTER_CREATE,
  LOAD_PURCHASE_ORDER,
  LOAD_SUPPLIER_DETAIL,
  LOAD_SUPPLIER_DETAIL_FAILED,
  OPEN_ALERT,
  OPEN_MODAL,
  RELOAD_PURCHASE_ORDER,
  RELOAD_PURCHASE_ORDER_FAILED,
  REMOVE_EMAIL_ATTACHMENT,
  REMOVE_PURCHASE_ORDER_LINE,
  RESET_EMAIL_PURCHASE_ORDER_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  RESET_SUPPLIER,
  SAVE_PURCHASE_ORDER_FAILED,
  SET_ABN_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_MODAL_ALERT,
  SET_REDIRECT_URL,
  SET_SOURCE,
  SET_SUBMITTING_STATE,
  SET_UPGRADE_MODAL_SHOWING,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_PURCHASE_ORDER_DETAIL,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_ISSUE_DATE,
  UPDATE_LAYOUT,
  UPDATE_PURCHASE_ORDER_ID,
  UPDATE_PURCHASE_ORDER_LINE,
  UPDATE_PURCHASE_ORDER_OPTION,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../PurchaseOrderIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  addAttachments,
  removeEmailAttachment,
  resetEmailPurchaseOrderDetail,
  resetOpenSendEmailParam,
  updateEmailAttachmentUploadProgress,
  updateEmailPurchaseOrderDetail,
  uploadEmailAttachment,
  uploadEmailAttachmentFailed,
} from './EmailReducer';
import { calculateLineAmounts, getTaxCalculations } from './calculationReducer';
import {
  defaultLinePrefillStatus,
  defaultPrefillStatus,
  getDefaultState,
} from './getDefaultState';
import {
  getBusinessId,
  getPurchaseOrderId,
  getRegion,
} from '../selectors/purchaseOrderSelectors';
import { getEmailDetailFromPurchaseOrderDetail } from '../selectors/EmailSelectors';
import LineTaxTypes from '../types/LineTaxTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import PurchaseOrderLineType from '../types/PurchaseOrderLineType';
import createReducer from '../../../../store/createReducer';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

const buildJobOptions = ({ action, jobId }) => {
  const { jobOptions = [] } = action.response;
  return jobOptions.filter(({ isActive, id }) => isActive || id === jobId);
};

const loadPurchaseOrder = (state, action) => {
  const defaultState = getDefaultState();

  const isCreating = state.purchaseOrderId === 'new';

  return {
    ...state,
    ...action.response,
    purchaseOrder: {
      ...state.purchaseOrder,
      ...action.response.purchaseOrder,
      shippingAddress: action.response.purchaseOrder.shippingAddress,
      issueDate: isCreating
        ? formatIsoDate(state.today)
        : action.response.purchaseOrder.issueDate,
      lines: action.response.purchaseOrder.lines.map((line) => {
        const lineJobOptions = buildJobOptions({ action, jobId: line.jobId });

        if (
          [
            PurchaseOrderLineType.SERVICE,
            PurchaseOrderLineType.ITEM,
            PurchaseOrderLineType.SUB_TOTAL,
          ].includes(line.type)
        ) {
          const amount = action.response.purchaseOrder.isTaxInclusive
            ? new Decimal(line.taxExclusiveAmount).add(line.taxAmount).valueOf()
            : new Decimal(line.taxExclusiveAmount).valueOf();

          return { ...line, amount, lineJobOptions };
        }

        return { ...line, lineJobOptions };
      }),
    },
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
    emailPurchaseOrder: {
      ...state.emailPurchaseOrder,
      ...getEmailDetailFromPurchaseOrderDetail({
        emailPurchaseOrder: action.response.emailPurchaseOrder,
        purchaseOrderNumber: action.response.purchaseOrder.purchaseOrderNumber,
      }),
    },
    emailPurchaseOrderDefaultState: {
      ...state.emailPurchaseOrderDefaultState,
      ...getEmailDetailFromPurchaseOrderDetail({
        emailPurchaseOrder: action.response.emailPurchaseOrder,
        purchaseOrderNumber: action.response.purchaseOrder.purchaseOrderNumber,
      }),
    },
    exportPdf: {
      ...state.exportPdf,
      ...action.response.exportPdf,
    },
    openExportPdf: defaultState.openExportPdf,
  };
};

const reloadPurchaseOrder = (state, action) => {
  const defaultState = getDefaultState();

  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const purchaseOrderId = getPurchaseOrderId(state);

  const context = { businessId, region, purchaseOrderId };

  const initialState = {
    ...defaultState,
    ...context,
    loadingState: LoadingState.LOADING_SUCCESS,
  };

  return loadPurchaseOrder(initialState, action);
};

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setModalAlert = (state, action) => ({
  ...state,
  modalAlert: action.modalAlert,
});

const resetState = () => getDefaultState();

const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updatePurchaseOrderOption = (state, action) => {
  const isPrefillFields = Object.keys(defaultPrefillStatus).includes(
    action.key
  );

  return {
    ...state,
    purchaseOrder: {
      ...state.purchaseOrder,

      lines: state.purchaseOrder.lines,
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
  purchaseOrder: {
    ...state.purchaseOrder,
    layout: value,
    lines: state.purchaseOrder.lines
      .filter((line) => line.type === PurchaseOrderLineType.SERVICE)
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
  redirectUrl: action.redirectUrl,
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

const addPurchaseOrderLine = (state) => ({
  ...state,
  isPageEdited: true,
  purchaseOrder: {
    ...state.purchaseOrder,
    lines: [...state.purchaseOrder.lines, state.newLine],
  },
});

const calculateLineLayout = (lineLayout, updateKey) => {
  const isUpdateItemId = updateKey === 'itemId';

  if (lineLayout === PurchaseOrderLineType.ITEM) {
    return lineLayout;
  }

  return isUpdateItemId
    ? PurchaseOrderLineType.ITEM
    : PurchaseOrderLineType.SERVICE;
};

const getLineSubTypeId = (type) =>
  type === PurchaseOrderLineType.ITEM
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

const updatePurchaseOrderLine = (state, action) => ({
  ...state,
  isLineEdited: Boolean(setIsLineEdited(action.key)),
  isPageEdited: true,
  purchaseOrder: {
    ...state.purchaseOrder,
    lines: state.purchaseOrder.lines.map((line, index) => {
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

const removePurchaseOrderLine = (state, action) => {
  const lines = state.purchaseOrder.lines.filter(
    (_, index) => index !== action.index
  );
  return {
    ...state,
    isPageEdited: true,
    purchaseOrder: {
      ...state.purchaseOrder,
      lines,
    },
  };
};

const loadSupplierDetail = (state, action) => ({
  ...state,
  purchaseOrder: {
    ...state.purchaseOrder,
    isReportable: action.response.isReportable,
    lines: state.purchaseOrder.lines,
  },
  isBlocking: false,
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

const updatePurchaseOrderId = (state, action) => ({
  ...state,
  purchaseOrderId: action.id,
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
  purchaseOrder: {
    ...state.purchaseOrder,
    lines: state.purchaseOrder.lines.map((line, index) => {
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
  isBlocking: false,
});

export const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  purchaseOrder: {
    ...state.purchaseOrder,
    lines: state.purchaseOrder.lines.map((line) => ({
      ...line,
      lineJobOptions: [job, ...line.lineJobOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    lineJobOptions: [job, ...state.newLine.lineJobOptions],
  },
  isPageEdited: true,
  isBlocking: false,
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
    purchaseOrder: {
      ...state.purchaseOrder,
      isReportable: defaultState.purchaseOrder.isReportable,
    },
    abn: defaultState.abn,
  };
};

const updateIssueDate = (state, action) => ({
  ...state,
  purchaseOrder: {
    ...state.purchaseOrder,
    issueDate: action.date,
  },
});

const setViewedAccountToolTipState = (state, { viewedAccountToolTip }) => ({
  ...state,
  viewedAccountToolTip,
});

const actionFailed = (state, action) => ({
  ...state,
  isBlocking: false,
  alert: {
    message: action.message,
    type: 'danger',
  },
});

const exportPurchaseOrderPdfFailed = (state, action) => ({
  ...state,
  isModalBlocking: false,
  alert: {
    message: action.message,
    type: 'danger',
  },
});

const loadingAfterCreate = (state, action) => ({
  ...state,
  isBlocking: true,
  alert: {
    message: action.message,
    type: 'success',
  },
});

const deletingPurchaseOrder = (state) => ({
  ...state,
  modalType: undefined,
  isBlocking: true,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_PURCHASE_ORDER]: loadPurchaseOrder,
  [RELOAD_PURCHASE_ORDER]: reloadPurchaseOrder,
  [RELOAD_PURCHASE_ORDER_FAILED]: actionFailed,
  [UPDATE_PURCHASE_ORDER_OPTION]: updatePurchaseOrderOption,
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
  [ADD_PURCHASE_ORDER_LINE]: addPurchaseOrderLine,
  [UPDATE_PURCHASE_ORDER_LINE]: updatePurchaseOrderLine,
  [CALCULATE_LINE_AMOUNTS]: calculateLineAmounts,
  [REMOVE_PURCHASE_ORDER_LINE]: removePurchaseOrderLine,
  [GET_TAX_CALCULATIONS]: getTaxCalculations,
  [LOAD_ITEM_DETAIL_FOR_LINE]: loadItemDetailForLine,
  [LOAD_ITEM_DETAIL_FOR_LINE_FAILED]: actionFailed,
  [LOAD_SUPPLIER_DETAIL]: loadSupplierDetail,
  [LOAD_SUPPLIER_DETAIL_FAILED]: loadSupplierDetail,
  [RESET_SUPPLIER]: resetSupplier,
  [UPDATE_PURCHASE_ORDER_ID]: updatePurchaseOrderId,
  [SET_UPGRADE_MODAL_SHOWING]: setUpgradeModalShowing,
  [UPDATE_EXPORT_PDF_DETAIL]: updateExportPdfDetail,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_DUPLICATE_ID]: setDuplicateId,
  [SET_SOURCE]: setSource,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [LOAD_ABN_FROM_SUPPLIER]: loadAbnFromSupplier,
  [UPDATE_ISSUE_DATE]: updateIssueDate,
  [SET_VIEWED_ACCOUNT_TOOL_TIP_STATE]: setViewedAccountToolTipState,
  [DELETE_PURCHASE_ORDER_FAILED]: actionFailed,
  [DELETING_PURCHASE_ORDER]: deletingPurchaseOrder,
  [SAVE_PURCHASE_ORDER_FAILED]: actionFailed,
  [EXPORT_PURCHASE_ORDER_PDF_FAILED]: exportPurchaseOrderPdfFailed,
  [LOADING_AFTER_CREATE]: loadingAfterCreate,
  [ADD_EMAIL_ATTACHMENTS]: addAttachments,
  [REMOVE_EMAIL_ATTACHMENT]: removeEmailAttachment,
  [RESET_EMAIL_PURCHASE_ORDER_DETAIL]: resetEmailPurchaseOrderDetail,
  [RESET_OPEN_SEND_EMAIL]: resetOpenSendEmailParam,
  [SET_MODAL_ALERT]: setModalAlert,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS]: updateEmailAttachmentUploadProgress,
  [UPDATE_EMAIL_PURCHASE_ORDER_DETAIL]: updateEmailPurchaseOrderDetail,
  [UPLOAD_EMAIL_ATTACHMENT]: uploadEmailAttachment,
  [UPLOAD_EMAIL_ATTACHMENT_FAILED]: uploadEmailAttachmentFailed,
};

const purchaseOrderReducer = createReducer(getDefaultState(), handlers);

export default purchaseOrderReducer;
