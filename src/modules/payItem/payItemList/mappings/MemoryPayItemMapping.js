import {
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_PAYROLL_SETTINGS,
  LOAD_SUPERANNUATION_LIST,
  LOAD_TAX_PAY_ITEM,
  LOAD_WAGES_LIST,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
  UPDATE_TAX_PAY_ITEM,
} from '../../PayItemIntents';
import deductionsListLoadResponse from './data/loadDeductionList';
import deductionsListSortResponse from './data/sortDeductionList';
import expensesListLoadResponse from './data/loadExpenseList';
import expensesListSortResponse from './data/sortExpenseList';
import leaveListLoadResponse from './data/loadLeaveList';
import leaveListSortResponse from './data/sortLeaveList';
import payrollSettings from './data/payrollSettings';
import success from './data/success';
import superannuationListLoadResponse from './data/loadSuperannuationList';
import superannuationListSortResponse from './data/sortSuperannuationList';
import taxPayItemResponse from './data/loadTaxPayItem';
import wagesListLoadResponse from './data/loadWageList';
import wagesListSortResponse from './data/sortWageList';

const loadWagesList = ({ onSuccess }) => onSuccess(wagesListLoadResponse);

const sortWagesList = ({ onSuccess }) => onSuccess(wagesListSortResponse);

const loadSuperannuationList = ({ onSuccess }) => onSuccess(superannuationListLoadResponse);

const sortSuperannuationList = ({ onSuccess }) => onSuccess(superannuationListSortResponse);

const loadLeaveList = ({ onSuccess }) => onSuccess(leaveListLoadResponse);

const sortLeaveList = ({ onSuccess }) => onSuccess(leaveListSortResponse);

const loadDeductionsList = ({ onSuccess }) => onSuccess(deductionsListLoadResponse);

const sortDeductionList = ({ onSuccess }) => onSuccess(deductionsListSortResponse);

const loadExpensesList = ({ onSuccess }) => onSuccess(expensesListLoadResponse);

const sortExpensesList = ({ onSuccess }) => onSuccess(expensesListSortResponse);

const loadTaxPayItem = ({ onSuccess }) => onSuccess(taxPayItemResponse);

const updateTaxPayItem = ({ onSuccess }) => onSuccess(success);

const loadPayrollSettings = ({ onSuccess }) => onSuccess(payrollSettings);

const MemoryPayItemMapping = {
  [LOAD_WAGES_LIST]: loadWagesList,
  [SORT_WAGES_LIST]: sortWagesList,
  [LOAD_SUPERANNUATION_LIST]: loadSuperannuationList,
  [SORT_SUPERANNUATION_LIST]: sortSuperannuationList,
  [LOAD_LEAVE_LIST]: loadLeaveList,
  [SORT_LEAVE_LIST]: sortLeaveList,
  [LOAD_DEDUCTIONS_LIST]: loadDeductionsList,
  [SORT_DEDUCTIONS_LIST]: sortDeductionList,
  [LOAD_EXPENSES_LIST]: loadExpensesList,
  [SORT_EXPENSES_LIST]: sortExpensesList,
  [LOAD_TAX_PAY_ITEM]: loadTaxPayItem,
  [UPDATE_TAX_PAY_ITEM]: updateTaxPayItem,
  [LOAD_PAYROLL_SETTINGS]: loadPayrollSettings,
};

export default MemoryPayItemMapping;
