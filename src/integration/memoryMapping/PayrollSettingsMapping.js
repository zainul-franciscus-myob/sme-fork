import {
  CREATE_EMPLOYMENT_CLASSIFICATION,
  DELETE_EMPLOYMENT_CLASSIFICATION,
  LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_GENERAL_PAYROLL_INFORMATION,
  LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_SUPER_FUND_LIST,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
  UPDATE_EMPLOYMENT_CLASSIFICATION,
  UPDATE_GENERAL_PAYROLL_INFORMATION,
} from '../../payrollSettings/PayrollSettingsIntents';
import filteredEmployeeClassificationListResponse from '../data/payrollSettings/filteredEmploymentClassificationList';
import filteredSuperFundListResponse from '../data/payrollSettings/filteredSuperannuationList';
import loadEmployeeClassificationListResponse from '../data/payrollSettings/employmentClassificationList';
import loadEmploymentClassificationDetailResponse from '../data/payrollSettings/loadEmploymentClassificationDetailResponse';
import loadGeneralPayrollInformationResponse from '../data/payrollSettings/loadGeneralPayrollInformationResponse';
import loadNewEmploymentClassificationDetailResponse from '../data/payrollSettings/loadNewEmploymentClassificationDetailResponse';
import loadSuperFundListResponse from '../data/payrollSettings/superannuationList';
import successResponse from '../data/success.json';

const loadSuperFundList = ({ onSuccess }) => onSuccess(loadSuperFundListResponse);
const filteredSuperFundList = ({ onSuccess }) => onSuccess(filteredSuperFundListResponse);
const loadEmployeeClassificationList = ({ onSuccess }) => onSuccess(
  loadEmployeeClassificationListResponse,
);

const filteredEmployeeClassificationList = ({ onSuccess }) => onSuccess(
  filteredEmployeeClassificationListResponse,
);

const loadNewEmploymentClassificatonDetail = ({ onSuccess }) => onSuccess(
  loadNewEmploymentClassificationDetailResponse,
);

const loadEmploymentClassificationDetail = ({ onSuccess }) => onSuccess(
  loadEmploymentClassificationDetailResponse,
);

const loadGeneralPayrollInformationDetail = ({ onSuccess }) => onSuccess(
  loadGeneralPayrollInformationResponse,
);

const successfulRequest = ({ onSuccess }) => onSuccess(successResponse);

const PayrollSettingsMapping = {
  [LOAD_SUPER_FUND_LIST]: loadSuperFundList,
  [SORT_AND_FILTER_SUPER_FUND_LIST]: filteredSuperFundList,
  [LOAD_EMPLOYMENT_CLASSIFICATION_LIST]: loadEmployeeClassificationList,
  [SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST]: filteredEmployeeClassificationList,
  [LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL]: loadNewEmploymentClassificatonDetail,
  [LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL]: loadEmploymentClassificationDetail,
  [CREATE_EMPLOYMENT_CLASSIFICATION]: successfulRequest,
  [UPDATE_EMPLOYMENT_CLASSIFICATION]: successfulRequest,
  [DELETE_EMPLOYMENT_CLASSIFICATION]: successfulRequest,
  [LOAD_GENERAL_PAYROLL_INFORMATION]: loadGeneralPayrollInformationDetail,
  [UPDATE_GENERAL_PAYROLL_INFORMATION]: successfulRequest,
};

export default PayrollSettingsMapping;
