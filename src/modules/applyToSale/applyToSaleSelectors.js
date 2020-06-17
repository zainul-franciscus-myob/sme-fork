import { createSelector } from 'reselect';
import { isBefore } from 'date-fns';

import formatAmount from './formatAmount';

const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getCustomerReturnId = state => state.customerReturnId;
export const getApplyToSaleId = state => state.applyToSaleId;
export const getCustomerName = state => state.customerName;
export const getAmount = state => state.amount;
export const getReference = state => state.reference;
export const getDescription = state => state.description;
export const getDate = state => state.date;
export const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;

const getInvoiceLink = invoiceId => createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/invoice/${invoiceId}`,
);
const getLabelColour = status => ({
  Open: 'light-grey',
  Closed: 'green',
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
export const getIsPageEdited = state => state.isPageEdited;
export const getIsTableEmpty = createSelector(
  getInvoices,
  invoices => invoices.length === 0,
);
export const getModalType = state => state.modalType;
export const getAlertMessage = state => state.alertMessage;

export const getTitle = createSelector(
  getIsCreating,
  getReference,
  (isCreating, reference) => (
    isCreating
      ? 'Apply customer credit to sale'
      : `Customer credit applied to sale ${reference}`
  ),
);

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) => date && startOfFinancialYearDate
  && isBefore(new Date(date), new Date(startOfFinancialYearDate)),
);
