import { addMonths } from 'date-fns';

import {
  CLOSE_MODAL,
  LOAD_CUSTOMER_STATEMENTS,
  OPEN_MODAL,
  SELECT_CUSTOMER_STATEMENT,
  SET_ALERT,
  SET_ARE_ACTIONS_DISABLED,
  SET_LOADING_STATE,
  SET_MODAL_ALERT_MESSAGE,
  SET_MODAL_SUBMITTING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_STATEMENTS,
  TOGGLE_ALL_CUSTOMER_STATEMENTS,
  UNSELECT_ALL_CUSTOMER_STATEMENTS,
  UPDATE_EMAIL_OPTIONS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_TEMPLATE_ADDITIONAL_OPTIONS,
  UPDATE_TEMPLATE_OPTION,
} from './CustomerStatementIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import StatementType from './StatementType';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const defaultFilterOptions = {
  selectedCustomerId: 'All',
  showZeroAmount: false,
};

const defaultTemplateAdditionalOptions = {
  statementType: StatementType.INVOICE,
  statementDate: formatIsoDate(new Date()),
  fromDate: formatIsoDate(getDefaultDateRange()),
  toDate: formatIsoDate(new Date()),
  includeInvoices: true,
};

const defaultSortingOption = {
  sortOrder: 'asc',
  orderBy: 'name',
};

const getDefaultState = () => ({
  businessId: '',
  region: '',
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  templateAdditionalOptions: defaultTemplateAdditionalOptions,
  appliedFilterOptions: defaultFilterOptions,
  ...defaultSortingOption,
  emailModalOptions: {
    fromEmail: '',
    subject: '',
    message: '',
    selectedTemplateOption: '',
  },
  customerStatements: [],
  customerOptions: [],
  activityTemplateOptions: [],
  invoiceTemplateOptions: [],
  defaultActivityTemplateOption: '',
  defaultInvoiceTemplateOption: '',
  selectedTemplateOption: '',
  alertMessage: '',
  isLoading: false,
  isTableLoading: false,
  areActionsDisabled: false,
  modal: undefined,
  alert: undefined,
});

const setInitialState = (state, {
  context,
  settings = {
    filterOptions: defaultFilterOptions,
    templateAdditionalOptions: defaultTemplateAdditionalOptions,
    sortOrder: defaultSortingOption.sortOrder,
    orderBy: defaultSortingOption.orderBy,
  },
}) => ({
  ...state,
  ...context,
  filterOptions: {
    ...state.filterOptions,
    ...settings.filterOptions,
  },
  templateAdditionalOptions: {
    ...state.templateAdditionalOptions,
    ...settings.templateAdditionalOptions,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    ...settings.filterOptions,
  },
  sortOrder: settings.sortOrder,
  orderBy: settings.orderBy,
});

const loadCustomerStatements = (state, { payload }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    selectedCustomerId: state.filterOptions.selectedCustomerId || payload.customerOptions[0].value,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    selectedCustomerId: state.appliedFilterOptions.selectedCustomerId
    || payload.customerOptions[0].value,
  },
  customerStatements: payload.customerStatements,
  customerOptions: payload.customerOptions,
  activityTemplateOptions: payload.activityTemplateOptions,
  invoiceTemplateOptions: payload.invoiceTemplateOptions,
  defaultActivityTemplateOption: payload.defaultActivityTemplateOption,
  defaultInvoiceTemplateOption: payload.defaultInvoiceTemplateOption,
  emailModalOptions: {
    ...state.emailModalOptions,
    fromEmail: payload.fromEmail,
    subject: payload.defaultEmailSubject,
    message: payload.defaultEmailMessage,
  },
});

const sortAndFilterCustomerStatementList = (state, { payload, filterOptions }) => ({
  ...state,
  customerStatements: payload.customerStatements,
  appliedFilterOptions: filterOptions,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const updateTemplateAdditionalOptions = (state, action) => ({
  ...state,
  templateAdditionalOptions: {
    ...state.templateAdditionalOptions,
    [action.key]: action.value,
  },
});

const updateTemplateOption = (state, { value }) => ({
  ...state,
  selectedTemplateOption: value,
});

const updateEmailOption = (state, { key, value }) => ({
  ...state,
  emailModalOptions: {
    ...state.emailModalOptions,
    [key]: value,
  },
});

const isAllSelected = entries => entries.every(entry => entry.isSelected);

const toggleAllCustomerStatements = (state) => {
  const isSelected = !isAllSelected(state.customerStatements);

  return {
    ...state,
    customerStatements: state.customerStatements.map(customerStatement => ({
      ...customerStatement,
      isSelected,
    })),
  };
};

const unselectAllCustomerStatements = state => ({
  ...state,
  customerStatements: state.customerStatements.map(customerStatement => ({
    ...customerStatement,
    isSelected: false,
  })),
});

const selectCustomerStatement = (state, { index }) => ({
  ...state,
  customerStatements: state.customerStatements.map((customerStatement, i) => (index === i
    ? ({
      ...customerStatement,
      isSelected: !customerStatement.isSelected,
    })
    : customerStatement)),
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setTableLoadingState = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setAreActionsDisabled = (state, { areActionsDisabled }) => ({
  ...state,
  areActionsDisabled,
});

const setModalSubmittingState = (state, { isModalSubmitting }) => ({
  ...state,
  modal: {
    ...state.modal,
    isModalSubmitting,
  },
});

const setModalAlertMessage = (state, { alertMessage }) => ({
  ...state,
  modal: {
    ...state.modal,
    alertMessage,
  },
});

const openModal = (state, { type }) => ({
  ...state,
  modal: {
    ...state.modal,
    type,
  },
});

const closeModal = state => ({
  ...state,
  modal: undefined,
  selectedTemplateOption: '',
  emailModalOptions: {
    ...state.emailModalOptions,
    selectedTemplateOption: '',
  },
});

const resetState = () => getDefaultState();

const handlers = ({
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ARE_ACTIONS_DISABLED]: setAreActionsDisabled,
  [SET_ALERT]: setAlert,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_MODAL_SUBMITTING_STATE]: setModalSubmittingState,
  [SET_MODAL_ALERT_MESSAGE]: setModalAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [RESET_STATE]: resetState,
  [LOAD_CUSTOMER_STATEMENTS]: loadCustomerStatements,
  [SORT_AND_FILTER_CUSTOMER_STATEMENTS]: sortAndFilterCustomerStatementList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_TEMPLATE_ADDITIONAL_OPTIONS]: updateTemplateAdditionalOptions,
  [UPDATE_TEMPLATE_OPTION]: updateTemplateOption,
  [UPDATE_EMAIL_OPTIONS]: updateEmailOption,
  [TOGGLE_ALL_CUSTOMER_STATEMENTS]: toggleAllCustomerStatements,
  [UNSELECT_ALL_CUSTOMER_STATEMENTS]: unselectAllCustomerStatements,
  [SELECT_CUSTOMER_STATEMENT]: selectCustomerStatement,
  [SET_SORT_ORDER]: setSortOrder,
});

export default createReducer(getDefaultState, handlers);
