export const getBusinessId = state => state.businessId;
export const getAreOnboardingSettingsLoaded = state => state.areOnboardingSettingsLoaded;
export const getPreviousSettingsBusinessId = state => state.previousSettingsBusinessId;
export const getLeanEngageInfo = state => ({
  businessDetails: state.businessDetails,
  currentUser: state.currentUser,
  subscription: state.subscription,
});
export const getHasCheckedBrowserAlert = state => state.hasCheckedBrowserAlert;
