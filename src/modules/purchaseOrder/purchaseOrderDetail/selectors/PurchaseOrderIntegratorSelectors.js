import { createSelector } from 'reselect';

import {
  CREATE_PURCHASE_ORDER,
  LOAD_NEW_DUPLICATE_PURCHASE_ORDER,
  LOAD_NEW_PURCHASE_ORDER,
  LOAD_PURCHASE_ORDER,
  UPDATE_PURCHASE_ORDER,
} from '../PurchaseOrderIntents';
import {
  getBusinessId,
  getDuplicateId,
  getIsCreating,
  getIsTaxInclusive,
  getLines,
  getPurchaseOrderId,
  getPurchaseOrderLayout,
  getSupplierId,
} from './purchaseOrderSelectors';

export const getSavePurchaseOrderIntent = createSelector(
  getIsCreating,
  (isCreating) => (isCreating ? CREATE_PURCHASE_ORDER : UPDATE_PURCHASE_ORDER)
);

export const getSavePurchaseOrderUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getPurchaseOrderId,
  (isCreating, businessId, purchaseOrderId) =>
    isCreating ? { businessId } : { businessId, purchaseOrderId }
);

export const getLoadPurchaseOrderIntent = createSelector(
  getIsCreating,
  getDuplicateId,
  (isCreating, duplicateId) => {
    if (isCreating) {
      if (duplicateId) {
        return LOAD_NEW_DUPLICATE_PURCHASE_ORDER;
      }

      return LOAD_NEW_PURCHASE_ORDER;
    }

    return LOAD_PURCHASE_ORDER;
  }
);

export const getLoadPurchaseOrderUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getPurchaseOrderId,
  getDuplicateId,
  (isCreating, businessId, purchaseOrderId, duplicateId) => {
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
      purchaseOrderId,
    };
  }
);

export const getLoadSupplierDetailUrlParams = createSelector(
  getBusinessId,
  getSupplierId,
  (businessId, supplierId) => ({ businessId, supplierId })
);

export const getDeletePurchaseOrderUrlParams = createSelector(
  getBusinessId,
  getPurchaseOrderId,
  (businessId, purchaseOrderId) => ({ businessId, purchaseOrderId })
);

export const getCalculatePurchaseOrderLinesUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);

export const getCalculatePurchaseOrderContent = createSelector(
  getLines,
  getIsTaxInclusive,
  (lines, isTaxInclusive) => ({
    lines,
    isTaxInclusive,
  })
);

export const getCalculatePurchaseOrderItemChangeContent = (
  state,
  { index, itemId }
) => ({
  ...getCalculatePurchaseOrderContent(state),
  index,
  itemId,
});

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getLoadAddedJobUrlParams = (state, jobId) => {
  const businessId = getBusinessId(state);
  return { businessId, jobId };
};

export const getSavePurchaseOrderContent = createSelector(
  (state) => state.purchaseOrder,
  getPurchaseOrderLayout,
  (purchaseOrder, layout) => {
    return {
      ...purchaseOrder,
      layout,
    };
  }
);

export const getSendEmailUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const purchaseOrderId = getPurchaseOrderId(state);

  return { businessId, purchaseOrderId };
};

export const getSendEmailPayload = (state) => {
  const {
    hasEmailReplyDetails,
    includePurchaseOrderNumberInEmail,
    attachments,
    ...restOfEmailPurchaseOrder
  } = state.emailPurchaseOrder;

  return {
    ...restOfEmailPurchaseOrder,
    attachments: attachments
      .filter((attachment) => attachment.state === 'finished')
      .map(({ file, keyName, uploadPassword }) => ({
        filename: file.name,
        mimeType: file.type,
        keyName,
        uploadPassword,
      })),
  };
};

export const getLoadAbnFromSupplierUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const supplierId = getSupplierId(state);

  return { businessId, supplierId };
};
