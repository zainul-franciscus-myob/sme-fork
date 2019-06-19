const getDefaultState = () => ({
  tab: '',
  alert: undefined,
  superFundList: {
    isLoading: true,
    isTableLoading: false,
    filterOptions: {
      keywords: '',
    },
    appliedFilterOptions: {
      keywords: '',
    },
    sortOrder: '',
    orderBy: '',
    entries: [],
  },
});

export default getDefaultState;
