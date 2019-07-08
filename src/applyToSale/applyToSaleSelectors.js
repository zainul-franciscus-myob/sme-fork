import { createSelector } from 'reselect';

import TableViewType from './TableViewType';
import formatAmount from './formatAmount';

const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getCustomerId = state => state.customerId;
export const getCustomerReturnId = state => state.customerReturnId;
export const getApplyToSaleId = state => state.applyToSaleId;
export const getCustomerName = state => state.customerName;
export const getAmount = state => state.amount;
export const getReference = state => state.reference;
export const getDescription = state => state.description;
export const getDate = state => state.date;
export const getIncludeClosedSales = state => state.includeClosedSales;

const getInvoiceLink = invoiceId => createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/invoice/${invoiceId}`,
);
const getLabelColour = status => ({
  Unpaid: 'light-grey',
  Paid: 'green',
}[status]);
export const getInvoices = state => state.invoices.map(invoice => ({
  ...invoice,
  link: getInvoiceLink(invoice.invoiceId)(state),
  labelColour: getLabelColour(invoice.status),
  totalAmount: formatAmount(invoice.totalAmount),
  displayDiscount: invoice.displayDiscount,
  balanceDue: formatAmount(invoice.totalAmount - invoice.discount),
  displayAmountApplied: invoice.displayAmountApplied,
}));

export const getTotalAmountApplied = state => formatCurrency(state.invoices.reduce(
  (accumulator, invoice) => accumulator + invoice.amountApplied, 0,
));

export const getCreateApplyToSalePayload = state => ({
  customerReturnId: getCustomerReturnId(state),
  description: getDescription(state),
  date: getDate(state),
  reference: state.reference === state.originalReferenceId ? '' : state.reference,
  invoices: state.invoices
    .filter(invoice => invoice.amountApplied > 0)
    .map(invoice => ({
      invoiceId: invoice.invoiceId,
      amountApplied: invoice.amountApplied,
      discount: invoice.discount,
    })),
});

export const getIsCreating = state => state.applyToSaleId === '';
export const getIsSubmitting = state => state.isSubmitting;
export const getIsLoading = state => state.isLoading;
export const getIsTableLoading = state => state.isTableLoading;
export const getIsPageEdited = state => state.isPageEdited;
export const getTableViewType = createSelector(
  getInvoices,
  getIsTableLoading,
  (invoices, isTableLoading) => {
    if (isTableLoading) {
      return TableViewType.SPINNER;
    }
    if (invoices.length === 0) {
      return TableViewType.EMPTY;
    }
    return TableViewType.TABLE;
  },
);
export const getModalType = state => state.modalType;
export const getAlertMessage = state => state.alertMessage;
