const getDefaultState = () => ({
  businessId: '',
  tab: '',
  alert: undefined,
  modalType: '',
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
  employmentClassificationList: {
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
  employmentClassificationDetail: {
    id: undefined,
    description: '',
    alert: undefined,
    isLoading: false,
  },
});

export default getDefaultState;
