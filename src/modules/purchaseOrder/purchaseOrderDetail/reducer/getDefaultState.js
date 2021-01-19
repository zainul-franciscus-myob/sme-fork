import LoadingState from '../../../../components/PageView/LoadingState';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const DEFAULT_UNITS = '1';
export const DEFAULT_DISCOUNT = '0';

export const defaultPrefillStatus = {
  supplierId: false,
  supplierInvoiceNumber: false,
  issueDate: false,
};

export const defaultLinePrefillStatus = {
  description: false,
  amount: false,
  discount: false,
  units: false,
  unitPrice: false,
};

export const getDefaultState = () => ({
  today: new Date(),
  businessId: '',
  purchaseOrderId: '',
  duplicateId: '',
  openExportPdf: undefined,
  region: '',
  purchaseOrder: {
    layout: '',
    supplierId: '',
    shippingAddress: '',
    supplierInvoiceNumber: '',
    isTaxInclusive: true,
    isReportable: false,
    purchaseOrderNumber: '',
    issueDate: formatIsoDate(new Date()),
    promisedDate: '',
    lines: [],
    amountPaid: '',
    note: '',
  },
  subscription: {
    monthlyLimit: {
      hasHitLimit: false,
    },
    isUpgradeModalShowing: false,
  },
  accountOptions: [],
  taxCodeOptions: [],
  newLine: {
    id: '',
    type: '',
    description: '',
    amount: '',
    jobId: '',
    taxCodeId: '',
    accountId: '',
    units: '',
    discount: '',
    unitPrice: '',
    itemId: '',
    lineJobOptions: [],
  },
  originalAmountDue: '0',
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isLineEdited: false,
  modalType: undefined,
  isModalBlocking: false,
  alert: undefined,
  isAbnLoading: false,
  isDocumentLoading: false,
  prefillStatus: defaultPrefillStatus,
  template: {
    templateOptions: [],
    defaultTemplate: '',
  },
  emailPurchaseOrder: {
    hasEmailReplyDetails: false,
    isEmailMeACopy: false,
    ccToEmail: [''],
    fromEmail: '',
    fromName: '',
    messageBody: '',
    subject: '',
    toEmail: [''],
    attachments: [],
    templateName: '',
    emailDefaultSettings: {},
  },
  exportPdf: {
    template: '',
  },
  abn: undefined,
  showSplitView: false,
  conversionDate: '',
  linkedAccountId: '',
  startOfFinancialYearDate: '',
  isPreConversion: false,
  showPreConversionAlert: false,
  viewedAccountToolTip: false,
});
