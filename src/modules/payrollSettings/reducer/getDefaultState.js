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
    defaultSuperFund: '',
    defaultSuperFundOptions: [],
    useTimesheets: false,
    useTimesheetsAction: '',
    useTimesheetsWeekStarts: '',
    isUseTimesheetsChanged: false,
  },
  paySlipEmailDefaults: {
    loadingState: LoadingState.LOADING_SUCCESS,
    subject: '',
    message: '',
  },
  isPageEdited: false,
});

export default getDefaultState;
