export const getIsLineAmountKey = key => ['units', 'unitPrice', 'amount', 'discount'].includes(key);
export const getIsLineItemIdKey = key => key === 'itemId';
export const getIsLineTaxCodeIdKey = key => key === 'taxCodeId';
export const getIsLineAccountIdKey = key => key === 'accountId';
export const getIsTaxInclusiveKey = key => key === 'isTaxInclusive';
export const getIsSupplierIdKey = key => key === 'supplierId';
export const getIsAmountPaidKey = key => key === 'amountPaid';
