import LoadingState from '../../../../components/PageView/LoadingState';
import QuoteHistoryAccordionStatus from '../types/QuoteHistoryAccordionStatus';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const DEFAULT_UNITS = '1';
export const DEFAULT_DISCOUNT = '0';

const getDefaultState = () => ({
  layout: '',
  openExportPdf: undefined,
  businessId: '',
  region: '',
  quoteId: '',
  duplicateId: '',
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
  isJobLoading: false,
  pageTitle: '',
  quote: {
    id: '',
    layout: '',
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
    taxExclusiveFreightAmount: '0',
    freightTaxAmount: '0',
    freightTaxCodeId: '0',
    isInvoiced: false,
    lines: [],
    status: 'Open',
    emailStatus: 'None',
  },
  newLine: {
    type: '',
    description: '',
    descriptionDirty: false,
    amount: '',
    taxCodeId: '',
    jobId: '',
    accountId: '',
    units: '',
    unitOfMeasure: '',
    itemId: '',
    unitPrice: '',
    discount: '',
    lineJobOptions: [],
  },
  contactOptions: [],
  expirationTermOptions: [],
  commentOptions: [],
  itemOptions: [],
  accountOptions: [],
  taxCodeOptions: [],
  template: {
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
  quoteHistoryAccordionStatus: QuoteHistoryAccordionStatus.OPEN,
  activityHistory: [],
});

export default getDefaultState;
