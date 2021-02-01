import { createSelector } from 'reselect';

import ContactType from '../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../contact/contactCombobox/types/DisplayMode';
import TaxTypes, {
  hasChildrenTaxCodes,
  hasLinkedContact,
  hasLuxuryCarTaxThreshold,
  hasTaxCollectedAccount,
  hasTaxPaidAccount,
  hasTaxRate,
} from './TaxTypes';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;

export const getPageTitle = (state) => state.pageTitle;
export const getTaxCodeId = (state) => state.taxCodeId;
export const getLoadingState = (state) => state.loadingState;
export const getTaxType = (state) => TaxTypes[state.type];
export const getAccountOptions = (state) => state.accountOptions;
export const getChildrenTaxCodes = (state) => state.childrenTaxCodes;
export const getIncludeInGSTReturn = (state) => state.includeInGSTReturn;
export const getIsReadOnly = () => true; // Defaulted to true until Create and Update functionality is added
export const getIsActionsDisabled = (state) => state.isSubmitting;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getAlert = (state) => state.alert;
export const getModal = (state) => state.modal;
export const getModalUrl = (state) => state.modal?.url;

export const getTaxCodeDetails = (state) => ({
  code: state.code,
  description: state.description,
  type: getTaxType(state),
  rate: state.rate,
  taxCollectedAccountId: state.taxCollectedAccountId,
  taxPaidAccountId: state.taxPaidAccountId,
  linkedContactId: state.linkedContactId,
  childrenTaxCodes: state.childrenTaxCodes,
  luxuryCarTax: state.luxuryCarTax,
});

export const getTaxTypeDetails = createSelector(getTaxType, (type) => ({
  type,
  isTaxRateShown: hasTaxRate(type),
  isTaxCollectedAccountShown: hasTaxCollectedAccount(type),
  isTaxPaidAccountShown: hasTaxPaidAccount(type),
  isLinkedContactShown: hasLinkedContact(type),
  isChildrenTaxCodesShown: hasChildrenTaxCodes(type),
  isLuxuryCarTaxThresholdShown: hasLuxuryCarTaxThreshold(type),
}));

export const getSaveTaxDetailContent = (state) => ({
  code: state.code,
  description: state.description,
  rate: state.rate,
  taxCollectedAccountId: state.taxCollectedAccountId,
  taxPaidAccountId: state.taxPaidAccountId,
});

export const getIsGstReturnShown = createSelector(
  getRegion,
  (region) => region === 'nz'
);

export const getTaxCodeLabel = createSelector(getRegion, (region) =>
  region === 'nz' ? 'GST code' : 'Tax code'
);

export const getTaxTypeLabel = createSelector(getRegion, (region) =>
  region === 'nz' ? 'GST type' : 'Tax type'
);

export const getTaxCollectedAccountLabel = (state) =>
  state.isWithholding
    ? 'Account for withholding credits'
    : 'Linked account for tax collected';

export const getTaxPaidAccountLabel = (state) => {
  if (state.isDutyTax) {
    return 'Linked account for accrued duty';
  }

  if (state.isWithholding) {
    return 'Account for withholdings payable';
  }

  return 'Linked account for tax paid';
};

export const getLinkedContactLabel = (state) => {
  if (state.isDutyTax) {
    return 'Linked contact for import agent';
  }
  return 'Linked contact for tax authority';
};

export const getTaxTypeOptions = () => {
  const taxTypes = Object.values(TaxTypes);

  return taxTypes.map((type) => ({
    type,
  }));
};

export const getContactComboboxContext = createSelector(
  getBusinessId,
  getRegion,
  getTaxCodeDetails,
  (businessId, region, { contactId }) => ({
    businessId,
    region,
    contactId,
    contactType: ContactType.ALL,
    displayMode: DisplayMode.NAME_AND_TYPE,
  })
);

export const getTaxCodeListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/tax`
);
