export const getBusinessId = (state) => state.businessId;

export const getQueryParamsForList = (state) => {
  const { sortOrder, orderBy } = state;

  return {
    sortOrder,
    orderBy,
  };
};
