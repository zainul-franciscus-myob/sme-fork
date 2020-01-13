import LoadingState from '../../../components/PageView/LoadingState';

const getDefaultState = () => ({
  businessId: '',
  tab: '',
  alert: undefined,
  modalType: '',
  superFundList: {
    loadingState: LoadingState.LOADING,
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
    loadingState: LoadingState.LOADING,
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
    loadingState: LoadingState.LOADING,
  },
  generalPayrollInformation: {
    currentYear: '',
    hoursInWorkWeek: '',
    withholdingPayerNumber: '',
    roundNetPay: '',
    taxTableRevisionDate: '',
    useTimesheets: false,
    useTimesheetsAction: '',
    useTimesheetsWeekStarts: '',
  },
  isPageEdited: false,
});

export default getDefaultState;
