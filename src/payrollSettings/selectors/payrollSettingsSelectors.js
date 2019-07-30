import { createSelector, createStructuredSelector } from 'reselect';

import { tabIds } from '../tabItems';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getAlert = state => state.alert;

const getStateTab = state => state.tab;

export const getTab = createSelector(
  getStateTab,
  (stateTab) => {
    const tabIdKeys = Object.keys(tabIds);
    const isValidTab = tabIdKeys.includes(stateTab);

    return isValidTab ? stateTab : tabIds.superFundList;
  },
);

export const getURLParams = createStructuredSelector({
  tab: getTab,
});

export const getModalType = state => state.modalType;
