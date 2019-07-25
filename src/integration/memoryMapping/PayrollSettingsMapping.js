import {
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_SUPER_FUND_LIST,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
} from '../../payrollSettings/PayrollSettingsIntents';
import filteredEmployeeClassificationListResponse from '../data/payrollSettings/filteredEmploymentClassificationList';
import filteredSuperFundListResponse from '../data/payrollSettings/filteredSuperannuationList';
import loadEmployeeClassificationListResponse from '../data/payrollSettings/employmentClassificationList';
import loadSuperFundListResponse from '../data/payrollSettings/superannuationList';

const loadSuperFundList = ({ onSuccess }) => onSuccess(loadSuperFundListResponse);
const filteredSuperFundList = ({ onSuccess }) => onSuccess(filteredSuperFundListResponse);
const loadEmployeeClassificationList = ({ onSuccess }) => onSuccess(
  loadEmployeeClassificationListResponse,
);
const filteredEmployeeClassificationList = ({ onSuccess }) => onSuccess(
  filteredEmployeeClassificationListResponse,
);

const PayrollSettingsMapping = {
  [LOAD_SUPER_FUND_LIST]: loadSuperFundList,
  [SORT_AND_FILTER_SUPER_FUND_LIST]: filteredSuperFundList,
  [LOAD_EMPLOYMENT_CLASSIFICATION_LIST]: loadEmployeeClassificationList,
  [SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST]: filteredEmployeeClassificationList,
};

export default PayrollSettingsMapping;
