import LoadingState from '../../../../components/PageView/LoadingState';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const DEFAULT_UNITS = '1';
export const DEFAULT_DISCOUNT = '0';

const getDefaultState = () => ({
  layout: '',
  openExportPdf: undefined,
  businessId: '',
  region: '',
  quoteId: '',
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modal: undefined,
  isModalSubmitting: false,
  modalAlert: undefined,
  isLineAmountInputDirty: false,
  isCalculating: false,
  isAccountLoading: false,
  isContactLoading: false,
  pageTitle: '',
  quote: {
    id: '',
    contactId: '',
    contactName: '',
    expirationTerm: '',
    expirationDays: '',
    chargeForLatePayment: 0,
    discountForEarlyPayment: 0,
    numberOfDaysForDiscount: 0,
    isTaxInclusive: true,
    quoteNumber: '',
    address: '',
    issueDate: formatIsoDate(new Date()),
    purchaseOrderNumber: '',
    note: '',
    lines: [],
  },
  newLine: {
    type: '',
    description: '',
    descriptionDirty: false,
    amount: '',
    taxCodeId: '',
    jobId: '',
    allocatedAccountId: '',
    units: '',
    unitOfMeasure: '',
    itemId: '',
    unitPrice: '',
    discount: '',
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.00',
    totalAmount: '$0.00',
  },
  contactOptions: [],
  expirationTermOptions: [],
  commentOptions: [],
  itemOptions: [],
  accountOptions: [],
  jobOptions: [],
  taxCodeOptions: [],
  itemTemplateOptions: {
    templateOptions: [],
    defaultTemplate: '',
  },
  serviceTemplateOptions: {
    templateOptions: [],
    defaultTemplate: '',
  },
  emailQuote: {
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
  },
  exportPdf: {
    template: '',
  },
  cachedItemSellingDetails: {},
  isInvoiceJobColumnEnabled: false,
});

export default getDefaultState;
