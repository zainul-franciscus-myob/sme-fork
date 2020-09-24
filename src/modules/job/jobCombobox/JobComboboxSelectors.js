import { createSelector } from 'reselect';

import getLoadMoreButtonStatus from '../../../components/AutoComplete/helpers/getLoadMoreButtonStatus';

const getBusinessId = (state) => state.businessId;
const getRegion = (state) => state.region;
export const getJobId = (state) => state.jobId;
export const getIsJobLoading = (state) => state.isLoading;
const getIsJobOptionsLoading = (state) => state.isOptionsLoading;
export const getJobOptions = (state) => state.jobOptions;
const getHasMoreJobOptions = (state) => state.pagination.hasNextPage;
const getJobOptionsOffset = (state) => state.pagination.offset;

export const getLoadJobOptionsStatus = createSelector(
  getIsJobOptionsLoading,
  getHasMoreJobOptions,
  (isOptionsLoading, hasMore) =>
    getLoadMoreButtonStatus(isOptionsLoading, hasMore)
);

export const getLoadJobOptionsParams = createSelector(
  getJobOptionsOffset,
  (offset) => ({ offset })
);

export const getLoadJobOptionsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getSearchJobParams = (keywords) => ({
  offset: 0,
  keywords,
});

export const getJobModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadJobOptionByIdContent = (jobId) => {
  return [jobId];
};
