import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getBusinessName = (state) => state.businessName;
export const getBusinessRole = (state) => state.businessRole;
export const getIndustryId = (state) => state.industryId;
export const getLoadingState = (state) => state.loadingState;
export const getRegion = (state) => state.region;
export const getAlert = (state) => state.alert;
export const getIndustries = (state) => state.industries;
export const getIsFormSubmitted = (state) => state.isFormSubmitted;
export const getIsBusinessNameEdited = (state) => state.isBusinessNameEdited;

export const getIndustryMetaData = () => [
  { columnName: 'title', showData: true },
  { columnName: 'secondary' },
];

export const getIndustryItems = createSelector(getIndustries, (industries) =>
  industries.map((industry) => ({
    id: industry.id,
    title: industry.title,
    secondary: industry.examples && `Eg. ${industry.examples.join(', ')}`,
  }))
);

export const getOnboardingDetails = (state) => ({
  businessId: state.businessId,
  businessName: state.businessName,
  businessRole: state.businessRole || '',
  industryId: state.industryId || '',
  usingCompetitorProduct: state.usingCompetitorProduct,
  businessRoles: state.businessRoles,
});

export const getIsMoveToMyobEnabled = (state) => state.isMoveToMyobEnabled;

export const getSaveOnboardingContent = (state) => ({
  businessName: state.businessName,
  businessRole: state.businessRole,
  industry: state.industryId,
  region: state.region,
  onboardingComplete: true,
  usingCompetitorProduct: state.usingCompetitorProduct,
});

export const getDashboardUrl = (state) =>
  `/#/${state.region}/${state.businessId}/dashboard`;

export const getIsFormValid = createSelector(
  getBusinessName,
  getBusinessRole,
  getIndustryId,
  (businessName, businessRole, industryId) =>
    businessName && businessRole && industryId
);
