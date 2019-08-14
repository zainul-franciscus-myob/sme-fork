import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE,
  CREATE_SUPER_FUND,
  CREATE_SUPER_PAY_ITEM_MODAL,
  DELETE_EMPLOYEE,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_EMPLOYEE_LIST,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_NEW_SUPER_PAY_ITEM_MODAL,
  LOAD_SUPER_PAY_ITEM_MODAL,
  LOAD_TAX_PAY_ITEM_MODAL,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_EMPLOYEE,
  UPDATE_SUPER_PAY_ITEM_MODAL,
  UPDATE_TAX_PAY_ITEM_MODAL,
} from '../../employee/EmployeeIntents';
import abnDetail from '../data/payrollSettings/abnDetail';
import createDeductionPayItemModalResponse from '../data/employee/createDeductionPayItemModalResponse';
import createSuperFundModalResponse from '../data/employee/createSuperFundModalResponse';
import createSuperPayItemModalResponse from '../data/employee/createSuperPayItemModalResponse';
import employeeDetailLoadResponse from '../data/employee/employeeDetailEntry';
import employeeListFilterResponse from '../data/employee/filterEmployeeList';
import employeeListResponse from '../data/employee/employeeList';
import loadDeductionPayItemModalResponse from '../data/employee/loadDeductionPayItemModalResponse';
import loadNewDeductionPayItemModalResponse from '../data/employee/loadNewDeductionPayItemModalResponse';
import loadNewSuperPayItemModalResponse from '../data/employee/loadNewSuperPayItemModalResponse';
import loadSuperPayItemModalResponse from '../data/employee/loadSuperPayItemModalResponse';
import newEmployeeDetailResponse from '../data/employee/employeeDetailNewEntry';
import successEmployeeCreateResponse from '../data/employee/employeeCreateResponse';
import successResponse from '../data/success';
import superFundNewDetail from '../data/superFund/superFundNewDetail';
import taxPayItemResponse from '../data/payItem/tax/loadTaxPayItem';
import updateDeductionPayItemModalResponse from '../data/employee/updatedDeductionPayItemModalResponse';
import updateSuperPayItemModalResponse from '../data/employee/updateSuperPayItemModalResponse';

const loadEmployeeList = ({ onSuccess }) => { onSuccess(employeeListResponse); };

const sortAndFilterEmployeeList = ({ onSuccess }) => { onSuccess(employeeListFilterResponse); };

const loadEmployeeDetail = ({ onSuccess }) => { onSuccess(employeeDetailLoadResponse); };

const loadNewEmployeeDetail = ({ onSuccess }) => { onSuccess(newEmployeeDetailResponse); };

const updateEmployee = ({ onSuccess }) => { onSuccess(successResponse); };

const deleteEmployee = ({ onSuccess }) => { onSuccess(successResponse); };

const createEmployee = ({ onSuccess }) => { onSuccess(successEmployeeCreateResponse); };

const loadTaxPayItemModalDetails = ({ onSuccess }) => onSuccess(taxPayItemResponse);

const updateTaxPayItemModalDetails = ({ onSuccess }) => onSuccess(successResponse);

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

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [LOAD_NEW_EMPLOYEE_DETAIL]: loadNewEmployeeDetail,
  [UPDATE_EMPLOYEE]: updateEmployee,
  [DELETE_EMPLOYEE]: deleteEmployee,
  [CREATE_EMPLOYEE]: createEmployee,
  [LOAD_TAX_PAY_ITEM_MODAL]: loadTaxPayItemModalDetails,
  [UPDATE_TAX_PAY_ITEM_MODAL]: updateTaxPayItemModalDetails,
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
};

export default EmployeeListMapping;
