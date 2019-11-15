import {
  LOAD_SALES_SETTINGS, SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PENDING_TAB,
  SET_SUBMITTING_STATE,
  SET_TAB,
  UPDATE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../SalesSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  salesSettings: {
    defaultSaleLayout: '',
    numberOfDaysForBalanceDue: '',
    paymentType: '',
  },
  emailSettings: {
    fromName: '',
    replyToEmail: '',
    invoiceEmailSubject: '',
    invoiceEmailBody: '',
    isInvoiceNumberIncluded: false,
    quoteEmailSubject: '',
    quoteEmailBody: '',
    isQuoteNumberIncluded: false,
    statementEmailSubject: '',
    statementEmailBody: '',
    pdfOption: '',
  },
  payDirect: {
    isRegistered: false,
    serialNumber: '',
    url: '',
  },
  reminders: {
    url: '',
  },
  isPageEdited: false,
  tabData: {},
  selectedTab: 'layoutAndTheme',
  pendingTab: '',
  paymentTerms: [],
  dateOfMonth: [],
  layout: [],
  alert: {},
  isLoading: false,
  isSubmitting: false,
});

const resetState = () => (getDefaultState());

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const loadSalesSettings = (state, { intent, ...rest }) => ({
  ...state,
  ...rest,
  tabData: { ...rest.salesSettings }, // default to layout tab
});

const defaultDate = paymentType => ({
  CashOnDelivery: '0',
  Prepaid: '0',
  OnADayOfTheMonth: '31',
  InAGivenNumberOfDays: '30',
  DayOfMonthAfterEOM: '15',
  NumberOfDaysAfterEOM: '30',
}[paymentType]);

const updateSalesSettingsItem = (state, action) => {
  let salesSettingsPatch;

  if (action.key === 'paymentType') {
    salesSettingsPatch = {
      [action.key]: action.value,
      numberOfDaysForBalanceDue: defaultDate(action.value),
    };
  } else {
    salesSettingsPatch = {
      [action.key]: action.value,
    };
  }

  return {
    ...state,
    isPageEdited: true,
    tabData: {
      ...state.tabData,
      ...salesSettingsPatch,
    },
  };
};

const getTabData = (selectedTab, state) => ({
  layoutAndTheme: state.salesSettings,
  payments: state.salesSettings,
  emailDefaults: state.emailSettings,
}[selectedTab]);

const setTab = (state, action) => ({
  ...state,
  selectedTab: action.selectedTab,
  pendingTab: '',
  tabData: { ...getTabData(action.selectedTab, state) },
  isPageEdited: false,
});

const setPendingTab = (state, action) => ({
  ...state,
  pendingTab: action.pendingTab,
});

const updateEmailSettings = (state, action) => ({
  ...state,
  tabData: {
    ...state.tabData,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

const getDataType = selectedTab => ({
  layoutAndTheme: 'salesSettings',
  payments: 'salesSettings',
  emailDefaults: 'emailSettings',
}[selectedTab]);

const saveTabData = state => ({
  ...state,
  [getDataType(state.selectedTab)]: state.tabData,
  isPageEdited: false,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [LOAD_SALES_SETTINGS]: loadSalesSettings,
  [UPDATE_SALES_SETTINGS_ITEM]: updateSalesSettingsItem,
  [SET_TAB]: setTab,
  [SET_PENDING_TAB]: setPendingTab,
  [UPDATE_EMAIL_SETTINGS]: updateEmailSettings,
  [SAVE_TAB_DATA]: saveTabData,
};

const salesSettingsDetailReducer = createReducer(getDefaultState(), handlers);

export default salesSettingsDetailReducer;
