import { createSelector } from 'reselect';

import Region from './Region';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getIsLoading = state => state.isLoading;
export const shouldLoadHelpContent = state => !!state.businessId;
export const isUserHelpSettingsLoaded = state => !!state.userHelpSettings;
export const isHelpContentLoaded = state => !!state.document;

export const getHelpTitle = state => (
  state.document ? state.document.fields.title : undefined
);

export const getRichTextContent = state => (
  state.document ? state.document.fields.richTextHelpConcept : undefined
);

export const getHelpOnThisPageLinks = state => (
  state.document ? state.document.fields.helpOnThisPageLinks : undefined
);

export const getQuickAnswers = state => (state.answers ? state.answers : []);

export const getIsHelpFailedOrEmpty = state => state.document === undefined;

export const getLoadHelpUserSettingsUrlParams = state => ({
  businessId: state.businessId,
});

export const getLoadHelpContentParams = state => ({
  region: state.region,
  routeName: state.currentRouteName,
  ...state.userHelpSettings,
});

export const getLoadHelpContentUrlParams = state => ({
  businessId: state.businessId,
});

export const getSupportByRegionLink = createSelector(
  getRegion,
  region => `https://www.myob.com/${region}/support`,
);

export const getSearchValue = state => state.searchValue;

const mapRegionToCountry = region => ({
  [Region.au]: 'Australia',
  [Region.nz]: 'New Zealand',
}[region]);

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return `?${query}`;
};

export const getSearchLink = createSelector(
  getRegion,
  getSearchValue,
  (region, searchValue) => {
    const searchParams = {
      q: searchValue,
      engineName: 'help',
      page: 1,
      productFamily: 'MYOB Essentials',
      country: mapRegionToCountry(region),
    };
    const baseUrl = 'https://www.myob.com/au/support/myob/search';
    const queryParams = getQueryFromParams(searchParams);
    return `${baseUrl}${queryParams}`;
  },
);
