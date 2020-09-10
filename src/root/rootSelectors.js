import { createSelector } from 'reselect';

import ModuleAction from '../common/types/ModuleAction';
import RouteName from '../router/RouteName';
import SubscriptionType from '../common/types/SubscriptionType';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getAreOnboardingSettingsLoaded = (state) =>
  state.areOnboardingSettingsLoaded;
export const getPreviousSettingsBusinessId = (state) =>
  state.previousSettingsBusinessId;
export const getLeanEngageInfo = (state) => ({
  businessDetails: state.businessDetails,
  currentUser: state.currentUser,
  subscription: state.subscription,
});
export const getHasCheckedBrowserAlert = (state) =>
  state.hasCheckedBrowserAlert;
export const getIsPaidSubscription = (state) =>
  state.subscription.type === SubscriptionType.PAID;

const getUserType = ({ isAdvisor }) => {
  if (isAdvisor === undefined) {
    return undefined;
  }

  return isAdvisor ? 'advisor' : 'SME';
};

export const getErrorPageUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/error`
);

export const getTelemetryData = (state) =>
  state.businessId
    ? {
        region: state.region,
        businessId: state.businessId,
        businessRole: state.businessRole,
        businessCreationDate: state.subscription.startDateTime,
        accountStatus: state.subscription.status,
        accountType: state.subscription.type,
        productCatalogId: state.subscription.product
          ? state.subscription.product.id
          : undefined,
        industry: state.industry,
        userType: getUserType(state.currentUser),
      }
    : {};

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
