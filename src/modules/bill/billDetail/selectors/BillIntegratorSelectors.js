import { createSelector } from 'reselect';

import {
  CREATE_BILL,
  CREATE_PRE_CONVERSION_BILL_DETAIL,
  LOAD_BILL,
  LOAD_NEW_BILL,
  LOAD_NEW_BILL_DETAIL_FROM_ORDER,
  LOAD_NEW_DUPLICATE_BILL,
  UPDATE_BILL,
  UPDATE_PRE_CONVERSION_BILL_DETAIL,
} from '../BillIntents';
import {
  getAmountPaid,
  getBill,
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
  getOrderIdQueryParam,
  getSupplierId,
} from './billSelectors';
import {
  getAttachmentId,
  getInTrayDocumentId,
} from './BillInTrayDocumentSelectors';

export const getSaveBillIntent = createSelector(getIsCreating, (isCreating) =>
  isCreating ? CREATE_BILL : UPDATE_BILL
);

export const getSavePreConversionBillIntent = createSelector(
  getIsCreating,
  (isCreating) =>
    isCreating
      ? CREATE_PRE_CONVERSION_BILL_DETAIL
      : UPDATE_PRE_CONVERSION_BILL_DETAIL
);

export const getSaveBillUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getBillId,
  (isCreating, businessId, billId) =>
    isCreating ? { businessId } : { businessId, billId }
);

export const getSavePreConversionBillUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getBillId,
  (isCreating, businessId, billId) =>
    isCreating ? { businessId } : { businessId, billId }
);

export const getSavePreConversionBillContent = (state) => {
  const {
    supplierId,
    expirationTerm,
    expirationDays,
    isTaxInclusive,
    billNumber,
    supplierAddress,
    issueDate,
    supplierInvoiceNumber,
    note,
    lines,
  } = getBill(state);

  return {
    supplierId,
    expirationTerm,
    expirationDays,
    isTaxInclusive,
    billNumber,
    supplierAddress,
    issueDate,
    supplierInvoiceNumber,
    note,
    lines,
  };
};

export const getDeletePreConversionBillUrlParams = createSelector(
  getBusinessId,
  getBillId,
  (businessId, billId) => ({ businessId, billId })
);

export const getLoadBillIntent = createSelector(
  getIsCreating,
  getDuplicateId,
  getOrderIdQueryParam,
  (isCreating, duplicateId, orderID) => {
    if (isCreating) {
      if (orderID) {
        return LOAD_NEW_BILL_DETAIL_FROM_ORDER;
      }

      if (duplicateId) {
        return LOAD_NEW_DUPLICATE_BILL;
      }

      return LOAD_NEW_BILL;
    }

    return LOAD_BILL;
  }
);

export const getLoadBillUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getBillId,
  getDuplicateId,
  getOrderIdQueryParam,
  (isCreating, businessId, billId, duplicateId, orderId) => {
    if (isCreating) {
      if (duplicateId) {
        return {
          businessId,
          duplicateId,
        };
      }

      return {
        businessId,
        orderId,
      };
    }

    return {
      businessId,
      billId,
    };
  }
);

export const getLoadSupplierDetailUrlParams = createSelector(
  getBusinessId,
  getSupplierId,
  (businessId, supplierId) => ({ businessId, supplierId })
);

export const getDeleteBillUrlParams = createSelector(
  getBusinessId,
  getBillId,
  (businessId, billId) => ({ businessId, billId })
);

export const getCalculateBillLinesUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);

export const getCalculateBillContent = createSelector(
  getLines,
  getIsTaxInclusive,
  getAmountPaid,
  (lines, isTaxInclusive, amountPaid) => ({
    lines,
    isTaxInclusive,
    amountPaid,
  })
);

export const getCalculateBillItemChangeContent = (
  state,
  { index, itemId }
) => ({
  ...getCalculateBillContent(state),
  index,
  itemId,
});

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getSaveBillContent = createSelector(
  (state) => state.bill,
  getBillLayout,
  (bill, layout) => {
    return {
      ...bill,
      layout,
    };
  }
);

export const getLoadSupplierUrlParams = (state, supplierId) => {
  const businessId = getBusinessId(state);

  return { businessId, supplierId };
};

export const getLoadAbnFromSupplierUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const supplierId = getSupplierId(state);

  return { businessId, supplierId };
};

export const getInTrayDocumentUrlParams = createSelector(
  getBusinessId,
  getInTrayDocumentId,
  getAttachmentId,
  (businessId, inTrayDocumentId, attachmentId) => ({
    businessId,
    inTrayDocumentId: inTrayDocumentId || attachmentId,
  })
);

export const getInTrayDocumentParams = createSelector(
  getInTrayDocumentId,
  (inTrayDocumentId) => ({
    isAttachment: !inTrayDocumentId,
  })
);

export const getUnlinkInTrayDocumentUrlParams = createSelector(
  getBusinessId,
  getAttachmentId,
  (businessId, attachmentId) => ({
    businessId,
    inTrayDocumentId: attachmentId,
  })
);

export const getUnlinkInTrayDocumentParams = createSelector(
  getBillUid,
  (uid) => ({ uid })
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
  })
);

export const getLoadPrefillFromRecurringBillUrlParams = (
  state,
  recurringTransactionId
) => {
  const businessId = getBusinessId(state);

  return { businessId, recurringTransactionId };
};
