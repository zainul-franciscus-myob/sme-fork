import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  layout: '',
  openExportPdf: false,
  businessId: '',
  region: '',
  quoteId: '',
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modalType: '',
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
    description: '',
    amount: '',
    taxCodeId: '',

    allocatedAccountId: '',
    accountOptions: [],
    taxCodeOptions: [],

    units: '',
    itemId: '',
    unitPrice: '',
    discount: '',
    displayDiscount: '',
    displayAmount: '',
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
  taxCodeOptions: [],
  templateOptions: [],
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
});

export default getDefaultState;
