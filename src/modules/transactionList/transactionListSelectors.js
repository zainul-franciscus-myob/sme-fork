import { createSelector } from 'reselect';

export const getAlert = state => state.alert;

export const getActiveTab = state => state.activeTab;

export const getRegion = state => state.region;

const getLastLoadingTab = state => state.lastLoadingTab;

export const getIsSwitchingTab = createSelector(
  getActiveTab,
  getLastLoadingTab,
  (activeTab, lastLoadingTab) => activeTab !== lastLoadingTab,
);
