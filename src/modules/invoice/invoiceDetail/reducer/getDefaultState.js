import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceHistoryAccordionStatus from '../InvoiceHistoryAccordionStatus';
import LoadingState from '../../../../components/PageView/LoadingState';
import SaveActionType from '../SaveActionType';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const DEFAULT_UNITS = '1';
export const DEFAULT_DISCOUNT = '0';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  invoiceId: '',
  quoteId: undefined,
  duplicatedInvoiceId: undefined,
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
    amountPaid: '0.00',
    lines: [],
  },
  newLine: {
    units: '',
    itemId: '',
    description: '',
    unitPrice: '',
    unitOfMeasure: '',
    taxCodeId: '',
    accountId: '',
    discount: '',
    displayDiscount: '',
    amount: '',
    displayAmount: '',
    displayUnitPrice: '',
  },
  totals: {
    subTotal: '0.00',
    totalTax: '0.00',
    totalAmount: '0.00',
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
});

export default getDefaultState;
