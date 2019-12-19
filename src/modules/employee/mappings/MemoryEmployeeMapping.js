import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE, CREATE_EXPENSE_PAY_ITEM_MODAL,
  CREATE_LEAVE_PAY_ITEM,
  CREATE_SUPER_FUND,
  CREATE_SUPER_PAY_ITEM_MODAL,
  CREATE_WAGE_PAY_ITEM_MODAL,
  DELETE_EMPLOYEE,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_NEXT_PAGE,
  LOAD_EXPENSE_PAY_ITEM_MODAL,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_NEW_EXPENSE_PAY_ITEM_MODAL,
  LOAD_NEW_LEAVE_PAY_ITEM,
  LOAD_NEW_SUPER_FUND,
  LOAD_NEW_SUPER_PAY_ITEM_MODAL,
  LOAD_NEW_WAGE_PAY_ITEM_MODAL,
  LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE,
  LOAD_SUPER_PAY_ITEM_MODAL,
  LOAD_TAX_PAY_ITEM_MODAL,
  LOAD_WAGE_PAY_ITEM_MODAL,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL, UPDATE_EMPLOYEE,
  UPDATE_EXPENSE_PAY_ITEM_MODAL,
  UPDATE_LEAVE_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM_MODAL,
  UPDATE_TAX_PAY_ITEM_MODAL,
  UPDATE_WAGE_PAY_ITEM_MODAL,
} from '../EmployeeIntents';
import abnDetail from './data/abnDetail';
import createDeductionPayItemModalResponse from './data/createDeductionPayItemModalResponse';
import createExpensePayItemModalResponse from './data/createExpensePayItemModalResponse';
import createLeavePayItemModalResponse from './data/createLeavePayItemModalResponse';
import createSuperFundModalResponse from './data/createSuperFundModalResponse';
import createSuperPayItemModalResponse from './data/createSuperPayItemModalResponse';
import createWagePayItemModalResponse from './data/createWagePayItemModalResponse';
import employeeDetailLoadResponse from './data/employeeDetailEntry';
import employeeListFilterResponse from './data/filterEmployeeList';
import employeeListNextPageResponse from './data/employeeListNextPage';
import employeeListResponse from './data/employeeList';
import loadDeductionPayItemModalResponse from './data/loadDeductionPayItemModalResponse';
import loadExpensePayItemModalResponse from './data/loadExpensePayItemModalResponse';
import loadLeavePayItemModalResponse from './data/loadLeavePayItemModalResponse';
import loadNewDeductionPayItemModalResponse from './data/loadNewDeductionPayItemModalResponse';
import loadNewExpensePayItemModalResponse from './data/loadNewExpensePayItemModalResponse';
import loadNewLeavePayItemModalResponse from './data/loadNewLeavePayItemModalResponse';
import loadNewSuperPayItemModalResponse from './data/loadNewSuperPayItemModalResponse';
import loadNewWagePayItemModalResponse from './data/loadNewWagePayItemModalResponse';
import loadStandardPayWageAmountRuleResponse from './data/loadStandardPayWageAmountRuleResponse';
import loadSuperPayItemModalResponse from './data/loadSuperPayItemModalResponse';
import loadWagePayItemModalResponse from './data/loadWagePayItemModalResponse';
import newEmployeeDetailResponse from './data/employeeDetailNewEntry';
import successEmployeeCreateResponse from './data/employeeCreateResponse';
import successResponse from './data/success';
import superFundNewDetail from './data/superFundNewDetail';
import taxPayItemResponse from './data/loadTaxPayItem';
import updateDeductionPayItemModalResponse from './data/updatedDeductionPayItemModalResponse';
import updateExpensePayItemModalResponse from './data/updatedExpensePayItemModalResponse';
import updateSuperPayItemModalResponse from './data/updateSuperPayItemModalResponse';
import updatedEmployeeDetailResponse from './data/updateEmployeeDetailResponse';
import updatedLeavePayItemModalResponse from './data/updatedLeavePayItemModalResponse';
import updatedWagePayItemModalResponse from './data/updatedWagePayItemModalResponse';

const loadEmployeeList = ({ onSuccess }) => { onSuccess(employeeListResponse); };

const sortAndFilterEmployeeList = ({ onSuccess }) => { onSuccess(employeeListFilterResponse); };

const loadEmployeeDetail = ({ onSuccess }) => { onSuccess(employeeDetailLoadResponse); };

const loadNewEmployeeDetail = ({ onSuccess }) => { onSuccess(newEmployeeDetailResponse); };

const updateEmployee = ({ onSuccess }) => { onSuccess(updatedEmployeeDetailResponse); };

const deleteEmployee = ({ onSuccess }) => { onSuccess(successResponse); };

const createEmployee = ({ onSuccess }) => { onSuccess(successEmployeeCreateResponse); };

const loadEmployeeListNextPage = ({ onSuccess }) => { onSuccess(employeeListNextPageResponse); };

const loadStandardPayWageAmountRule = ({ onSuccess }) => (
  onSuccess(loadStandardPayWageAmountRuleResponse)
);

const loadTaxPayItemModalDetails = ({ onSuccess }) => onSuccess(taxPayItemResponse);

const updateTaxPayItemModalDetails = ({ onSuccess }) => onSuccess(successResponse);

const loadNewExpensePayItemModal = ({ onSuccess }) => (
  onSuccess(loadNewExpensePayItemModalResponse)
);

const loadExpensePayItemModal = ({ onSuccess }) => (
  onSuccess(loadExpensePayItemModalResponse)
);

const createExpensePayItemModal = ({ onSuccess }) => (
  onSuccess(createExpensePayItemModalResponse)
);

const updateExpensePayItemModal = ({ onSuccess }) => (
  onSuccess(updateExpensePayItemModalResponse)
);

const loadNewWagePayItemModal = ({ onSuccess }) => (
  onSuccess(loadNewWagePayItemModalResponse)
);

const loadWagePayItemModal = ({ onSuccess }) => (
  onSuccess(loadWagePayItemModalResponse)
);

const createWagePayItemModal = ({ onSuccess }) => (
  onSuccess(createWagePayItemModalResponse)
);

const updateWagePayItemModal = ({ onSuccess }) => (
  onSuccess(updatedWagePayItemModalResponse)
);

const loadDeductionPayItemModal = ({ onSuccess }) => onSuccess(loadDeductionPayItemModalResponse);

const loadNewDeductionPayItemModal = ({ onSuccess }) => (
  onSuccess(loadNewDeductionPayItemModalResponse)
);

const createDeductionPayItemModal = ({ onSuccess }) => (
  onSuccess(createDeductionPayItemModalResponse)
);

const updateDeductionPayItemModal = ({ onSuccess }) => (
  onSuccess(updateDeductionPayItemModalResponse)
);

const loadNewSuperFund = ({ onSuccess }) => onSuccess(superFundNewDetail);
const loadAbnDetail = ({ onSuccess }) => onSuccess(abnDetail);
const createSuperFund = ({ onSuccess }) => onSuccess(createSuperFundModalResponse);

const loadNewSuperPayItemModal = ({ onSuccess }) => onSuccess(loadNewSuperPayItemModalResponse);

const loadSuperPayItemModal = ({ onSuccess }) => onSuccess(loadSuperPayItemModalResponse);

const createSuperPayItemModal = ({ onSuccess }) => onSuccess(createSuperPayItemModalResponse);

const updateSuperPayItemModal = ({ onSuccess }) => onSuccess(updateSuperPayItemModalResponse);

const loadLeavePayItemModal = ({ onSuccess }) => onSuccess(loadLeavePayItemModalResponse);
const loadNewLeavePayItemModal = ({ onSuccess }) => onSuccess(loadNewLeavePayItemModalResponse);
const createLeavePayItemModal = ({ onSuccess }) => onSuccess(createLeavePayItemModalResponse);
const updatedLeavePayItemModal = ({ onSuccess }) => onSuccess(updatedLeavePayItemModalResponse);

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [LOAD_NEW_EMPLOYEE_DETAIL]: loadNewEmployeeDetail,
  [UPDATE_EMPLOYEE]: updateEmployee,
  [DELETE_EMPLOYEE]: deleteEmployee,
  [CREATE_EMPLOYEE]: createEmployee,
  [LOAD_EMPLOYEE_LIST_NEXT_PAGE]: loadEmployeeListNextPage,
  [LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE]: loadStandardPayWageAmountRule,
  [LOAD_TAX_PAY_ITEM_MODAL]: loadTaxPayItemModalDetails,
  [UPDATE_TAX_PAY_ITEM_MODAL]: updateTaxPayItemModalDetails,
  [CREATE_WAGE_PAY_ITEM_MODAL]: createWagePayItemModal,
  [UPDATE_WAGE_PAY_ITEM_MODAL]: updateWagePayItemModal,
  [LOAD_NEW_WAGE_PAY_ITEM_MODAL]: loadNewWagePayItemModal,
  [LOAD_WAGE_PAY_ITEM_MODAL]: loadWagePayItemModal,
  [LOAD_NEW_EXPENSE_PAY_ITEM_MODAL]: loadNewExpensePayItemModal,
  [LOAD_EXPENSE_PAY_ITEM_MODAL]: loadExpensePayItemModal,
  [CREATE_EXPENSE_PAY_ITEM_MODAL]: createExpensePayItemModal,
  [UPDATE_EXPENSE_PAY_ITEM_MODAL]: updateExpensePayItemModal,
  [LOAD_DEDUCTION_PAY_ITEM_MODAL]: loadDeductionPayItemModal,
  [LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL]: loadNewDeductionPayItemModal,
  [CREATE_DEDUCTION_PAY_ITEM_MODAL]: createDeductionPayItemModal,
  [UPDATE_DEDUCTION_PAY_ITEM_MODAL]: updateDeductionPayItemModal,
  [LOAD_NEW_SUPER_FUND]: loadNewSuperFund,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [CREATE_SUPER_FUND]: createSuperFund,
  [LOAD_NEW_SUPER_PAY_ITEM_MODAL]: loadNewSuperPayItemModal,
  [LOAD_SUPER_PAY_ITEM_MODAL]: loadSuperPayItemModal,
  [CREATE_SUPER_PAY_ITEM_MODAL]: createSuperPayItemModal,
  [UPDATE_SUPER_PAY_ITEM_MODAL]: updateSuperPayItemModal,
  [LOAD_LEAVE_PAY_ITEM]: loadLeavePayItemModal,
  [LOAD_NEW_LEAVE_PAY_ITEM]: loadNewLeavePayItemModal,
  [CREATE_LEAVE_PAY_ITEM]: createLeavePayItemModal,
  [UPDATE_LEAVE_PAY_ITEM]: updatedLeavePayItemModal,
};

export default EmployeeListMapping;
