import { createSelector } from 'reselect';

import InvoicePaymentModalTypes from '../InvoicePaymentModalTypes';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';

export const getIsCreating = state => state.invoicePaymentId === 'new';
const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

export const getOptions = state => ({
  accounts: state.accounts,
  accountId: state.accountId,
  customers: state.customers,
  customerId: state.customerId,
  referenceId: state.referenceId,
  description: state.description,
  date: state.date,
});
export const getLoadingState = state => state.loadingState;

export const getTotalReceived = state => (
  `${formatCurrency(state.entries
    .reduce((total, entry) => total + (Number(entry.paidAmount) || 0), 0))}`
);

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getInvoicePaymentId = state => state.invoicePaymentId;
export const getIsActionsDisabled = state => state.isSubmitting;
export const getAlertMessage = state => state.alertMessage;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);
export const getIsPageEdited = state => state.isPageEdited;

const getInvoiceLink = (entry, businessId, region) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/invoice/${id}`;
};

const getStatusColor = entry => (
  {
    Open: 'light-grey', Closed: 'green',
  }[entry.status]
);

export const getEntries = createSelector(
  state => state.entries,
  getBusinessId,
  getRegion,
  getIsCreating,
  (entries, businessId, region, isCreating) => entries.map(entry => ({
    ...entry,
    balanceDue: formatAmount(entry.balanceDue),
    discountedBalance: isCreating
      ? formatAmount((Number(entry.balanceDue) - Number(entry.discountAmount))) : '0',
    link: getInvoiceLink(entry, businessId, region),
    statusColor: getStatusColor(entry),
  })),
);

export const getIsReferenceIdDirty = ({ referenceId, originalReferenceId }) => (
  referenceId !== originalReferenceId
);

const getCustomers = state => state.customers;
export const getCustomerId = state => state.customerId;
const getCustomerName = createSelector(
  getCustomers,
  getCustomerId,
  (customers, customerId) => {
    const selectedCustomer = customers.find(({ id }) => customerId === id) || {};

    return selectedCustomer.displayName;
  },
);

const getCreateContent = state => ({
  date: state.date,
  referenceId: getIsReferenceIdDirty(state) ? state.referenceId : undefined,
  description: state.description,
  accountId: state.accountId,
  customerId: state.customerId,
  customerName: getCustomerName(state),
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

export const getShowPaidInvoices = state => state.showPaidInvoices;

export const getIsTableLoading = state => state.isTableLoading;
export const getIsTableEmpty = state => state.entries.length === 0;

export const getWasRedirectedFromInvoiceDetail = state => state.applyPaymentToInvoiceId !== '';
export const getIsCustomerEmpty = state => !state.customerId;

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: InvoicePaymentModalTypes.NONE };

  return modal.type;
};

export const getUrlParams = createSelector(
  getBusinessId,
  getInvoicePaymentId,
  getIsCreating,
  (businessId, invoicePaymentId, isCreating) => (
    isCreating ? { businessId } : { businessId, invoicePaymentId }
  ),
);
