import {
  DISMISS_INITIAL_WARNING,
  RESET_DIRTY_FLAG,
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEE,
  SET_ALERT_MESSAGE,
  SET_FILTERED_EMPLOYEES,
  SET_INITIAL_STATE,
  SET_JOB_KEEPER_INITIAL,
  SET_LOADING_STATE,
  SET_NEW_EVENT_ID,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SET_UNSAVED_CHANGES_MODAL,
  SORT_JOB_KEEPER_EMPLOYEES,
  TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL,
  UPDATE_EMPLOYEE_ROW,
} from './JobKeeperIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import uuid from '../../../../common/uuid/uuid';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  payrollYears: [],
  selectedPayrollYear: '',
  eventId: uuid(),
  employees: [],
  sortOrder: 'asc',
  orderBy: 'FirstName',
  isDirty: false,
  unsavedChangesModalIsOpen: false,
  showInitWarning: true,
  isEmployeeBenefitReportModalOpen: false,
  alertMessage: '',
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const addAllowClearToEmployees = (response) => {
  if (!response || !response.employees) return [];
  return response.employees.map((e) => ({
    ...e,
    allowClearFirstFortnight: !e.firstFortnight,
    allowClearFinalFortnight: !e.finalFortnight,
  }));
};

const setJobKeeperInitial = (state, { response }) => ({
  ...state,
  ...response,
  isDirty: false,
  employees: addAllowClearToEmployees(response),
  // get an initial copy
  initialEmployees: response.employees.map((x) => ({ ...x })),
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setFilteredEmployees = (state, { response }) => ({
  ...state,
  ...response,
  isDirty: false,
});

const setSortedEmployees = (state, { response }) => ({
  ...state,
  ...response,
});

const setSort = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setUnsavedChangesModal = (state, { isOpen }) => ({
  ...state,
  unsavedChangesModalIsOpen: isOpen,
});

const resetDirtyFlag = (state) => ({
  ...state,
  isDirty: false,
});

const updateEmployeeRow = (state, { key, value, rowId }) => ({
  ...state,
  isDirty: true,
  employees: state.employees.map((e) =>
    e.employeeId === rowId ? { ...e, [key]: value, isDirty: true } : { ...e }
  ),
});

const setNewEventId = (state) => ({
  ...state,
  eventId: uuid(),
});

const dismissInitWarning = (state) => ({
  ...state,
  showInitWarning: false,
});

const toggleEmployeeBenefitReportModal = (
  state,
  { isEmployeeBenefitReportModalOpen }
) => ({
  ...state,
  isEmployeeBenefitReportModalOpen,
});

const selectEmployee = (state, action) => ({
  ...state,
  employees: state.employees.map((e) =>
    e.employeeId === action.item.employeeId
      ? { ...e, isSelected: action.value }
      : e
  ),
});

const selectAllEmployees = (state, { isSelected }) => ({
  ...state,
  employees: state.employees.map((e) => ({
    ...e,
    isSelected,
  })),
});
const setAlertMessage = (state, { alertMessage }) => ({
  ...state,
  alertMessage,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_JOB_KEEPER_INITIAL]: setJobKeeperInitial,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [SET_FILTERED_EMPLOYEES]: setFilteredEmployees,
  [SET_SORTED_EMPLOYEES]: setSortedEmployees,
  [SORT_JOB_KEEPER_EMPLOYEES]: setSort,
  [SET_INITIAL_STATE]: setInitialState,
  [UPDATE_EMPLOYEE_ROW]: updateEmployeeRow,
  [SET_UNSAVED_CHANGES_MODAL]: setUnsavedChangesModal,
  [RESET_DIRTY_FLAG]: resetDirtyFlag,
  [SET_NEW_EVENT_ID]: setNewEventId,
  [DISMISS_INITIAL_WARNING]: dismissInitWarning,
  [TOGGLE_EMPLOYEE_BENEFIT_REPORT_MODAL]: toggleEmployeeBenefitReportModal,
  [SELECT_EMPLOYEE]: selectEmployee,
  [SELECT_ALL_EMPLOYEES]: selectAllEmployees,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const jobKeeperReducer = createReducer(getDefaultState(), handlers);

export default jobKeeperReducer;
