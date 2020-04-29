import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceHistoryAccordionStatus from '../types/InvoiceHistoryAccordionStatus';
import InvoiceStatus from '../types/InvoiceStatus';
import LoadingState from '../../../../components/PageView/LoadingState';
import SaveActionType from '../types/SaveActionType';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const DEFAULT_UNITS = '1';
export const DEFAULT_DISCOUNT = '0';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  invoiceId: '',
  quoteId: undefined,
  duplicateId: undefined,
  loadingState: LoadingState.LOADING,
  alert: undefined,
  modalType: InvoiceDetailModalType.NONE,
  modalAlert: undefined,
  isModalSubmitting: false,
  isPageEdited: false,
  isSubmitting: false,
  isContactLoading: false,
  saveActionType: SaveActionType.SAVE,
  invoice: {
    id: '',
    layout: '',
    contactId: '',
    address: '',
    note: '',
    invoiceNumber: '',
    purchaseOrderNumber: '',
    issueDate: formatIsoDate(new Date()),
    isAllowOnlinePayments: false,
    isTaxInclusive: true,
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    amountPaid: '0',
    status: InvoiceStatus.NONE,
    lines: [],
  },
  newLine: {
    units: '',
    itemId: '',
    description: '',
    unitPrice: '',
    unitOfMeasure: '',
    jobId: '',
    taxCodeId: '',
    accountId: '',
    discount: '',
    amount: '',
  },
  totals: {
    subTotal: '0',
    totalTax: '0',
    totalAmount: '0',
    originalAmountDue: '0',
  },
  itemTemplate: {
    defaultTemplate: '',
    templateOptions: [],
  },
  serviceTemplate: {
    defaultTemplate: '',
    templateOptions: [],
  },
  comments: [],
  serialNumber: '',
  contactOptions: [],
  accountOptions: [],
  jobOptions: [],
  taxCodeOptions: [],
  itemOptions: [],
  expirationTermOptions: [],
  emailInvoice: {
    hasEmailReplyDetails: false,
    isEmailMeACopy: false,
    businessName: '',
    ccToEmail: [''],
    fromEmail: '',
    fromName: '',
    messageBody: '',
    subject: '',
    toEmail: [''],
    toName: '',
    attachments: [],
    templateName: '',
    emailDefaultSettings: {},
  },
  exportPdf: {
    template: '',
  },
  subscription: {
    isTrial: false,
    monthlyLimit: {
      hasHitLimit: false,
    },
    isUpgradeModalShowing: false,
  },
  payDirect: {
    isLoading: true,
    isServiceAvailable: false,
    isRegistered: false,
    baseUrl: '',
  },
  isLineAmountDirty: false,
  invoiceHistory: [],
  invoiceHistoryAccordionStatus: InvoiceHistoryAccordionStatus.LOADING,
  redirectRefJournalId: '',
  redirectRefJournalType: '',
  isInvoiceJobColumnEnabled: false,
});

export default getDefaultState;
