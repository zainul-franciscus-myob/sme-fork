import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;

export const getLoadItemUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getSaveItemUrlParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getSaveItemContent = (state) => {
  const buyingDetails = state.isBuying
    ? state.item.buyingDetails
    : undefined;

  const sellingDetails = state.isSelling
    ? state.item.sellingDetails
    : undefined;

  return {
    ...state.item,
    buyingDetails,
    sellingDetails,
  };
};
