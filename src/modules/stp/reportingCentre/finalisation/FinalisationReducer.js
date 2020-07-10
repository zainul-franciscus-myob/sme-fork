import {
  LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR,
  LOAD_INITIAL_EMPLOYEES_AND_HEADERS,
  RESET_DIRTY_FLAG,
  RESET_EVENT_ID,
  SELECT_ALL_EMPLOYEES,
  SELECT_EMPLOYEES_ITEM,
  SET_IS_RFBA_ENABLED,
  SET_LOADING_STATE,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SORTED_EMPLOYEES,
  SET_TABLE_LOADING_STATE,
  SET_UNSAVED_CHANGES_MODAL,
  SORT_EMPLOYEES,
  UPDATE_EMPLOYEE_ROW,
} from './FinalisationIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
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
  grossPaymentYtd: '',
  paygWithholdingYtd: '',
  reportedRfba: '',
  reportedSection57aRfba: '',
  isRFBAEnabled: false,
  employeesCount: null,
  isDirty: false,
  sortOrder: 'asc',
  orderBy: 'FirstName',
  unsavedChangesModalIsOpen: false,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setInitialFinalisationInformation = (state, { response }) => ({
  ...state,
  payrollYears: response.payrollYears,
  selectedPayrollYear: response.selectedPayrollYear || '',
  employees: response.employees
    ? response.employees.map((e) => ({
        ...e,
        isSelected: false,
      }))
    : [],
  grossPaymentYtd: response.grossPaymentYtd,
  paygWithholdingYtd: response.paygWithholdingYtd,
  reportedRfba: response.reportedRfba,
  reportedSection57aRfba: response.reportedSection57aRfba,
  employeesCount: response.employeesCount,
});

const loadEmployeesAndHeadersForYear = (state, { response }) => ({
  ...state,
  isDirty: false,
  employees: response.employees
    ? response.employees.map((e) => ({
        ...e,
        isSelected: false,
      }))
    : [],
  grossPaymentYtd: response.grossPaymentYtd,
  paygWithholdingYtd: response.paygWithholdingYtd,
  reportedRfba: response.reportedRfba,
  reportedSection57aRfba: response.reportedSection57aRfba,
  employeesCount: response.employeesCount,
});

const setIsRFBAEnabled = (state, { isRFBAEnabled }) => ({
  ...state,
  isRFBAEnabled,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const selectAllEmployees = (state, { isSelected }) => ({
  ...state,
  isDirty: true,
  employees: state.employees.map((t) => ({
    ...t,
    isSelected,
  })),
});

const selectEmployeesItem = (state, action) => ({
  ...state,
  isDirty: true,
  employees: state.employees.map((e) =>
    e.id === action.item.id ? { ...e, isSelected: action.isSelected } : e
  ),
});

const updateEmployeeRow = (state, { key, value, rowId }) => ({
  ...state,
  isDirty: true,
  employees: state.employees.map((e) =>
    e.id === rowId ? { ...e, [key]: value } : { ...e }
  ),
});

const resetEventId = (state) => ({
  ...state,
  eventId: uuid(),
});

const setUnsavedChangesModal = (state, { isOpen }) => ({
  ...state,
  unsavedChangesModalIsOpen: isOpen,
});

const resetDirtyFlag = (state) => ({
  ...state,
  isDirty: false,
});

const setSort = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setEmployees = (state, { employees }) => ({
  ...state,
  employees,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_INITIAL_EMPLOYEES_AND_HEADERS]: setInitialFinalisationInformation,
  [SET_IS_RFBA_ENABLED]: setIsRFBAEnabled,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [SET_LOADING_STATE]: setLoadingState,
  [SELECT_ALL_EMPLOYEES]: selectAllEmployees,
  [SELECT_EMPLOYEES_ITEM]: selectEmployeesItem,
  [UPDATE_EMPLOYEE_ROW]: updateEmployeeRow,
  [LOAD_EMPLOYEES_AND_HEADERS_FOR_YEAR]: loadEmployeesAndHeadersForYear,
  [RESET_EVENT_ID]: resetEventId,
  [SET_UNSAVED_CHANGES_MODAL]: setUnsavedChangesModal,
  [RESET_DIRTY_FLAG]: resetDirtyFlag,
  [SORT_EMPLOYEES]: setSort,
  [SET_SORTED_EMPLOYEES]: setEmployees,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
};

const finalisationReducer = createReducer(getDefaultState(), handlers);

export default finalisationReducer;
