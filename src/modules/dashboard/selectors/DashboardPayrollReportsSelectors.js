import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';

export const getHasError = state => state.payrollReports.hasError;
export const getIsLoading = state => state.payrollReports.isLoading;

const FAVOURITE_REPORTS_LIMIT = 6;
const getMyReportsUrl = state => state.config.myReportsUrl;
const getAll = state => state.payrollReports.all;
const getPayrollFavourites = createSelector(
  getAll,
  state => state.payrollReports.favourites,
  (all, favourites) => {
    const favouritePayrollReports = favourites
      .reduce((acc, name) => {
        const foundItem = all.find(allItem => name === allItem.name);

        if (!foundItem) {
          return acc;
        }

        return [...acc, foundItem];
      }, []);

    return favouritePayrollReports.slice(0, FAVOURITE_REPORTS_LIMIT);
  },
);

export const getViewAllUrl = createSelector(
  getBusinessId,
  getRegion,
  getMyReportsUrl,
  (businessId, region, myReportsUrl) => `${myReportsUrl}/#/${region}/${businessId}/reports/standardReports`,
);

export const getFavouriteReports = createSelector(
  getBusinessId,
  getRegion,
  getMyReportsUrl,
  getPayrollFavourites,
  (businessId, region, myReportsUrl, favourites) => favourites.map(({ displayName, path }) => ({
    displayName,
    url: `${myReportsUrl}/#/${region}/${businessId}/${path}`,
  })),
);

export const getIsFavouritesShowing = createSelector(
  getFavouriteReports,
  (reports) => reports.length !== 0,
);

export const getPopularReports = createSelector(
  getBusinessId,
  getRegion,
  getMyReportsUrl,
  getPayrollFavourites,
  getAll,
  (businessId, region, myReportsUrl, favourites, all) => {
    const remainingReports = all
      .reduce((acc, allItem) => {
        const alreadyFavourite = favourites
          .find(favouriteItem => favouriteItem.name === allItem.name);
        if (alreadyFavourite) return acc;
        return [...acc, allItem];
      }, []);

    const popularReportsLimit = FAVOURITE_REPORTS_LIMIT - favourites.length;
    return remainingReports
      .map(({ displayName, path }) => ({
        displayName,
        url: `${myReportsUrl}/#/${region}/${businessId}/${path}`,
      }))
      .slice(0, popularReportsLimit);
  },
);

export const getIsPopularShowing = createSelector(
  getPopularReports,
  (reports) => reports.length !== 0,
);
