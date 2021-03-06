import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './SupplierReturnListSelectors';

export const getUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getParams = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);

  return { ...filterOptions, sortOrder, orderBy };
};

export const getSettings = (state) => {
  const filterOptions = getFilterOptions(state);
  const sortOrder = getSortOrder(state);
  const orderBy = getOrderBy(state);

  return { filterOptions, sortOrder, orderBy };
};
