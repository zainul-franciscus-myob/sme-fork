import {
  CLOSE_MODAL,
  DELETE_TEMPLATE,
  LOAD_PAY_DIRECT_SETTINGS,
  LOAD_SALES_SETTINGS,
  OPEN_MODAL,
  SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_DIRECT_SETTINGS_LOADING_STATE,
  SET_PENDING_DELETE_TEMPLATE,
  SET_PENDING_TAB,
  SET_SORTED_TEMPLATES,
  SET_TAB,
  SET_TEMPLATE_LIST,
  SET_TEMPLATE_LIST_LOADING,
  SET_TEMPLATE_LIST_SORT_ORDER,
  UPDATE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS_ITEM,
} from '../SalesSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  modalType: '',
  salesSettings: {
    defaultSaleLayout: '',
    numberOfDaysForBalanceDue: '',
    paymentType: '',
    accountId: '',
    isAllowPaymentsByDirectDeposit: false,
    bankName: '',
    accountName: '',
    bankNumber: '',
    branch: '',
    accountNumber: '',
    suffix: '',
    isAllowPaymentsByMail: false,
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
    isLoading: false,
    isServiceAvailable: false,
    isRegistered: false,
    url: '',
  },
  reminders: {
    url: '',
  },
  templateSettings: {
    templates: [],
    arlTemplates: [],
    essentialsTemplates: [],
    sortOrder: '',
    orderBy: '',
    isLoading: false,
  },
  serialNumber: '',
  isPageEdited: false,
  tabData: {},
  selectedTab: 'layoutAndTheme',
  pendingTab: '',
  pendingDeleteTemplate: '',
  paymentTerms: [],
  dateOfMonth: [],
  layout: [],
  accountOptions: [],
  alert: {},
  loadingState: LoadingState.LOADING,
});

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const loadSalesSettings = (state, { intent, templateSettings, ...rest }) => ({
  ...state,
  ...rest,
  tabData: { ...rest.salesSettings }, // default to layout tab
  templateSettings: {
    ...state.templateSettings,
    ...templateSettings,
  },
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

const setTemplateListLoading = (state, { isTableLoading }) => ({
  ...state,
  templateSettings: {
    ...state.templateSettings,
    isLoading: isTableLoading,
  },
});
const setTemplateListSortOrder = (state, { orderBy, sortOrder }) => ({
  ...state,
  templateSettings: {
    ...state.templateSettings,
    orderBy,
    sortOrder,
  },
});
const setTemplateList = (state, { response }) => ({
  ...state,
  templateSettings: {
    ...state.templateSettings,
    ...response,
  },
});

const setSortedTemplates = (state, { templates }) => ({
  ...state,
  templateSettings: {
    ...state.templateSettings,
    templates,
  },
});

const openModal = (state, { modalType }) => ({
  ...state,
  modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setPendingDeleteTemplate = (state, { templateName }) => ({
  ...state,
  pendingDeleteTemplate: templateName,
});

const deleteTemplate = (state, { templateName }) => ({
  ...state,
  pendingDeleteTemplate: '',
  templateSettings: {
    ...state.templateSettings,
    templates: (
      state.templateSettings.templates.filter(({ name }) => name !== templateName)
    ),
  },
});

const updatePayDirectState = (state, partialPayDirect) => ({
  ...state,
  payDirect: {
    ...state.payDirect,
    ...partialPayDirect,
  },
});

export const loadPayDirectSettings = (state, { payDirect }) => updatePayDirectState(
  state, { ...payDirect, isServiceAvailable: true },
);

export const setPayDirectSettingsLoadingState = (state, { isLoading }) => updatePayDirectState(
  state, { isLoading },
);

const handlers = {
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_ALERT]: setAlert,
  [LOAD_SALES_SETTINGS]: loadSalesSettings,
  [UPDATE_SALES_SETTINGS_ITEM]: updateSalesSettingsItem,
  [SET_TAB]: setTab,
  [SET_PENDING_TAB]: setPendingTab,
  [UPDATE_EMAIL_SETTINGS]: updateEmailSettings,
  [SAVE_TAB_DATA]: saveTabData,
  [SET_TEMPLATE_LIST_LOADING]: setTemplateListLoading,
  [SET_TEMPLATE_LIST_SORT_ORDER]: setTemplateListSortOrder,
  [SET_TEMPLATE_LIST]: setTemplateList,
  [SET_SORTED_TEMPLATES]: setSortedTemplates,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PENDING_DELETE_TEMPLATE]: setPendingDeleteTemplate,
  [DELETE_TEMPLATE]: deleteTemplate,
  [LOAD_PAY_DIRECT_SETTINGS]: loadPayDirectSettings,
  [SET_PAY_DIRECT_SETTINGS_LOADING_STATE]: setPayDirectSettingsLoadingState,
};

const salesSettingsDetailReducer = createReducer(getDefaultState(), handlers);

export default salesSettingsDetailReducer;
