export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getPayRunListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  return `/#/${region}/${businessId}/payRun`;
};
