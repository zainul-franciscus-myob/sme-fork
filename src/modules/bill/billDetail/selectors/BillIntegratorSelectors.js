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
  getBillLayout,
  getBillUid,
  getBusinessId,
  getDuplicateId,
  getExpenseAccountId,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsTaxInclusive,
  getLines,
  getSupplierId,
  getSupplierOptions,
} from './billSelectors';
import { getAttachmentId, getInTrayDocumentId } from './BillInTrayDocumentSelectors';

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
  getDuplicateId,
  (isCreating, duplicateId) => {
    if (isCreating) {
      if (duplicateId) {
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
  getDuplicateId,
  (isCreating, businessId, billId, duplicateId) => {
    if (isCreating) {
      if (duplicateId) {
        return {
          businessId,
          duplicateId,
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

export const getLoadSupplierDetailUrlParams = createSelector(
  getBusinessId,
  getSupplierId,
  (businessId, supplierId) => ({ businessId, supplierId }),
);

export const getDeleteBillUrlParams = createSelector(
  getBusinessId,
  getBillId,
  (businessId, billId) => ({ businessId, billId }),
);

export const getCalculateBillLinesUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getLoadItemOptionUrlParams = (state, { itemId }) => ({
  businessId: getBusinessId(state),
  itemId,
});

export const getCalculateBillContent = createSelector(
  getLines,
  getIsTaxInclusive,
  getAmountPaid,
  (lines, isTaxInclusive, amountPaid) => ({
    lines,
    isTaxInclusive,
    amountPaid,
  }),
);

export const getCalculateBillItemChangeContent = (state, { index, itemId }) => ({
  ...getCalculateBillContent(state),
  index,
  itemId,
});

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getSaveBillContent = createSelector(
  state => state.bill,
  getSupplierOptions,
  getBillLayout,
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

export const getUnlinkInTrayDocumentParams = createSelector(
  getBillUid,
  uid => ({ uid }),
);

export const getLinkInTrayContentWithoutIds = createSelector(
  getInTrayDocumentId,
  getSupplierId,
  getExpenseAccountId,
  getIsCreatingFromInTray,
  (inTrayDocumentId, supplierId, expenseAccountId, isCreatingFromInTray) => ({
    inTrayDocumentId,
    supplierId,
    expenseAccountId: isCreatingFromInTray ? expenseAccountId : undefined,
  }),
);
