import { createSelector } from 'reselect';

import {
  CREATE_BILL,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_DUPLICATE_BILL,
  UPDATE_BILL,
} from '../BillIntents';
import {
  getAmountPaid,
  getBillId,
  getBusinessId,
  getDuplicatedBillId,
  getIsCreating,
  getIsTaxInclusive,
  getLayout,
  getLines,
  getSupplierId,
  getSupplierOptions,
} from './billSelectors';
import {
  getAttachmentId,
  getInTrayDocumentId,
} from './BillInTrayDocumentSelectors';

export const getSaveBillIntent = createSelector(
  getIsCreating,
  isCreating => (isCreating ? CREATE_BILL : UPDATE_BILL),
);

export const getSaveBillUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getBillId,
  (isCreating, businessId, billId) => (isCreating ? { businessId } : { businessId, billId }),
);

export const getLoadBillIntent = createSelector(
  getIsCreating,
  getDuplicatedBillId,
  (isCreating, duplicatedBillId) => {
    if (isCreating) {
      if (duplicatedBillId) {
        return LOAD_NEW_DUPLICATE_BILL;
      }

      return LOAD_NEW_BILL;
    }

    return LOAD_BILL;
  },
);

export const getLoadBillUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getBillId,
  getDuplicatedBillId,
  (isCreating, businessId, billId, duplicatedBillId) => {
    if (isCreating) {
      if (duplicatedBillId) {
        return {
          businessId,
          duplicatedBillId,
        };
      }

      return {
        businessId,
      };
    }

    return {
      businessId,
      billId,
    };
  },
);

export const getLoadSupplierAddressUrlParams = createSelector(
  getBusinessId,
  getSupplierId,
  (businessId, supplierId) => ({ businessId, supplierId }),
);

export const getDeleteBillUrlParams = createSelector(
  getBusinessId,
  getBillId,
  (businessId, billId) => ({ businessId, billId }),
);

export const getServiceCalculateUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getItemCalculateUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getLoadItemOptionUrlParams = (state, { itemId }) => ({
  businessId: getBusinessId(state),
  itemId,
});

export const getItemCalculateContent = createSelector(
  getLines,
  getIsTaxInclusive,
  getAmountPaid,
  (lines, isTaxInclusive, amountPaid) => ({
    lines,
    isTaxInclusive,
    amountPaid,
  }),
);

export const getItemCalculateContentForUpdateLineItem = (state, { index, itemId }) => ({
  ...getItemCalculateContent(state),
  index,
  itemId,
});

export const getItemCalculateContentForUpdateLineAmount = (state, { index, key }) => ({
  ...getItemCalculateContent(state),
  index,
  key,
});

export const getServiceCalculateContent = createSelector(
  getLines,
  getIsTaxInclusive,
  getAmountPaid,
  (lines, isTaxInclusive, amountPaid) => ({ lines, isTaxInclusive, amountPaid }),
);

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getSaveBillContent = createSelector(
  state => state.bill,
  getSupplierOptions,
  getLayout,
  (bill, supplierOptions, layout) => {
    const selectedSupplier = supplierOptions.find(supplier => supplier.id === bill.supplierId);
    const supplierName = selectedSupplier ? selectedSupplier.displayName : '';

    return {
      ...bill,
      supplierName,
      layout,
    };
  },
);

export const getLoadSupplierUrlParams = (state, supplierId) => {
  const businessId = getBusinessId(state);

  return { businessId, supplierId };
};

export const getInTrayDocumentUrlParams = createSelector(
  getBusinessId,
  getInTrayDocumentId,
  getAttachmentId,
  (businessId, inTrayDocumentId, attachmentId) => ({
    businessId,
    inTrayDocumentId: inTrayDocumentId || attachmentId,
  }),
);

export const getInTrayDocumentParams = createSelector(
  getInTrayDocumentId,
  inTrayDocumentId => ({
    isAttachment: !inTrayDocumentId,
  }),
);

export const getUnlinkInTrayDocumentUrlParams = createSelector(
  getBusinessId,
  getAttachmentId,
  (businessId, attachmentId) => ({
    businessId,
    inTrayDocumentId: attachmentId,
  }),
);