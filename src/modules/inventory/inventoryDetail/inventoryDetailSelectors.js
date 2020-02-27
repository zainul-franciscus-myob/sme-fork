import { createSelector, createStructuredSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getSellingAccounts = state => state.sellingAccounts;
const getBuyingAccounts = state => state.buyingAccounts;
const getTaxCodes = state => state.taxCodes;
const getTaxInclusiveLabel = state => getRegionToDialectText(state.region)('Tax inclusive');
const getTaxExclusiveLabel = state => getRegionToDialectText(state.region)('Tax exclusive');
const getTaxLabel = state => getRegionToDialectText(state.region)('Tax code');
const getItemSellingDetails = state => (state.item.sellingDetails || {});
const getItemBuyingDetails = state => (state.item.buyingDetails || {});
const getItemId = state => state.itemId;

export const getIsCreating = createSelector(
  getItemId,
  itemId => itemId === 'new',
);

export const getItemDetails = createStructuredSelector({
  referenceId: state => state.item.referenceId,
  name: state => state.item.name,
  description: state => state.item.description,
  useItemDescription: state => state.item.useItemDescription,
  isInactive: state => state.item.isInactive,
});

export const getSellingDetails = createSelector(
  getItemSellingDetails,
  getSellingAccounts,
  getTaxCodes,
  getTaxLabel,
  getTaxExclusiveLabel,
  getTaxInclusiveLabel,
  (sellingDetails, sellingAccounts, taxCodes, taxLabel, taxExclusiveLabel, taxInclusiveLabel) => ({
    ...sellingDetails,
    sellingAccounts,
    taxCodes,
    taxLabel,
    taxExclusiveLabel,
    taxInclusiveLabel,
  }),
);

export const getBuyingDetails = createSelector(
  getItemBuyingDetails,
  getBuyingAccounts,
  getTaxCodes,
  getTaxLabel,
  (buyingDetails, buyingAccounts, taxCodes, taxLabel) => ({
    ...buyingDetails,
    buyingAccounts,
    taxCodes,
    taxLabel,
  }),
);

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getOriginalName = state => state.item.originalName;
export const getItem = (state) => {
  const item = { ...state.item };
  if (!state.isEnableForSelling) item.sellingDetails = {};
  if (!state.isEnableForBuying) item.buyingDetails = {};
  return item;
};
export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const isPageEdited = state => state.isPageEdited;
export const getIsActionsDisabled = state => state.isSubmitting;
export const getIsInactive = state => state.item.isInactive;
export const getLoadingState = state => state.loadingState;
export const getIsEnableForSelling = state => state.isEnableForSelling;
export const getIsEnableForBuying = state => state.isEnableForBuying;

export const getUrlParams = createSelector(
  getBusinessId,
  getItemId,
  getIsCreating,
  (businessId, itemId, isCreating) => (
    isCreating ? { businessId } : { businessId, itemId }
  ),
);
