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
  layout: '',
  bill: {
    uid: '',
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
    taxCodeId: '',
    accountId: '',
    units: '',
    discount: '',
    unitPrice: '',
    itemId: '',
  },
  totals: {
    subTotal: '0',
    totalTax: '0',
    totalAmount: '0',
    amountDue: '0',
    originalAmountDue: '0',
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
