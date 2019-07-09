export const getRegion = state => state.region;
export const getIsLoading = state => state.isLoading;
export const getAlertMessage = state => state.alertMessage;
export const getDate = state => state.supplierReturnPurchase.date;
export const getDebitAmount = state => state.supplierReturnPurchase.debitAmount;
export const getDescription = state => state.supplierReturnPurchase.description;
export const getIncludeClosedPurchases = state => state.supplierReturnPurchase
  .includeClosedPurchases;
export const getReferenceId = state => state.supplierReturnPurchase.referenceId;
export const getSupplierName = state => state.supplierReturnPurchase.supplierName;
export const getBusinessId = state => state.businessId;
export const getSupplierId = state => state.supplierReturnPurchase.supplierId;
export const getSupplierReturnId = state => state.supplierReturnId;
export const getPurchaseReturnId = state => state.purchaseReturnId;
export const getIsCreating = state => getSupplierReturnId(state) !== undefined;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsTableLoading = state => state.isTableLoading;
export const getModalType = state => state.modalType;
export const getIsPageEdited = state => state.isPageEdited;

const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

export const getTotalAmountApplied = (state) => {
  const totalApplied = state.supplierReturnPurchase.purchases.reduce(
    (acc, purchase) => {
      const amountApplied = purchase.amountApplied !== '-' ? Number(purchase.amountApplied) : 0;
      return acc + amountApplied;
    }, 0,
  );
  const absoluteAmount = formatAmount(Math.abs(totalApplied).toFixed(2));
  const formattedAmount = Number(totalApplied) < 0 ? `-$${absoluteAmount}` : `$${absoluteAmount}`;
  return getIsCreating(state) ? formattedAmount : `$${state.supplierReturnPurchase.debitAmount}`;
};

export const getPurchases = state => state.supplierReturnPurchase.purchases.map(
  (purchase) => {
    const discount = purchase.discount !== '-' ? Number(purchase.discount) : 0;
    const calculatedOwed = formatAmount((Number(purchase.amount) - discount).toFixed(2));
    const link = `/#/${state.region}/${state.businessId}/bill/${purchase.id}`;

    return {
      ...purchase,
      owed: getIsCreating(state) ? calculatedOwed : purchase.owed,
      amount: formatAmount(purchase.amount),
      link,
    };
  },
);

const hasAmountPaidApplied = amountApplied => amountApplied && amountApplied.length > 0 && amountApplied !== '0.00';

const getReferenceIdForRequest = ({ referenceId, originalReferenceId }) => (
  referenceId === originalReferenceId ? undefined : referenceId);

export const getSupplierReturnPurchasePayload = state => ({
  purchaseReturnId: state.supplierReturnId,
  description: state.supplierReturnPurchase.description,
  referenceId: getReferenceIdForRequest(state.supplierReturnPurchase),
  date: state.supplierReturnPurchase.date,
  purchases: state.supplierReturnPurchase.purchases
    .filter(purchase => hasAmountPaidApplied(purchase.amountApplied)).map(purchase => ({
      id: purchase.id,
      amountApplied: purchase.amountApplied,
      discount: purchase.discount,
    })),
});

export const getTableViewType = (state) => {
  if (state.isTableLoading) {
    return 'spinner';
  }
  if (state.supplierReturnPurchase.purchases.length === 0) {
    return 'emptyTable';
  }
  return '';
};
