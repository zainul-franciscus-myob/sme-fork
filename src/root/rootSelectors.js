import { createSelector, createStructuredSelector } from 'reselect';

import ModuleAction from '../common/types/ModuleAction';
import RouteName from '../router/RouteName';
import SubscriptionStatus from '../common/types/SubscriptionStatus';
import SubscriptionType from '../common/types/SubscriptionType';

export const getBusinessId = (state) => state.businessId;
export const getBusinessRole = (state) => state.businessRole;
export const getIndustry = (state) => state.industry;
export const getSubscription = (state) => state.subscription;
export const getBusinessDetails = (state) => state.businessDetails;
export const getCurrentUser = (state) => state.currentUser;
export const getRegion = (state) => state.region;
export const getAreOnboardingSettingsLoaded = (state) =>
  state.areOnboardingSettingsLoaded;
export const getPreviousSettingsBusinessId = (state) =>
  state.previousSettingsBusinessId;
export const getUpdateTasksFailure = (state) => state.updateTasksFailure;
export const getGetTasksListFailure = (state) => state.getGetTasksListFailure;

export const getHasCheckedBrowserAlert = (state) =>
  state.hasCheckedBrowserAlert;
export const getIsPaidSubscription = (state) =>
  state.subscription.type === SubscriptionType.PAID;

export const getIsSubscriptionExpired = (state) =>
  state.subscription.status === SubscriptionStatus.EXPIRED;

export const getErrorPageUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/error`
);

export const getLeanEngageInfo = createStructuredSelector({
  businessDetails: getBusinessDetails,
  currentUser: getCurrentUser,
  subscription: getSubscription,
});

export const getTelemetryInfo = createStructuredSelector({
  region: getRegion,
  businessId: getBusinessId,
  businessRole: getBusinessRole,
  industry: getIndustry,
  subscription: getSubscription,
  currentUser: getCurrentUser,
});

const getLoadBusinessModuleAction = ({
  currentBusinessId,
  currentRouteName,
  previousBusinessId,
  previousRouteName,
}) => {
  if (!currentBusinessId) {
    return false;
  }

  if (currentRouteName === RouteName.ERROR) {
    return false;
  }

  if (currentBusinessId !== previousBusinessId) {
    return true;
  }

  if (
    currentBusinessId === previousBusinessId &&
    previousRouteName === RouteName.LINK_USER
  ) {
    return true;
  }

  return false;
};

export const getModuleAction = (props) => ({
  [ModuleAction.LOAD_BUSINESS]: getLoadBusinessModuleAction(props),
});
