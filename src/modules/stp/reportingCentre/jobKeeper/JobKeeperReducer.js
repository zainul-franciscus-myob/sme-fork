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
import { isTierBlankOrSuggested } from './JobKeeperSelector';
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

export const computeAutoFillingFirstFortnightForJobKeeper2 = (
  tier,
  firstFortnight
) => {
  // rule 1: when select tier, but hasn't start the JK2 (first fortnight < 14), then change
  // first fortnight to 14 to indicate start JK2
  return !isTierBlankOrSuggested(tier) &&
    (!firstFortnight || firstFortnight < 14)
    ? '14'
    : firstFortnight;
};
export const computeAutoFillingFinalFortnightForJobKeeper2 = (
  initialState,
  firstFortnight
) => {
  // if there is no initial state or no fortnight (didn't start JK1)
  // then return 0
  if (
    !initialState ||
    (!initialState.firstFortnight && !initialState.finalFortnight)
  )
    return null;
  // job keeper 1
  if (
    !!initialState.firstFortnight &&
    Number(initialState.firstFortnight) < 14
  ) {
    // user go from JK1 to JK2 meaning end fornight is blank
    // and select start fortnight >15 (meaning there is a gap)
    if (!initialState.finalFortnight && Number(firstFortnight) >= 15) {
      return '14';
    }
  }
  // don't change for the rest
  return null;
};

const updateEmployeeRow = (state, { key, value, rowId }) => {
  return {
    ...state,
    isDirty: true,
    employees: state.employees.map((e) => {
      const initialState = state.initialEmployees.find(
        (x) => x.employeeId === rowId
      );
      let { firstFortnight, finalFortnight } = e;
      // make sure the update value is pass through
      firstFortnight = key === 'firstFortnight' ? value : firstFortnight;
      finalFortnight = key === 'finalFortnight' ? value : finalFortnight;
      if (state.isJobKeeper2Enabled)
        switch (key) {
          case 'tier':
            firstFortnight = computeAutoFillingFirstFortnightForJobKeeper2(
              value,
              e.firstFortnight
            );
            break;
          case 'firstFortnight':
            finalFortnight =
              computeAutoFillingFinalFortnightForJobKeeper2(
                initialState,
                value
              ) || finalFortnight;
            break;
          default:
        }

      return e.employeeId === rowId
        ? { ...e, [key]: value, firstFortnight, finalFortnight, isDirty: true }
        : { ...e };
    }),
  };
};

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
