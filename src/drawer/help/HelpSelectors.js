export const getBusinessId = state => state.businessId;
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
