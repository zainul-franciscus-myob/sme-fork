export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsModalOpen = state => state.isModalOpen;
export const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};
export const getStpErrorsUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/stp/errors`;
};
export const getStpSetupUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/stp/setup`;
};
