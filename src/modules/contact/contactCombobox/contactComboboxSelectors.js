import { createSelector } from 'reselect';

import ContactType from './types/ContactType';
import getLoadMoreButtonStatus from '../../../components/AutoComplete/helpers/getLoadMoreButtonStatus';

const getBusinessId = (state) => state.businessId;
const getRegion = (state) => state.region;
export const getDisplayMode = (state) => state.displayMode;
export const getContactType = (state) => state.contactType;
export const getIsContactLoading = (state) => state.isLoading;
const getIsContactOptionsLoading = (state) => state.isOptionsLoading;
export const getContactOptions = (state) => state.contactOptions;
const getHasMoreContactOptions = (state) => state.pagination.hasNextPage;
const getContactOptionsOffset = (state) => state.pagination.offset;

export const getLoadContactOptionsStatus = createSelector(
  getIsContactOptionsLoading,
  getHasMoreContactOptions,
  (isOptionsLoading, hasMore) =>
    getLoadMoreButtonStatus(isOptionsLoading, hasMore)
);

export const getAddNewItemLabel = createSelector(
  getContactType,
  (contactType) => {
    switch (contactType) {
      case ContactType.EMPLOYEE:
        return 'Create employee';
      case ContactType.CUSTOMER:
        return 'Create customer';
      case ContactType.SUPPLIER:
        return 'Create supplier';
      default:
        return 'Create contact';
    }
  }
);

export const getLoadContactOptionsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getLoadContactOptionsParams = (state) => {
  const contactType = getContactType(state);
  const offset = getContactOptionsOffset(state);

  return { contactType, offset };
};

export const getSearchContactParams = (state, keywords) => {
  const contactType = getContactType(state);

  return { contactType, offset: 0, keywords };
};

export const getContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const contactType = getContactType(state);

  const modalContactType = {
    Customer: ContactType.CUSTOMER,
    Supplier: ContactType.SUPPLIER,
  }[contactType];

  return { businessId, region, contactType: modalContactType };
};

export const getShouldLoadContactOptionById = (state, contactId) => {
  const contactOptions = getContactOptions(state);

  return contactId && !contactOptions.some(({ id }) => id === contactId);
};

export const getLoadContactOptionByIdUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};
