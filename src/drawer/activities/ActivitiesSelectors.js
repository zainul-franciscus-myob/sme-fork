export const getOnboardingActivities = state => state.activities.filter(activity => activity.template === 'drawer');
export const getWelcomeActivity = state => state.activities.find(activity => activity.template === 'welcome');
export const getLoadingState = state => state.loadingState;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
