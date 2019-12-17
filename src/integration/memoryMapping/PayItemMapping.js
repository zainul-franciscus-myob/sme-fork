import {
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_SUPERANNUATION_LIST,
  LOAD_TAX_PAY_ITEM,
  LOAD_WAGES_LIST,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
  UPDATE_TAX_PAY_ITEM,
} from '../../modules/payItem/PayItemIntents';
import deductionsListLoadResponse from '../data/payItem/deduction/loadDeductionList';
import deductionsListSortResponse from '../data/payItem/deduction/sortDeductionList';
import expensesListLoadResponse from '../data/payItem/expense/loadExpenseList';
import expensesListSortResponse from '../data/payItem/expense/sortExpenseList';
import leaveListLoadResponse from '../data/payItem/leave/loadLeaveList';
import leaveListSortResponse from '../data/payItem/leave/sortLeaveList';
import success from '../data/success';
import superannuationListLoadResponse from '../data/payItem/superannuation/loadSuperannuationList';
import superannuationListSortResponse from '../data/payItem/superannuation/sortSuperannuationList';
import taxPayItemResponse from '../data/payItem/tax/loadTaxPayItem';
import wagesListLoadResponse from '../data/payItem/wage/loadWageList';
import wagesListSortResponse from '../data/payItem/wage/sortWageList';

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

const PayItemListMapping = {
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
};

export default PayItemListMapping;
