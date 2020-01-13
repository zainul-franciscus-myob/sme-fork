import States from '../common/States';

export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};
export const getStpSetupUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/stp/setup`;
};
export const getEmployeePageUrl = (state, employeeId) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/employee/${employeeId}`;
};
export const getPayItemPageUrl = (state, itemType, id) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/payItem/${itemType}/${id}`;
};

export const getErrorMessage = state => state.errorMessage;
export const getIsLoading = state => state.isLoading;
export const getErrorCount = state => (
  state.errors.businessDetails.length
  + state.errors.employees.length
  + state.errors.payItems.length
);
export const getBusinessDetailsErrors = state => state.errors.businessDetails;
export const getEmployeeInformationErrors = state => state.errors.employees;
export const getPayItemsErrors = state => state.errors.payItems;
export const getIsBusinessDetailsModalOpen = state => state.businessDetailsModalIsOpen;
export const getBusinessDetailsModalIsLoading = state => state.businessDetailsModalIsLoading;
export const getBusinessDetailModalAlertMessage = state => state.businessDetailModalAlertMessage;

export const getBusinessName = state => state.businessDetails.businessName;
export const getAbnWpn = state => state.businessDetails.abnWpn;
export const getAbnBranch = state => state.businessDetails.abnBranch;
export const getStreetAddress1 = state => state.businessDetails.streetAddress1;
export const getStreetAddress2 = state => state.businessDetails.streetAddress2;
export const getCity = state => state.businessDetails.city;
export const getState = state => state.businessDetails.state;
export const getPostcode = state => state.businessDetails.postcode;
export const getCountry = state => state.businessDetails.country;

export const getShowCountryField = state => (state.businessDetails.state === States.OTH);

export const getSubmitBusinessDetailsContent = state => ({
  ...state.businessDetails,
  country: state.businessDetails.state === States.OTH ? state.businessDetails.country : null,
});
