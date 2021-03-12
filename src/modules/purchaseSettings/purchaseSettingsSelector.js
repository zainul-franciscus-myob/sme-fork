import { mainTabItems } from './tabItems';

export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getAlert = (state) => state.alert;
export const getModalType = (state) => state.modalType;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getRedirectUrl = (state) => state.redirectUrl;
export const getTemplateList = (state) => state.templateList;
export const getShouldDisplayCustomTemplateList = (state) =>
  state.shouldDisplayCustomTemplateList;
export const getIsFeatureAvailable = (state) => state.isPurchaseOrderEnabled;
export const getSelectedTab = (state) => state.selectedTab;
export const getTabData = (state) => state.tabData;
export const getShowActions = (state) =>
  mainTabItems().find((tab) => tab.id === state.selectedTab).hasActions;
export const getPendingTab = (state) => state.pendingTab;
