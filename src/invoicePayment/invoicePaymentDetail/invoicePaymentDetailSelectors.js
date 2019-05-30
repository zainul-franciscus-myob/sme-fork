import {
  DEFAULT_TABLE,
  EMPTY_CUSTOMER_TABLE,
  EMPTY_TABLE,
  LOADING_TABLE,
} from '../InvoicePaymentTableViewTypes';
import { formatCurrency } from '../../banking/bankingSelectors';

export const getIsCreating = state => state.invoicePaymentId === 'new';
const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

export const getEntries = state => state.entries.map(entry => ({
  ...entry,
  invoiceAmount: formatAmount(entry.invoiceAmount),
  balanceDue: getIsCreating(state)
    ? formatAmount((Number(entry.invoiceAmount) - Number(entry.discountAmount))) : '0',
}));
export const getOptions = state => ({
  accounts: state.accounts,
  accountId: state.accountId,
  customers: state.customers,
  customerId: state.customerId,
  referenceId: state.referenceId,
  description: state.description,
  date: state.date,
  showPaidInvoices: state.showPaidInvoices,
});
export const getIsLoading = state => state.isLoading;

export const getTotalReceived = state => (
  `${formatCurrency(state.entries
    .reduce((total, entry) => total + (Number(entry.paidAmount) || 0), 0))}`
);

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getInvoicePaymentId = state => state.invoicePaymentId;
export const getIsActionsDisabled = state => state.isSubmitting;
export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsPageEdited = state => state.isPageEdited;

export const getIsReferenceIdDirty = ({ referenceId, originalReferenceId }) => (
  referenceId !== originalReferenceId
);

const getCreateContent = state => ({
  date: state.date,
  referenceId: getIsReferenceIdDirty(state) ? state.referenceId : undefined,
  description: state.description,
  accountId: state.accountId,
  customerId: state.customerId,
  entries: state.entries
    .filter(({ paidAmount }) => paidAmount && paidAmount.length > 0 && paidAmount !== '0.00')
    .map(entry => ({
      paidAmount: entry.paidAmount,
      invoiceId: entry.id,
      discountAmount: entry.discountAmount,
    })),
});
const getUpdateContent = state => ({
  date: state.date,
  referenceId: state.referenceId,
  description: state.description,
  accountId: state.accountId,
});

export const getSaveContent = state => (getIsCreating(state)
  ? getCreateContent(state)
  : getUpdateContent(state));

export const getCustomerId = state => state.customerId;
export const getShowPaidInvoices = state => state.showPaidInvoices;
export const getTableViewType = (state) => {
  if (state.isTableLoading) {
    return LOADING_TABLE;
  } if (!state.customerId) {
    return EMPTY_CUSTOMER_TABLE;
  } if (state.entries.length === 0) {
    return EMPTY_TABLE;
  }
  return DEFAULT_TABLE;
};
