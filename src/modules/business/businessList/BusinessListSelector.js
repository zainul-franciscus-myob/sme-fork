import { createSelector } from 'reselect';

export const getLoadingState = state => state.loadingState;

export const getKeyword = state => state.keyword;

const getBusinessList = state => state.businesses;

const getIsDescending = state => state.sortOrder === 'desc';

export const getOrderBy = () => 'businessName';

export const getOrder = createSelector(getIsDescending, getOrderBy, (descending, orderBy) => ({
  column: orderBy,
  descending,
}));

const filterBusinessesByName = keyword => ({ businessName }) => (
  businessName.toLowerCase().includes(keyword.toLowerCase())
);

export const getBusinesses = createSelector(
  getKeyword,
  state => state.businesses,
  getIsDescending,
  (keyword, businesses, isDescending) => businesses
    .filter(filterBusinessesByName(keyword))
    .sort(
      (
        { businessName: a },
        { businessName: b },
      ) => (isDescending
        ? b.localeCompare(a)
        : a.localeCompare(b)),
    ),
);

export const getIsEmpty = createSelector(
  getBusinesses,
  businesses => businesses.length === 0,
);

export const getBusinessUrl = (state) => {
  const businessList = getBusinessList(state);
  const business = businessList[0];
  const { id, region, uri } = business;

  return uri || `/#/${region}/${id}/dashboard`;
};

export const getShouldRedirect = (state) => {
  const businessList = getBusinessList(state);
  return businessList.length === 1;
};
