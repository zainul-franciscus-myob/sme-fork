import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getIsOpen = (state) => state.isOpen;

export const getName = (state) => state.item.name;

export const getDescription = (state) => state.item.description;

export const getUseDescription = (state) => state.item.useDescription;

export const getAlertType = (state) => state.alert.type;

export const getAlertMessage = (state) => state.alert.message;

export const getIsAlertShown = (state) => Boolean(state.alert);

export const getRegion = (state) => state.region;

export const getTaxInclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax inclusive');

export const getTaxExclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax exclusive');

export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');

export const getItemId = (state) => state.item.displayId;

export const getIsLoading = (state) => state.isLoading;

export const getIsSelling = (state) => state.isSelling;

export const getIsBuying = (state) => state.isBuying;

export const getSellingPrice = (state) => state.item.sellingDetails.price;

export const getSellingIsTaxInclusive = (state) =>
  state.item.sellingDetails.isTaxInclusive;

export const getSellingUnitOfMeasure = (state) =>
  state.item.sellingDetails.unitOfMeasure;

export const getSellingAccountId = (state) =>
  state.item.sellingDetails.accountId;

export const getSellingTaxCodeId = (state) =>
  state.item.sellingDetails.taxCodeId;

export const getBuyingPrice = (state) => state.item.buyingDetails.price;

export const getBuyingUnitOfMeasure = (state) =>
  state.item.buyingDetails.unitOfMeasure;

export const getBuyingAccountId = (state) => state.item.buyingDetails.accountId;

export const getBuyingTaxCodeId = (state) => state.item.buyingDetails.taxCodeId;

export const getTaxCodeOptions = (state) => state.taxCodeOptions;

export const getSellingAccountOptions = (state) => state.sellingAccountOptions;

export const getBuyingAccountOptions = (state) => state.buyingAccountOptions;
