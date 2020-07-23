import SubscriptionType from '../common/types/SubscriptionType';

export const getBusinessId = (state) => state.businessId;
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

export const getTelemetryData = (state) =>
  state.businessId
    ? {
        region: state.region,
        businessId: state.businessId,
        businessRole: state.businessRole,
        businessCreationDate: state.subscription.startDateTime,
        accountStatus: state.subscription.status,
        productCatalogId: state.subscription.product
          ? state.subscription.product.id
          : undefined,
        industry: state.industry,
        userType: getUserType(state.currentUser),
      }
    : {};
