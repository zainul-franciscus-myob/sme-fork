import BillStatus from '../types/BillStatus';
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
  billId: '',
  duplicateId: '',
  openExportPdf: undefined,
  region: '',
  orderId: undefined,
  bill: {
    uid: '',
    layout: '',
    supplierId: '',
    supplierAddress: '',
    supplierInvoiceNumber: '',
    expirationTerm: '',
    expirationDays: '',
    isTaxInclusive: true,
    isReportable: false,
    originalExpenseAccountId: '',
    expenseAccountId: '',
    billNumber: '',
    issueDate: formatIsoDate(new Date()),
    lines: [],
    status: BillStatus.NONE,
    amountPaid: '',
    taxExclusiveFreightAmount: '0',
    freightTaxAmount: '0',
    freightTaxCodeId: '0',
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
  expirationTermOptions: [],
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
  template: {
    templateOptions: [],
    defaultTemplate: '',
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
  recordBillPayment: {
    alert: undefined,
    billPaymentId: 'new',
    supplierName: '',
    isPaymentAmountEdited: false,
    isModalEdited: false,
    isModalLoading: false,
    isSubmitting: false,
    accounts: [],
    accountId: '',
    bankStatementText: '',
    defaultAccountId: '',
    electronicClearingAccountId: '',
    discountAmount: '',
    paidAmount: '',
    paymentDate: formatIsoDate(new Date()),
    referenceId: '',
    originalReferenceId: '',
    shouldSendRemittanceAdvice: false,
  },
  viewedAccountToolTip: false,
  isRecurringTransactionEnabled: false,
  isCustomizedForNonGstEnabled: false,
  isRegisteredForGst: false,
});
