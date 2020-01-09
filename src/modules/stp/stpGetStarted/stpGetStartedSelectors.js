export const getRegion = state => state.region;
export const getBusinessId = state => state.businessId;
export const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};
export const getStpErrorsUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  return `${baseUrl}/stp/errors`;
};
export const getModal = state => state.modal;
