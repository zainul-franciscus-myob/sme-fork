import { LOAD_SUPER_FUND_LIST, SORT_AND_FILTER_SUPER_FUND_LIST } from '../../payrollSettings/PayrollSettingsIntents';
import filteredSuperFundListResponse from '../data/payrollSettings/filteredSuperannuationList';
import loadSuperFundListResponse from '../data/payrollSettings/superannuationList';

const loadSuperFundList = ({ onSuccess }) => onSuccess(loadSuperFundListResponse);
const filteredSuperFundList = ({ onSuccess }) => onSuccess(filteredSuperFundListResponse);

const PayrollSettingsMapping = {
  [LOAD_SUPER_FUND_LIST]: loadSuperFundList,
  [SORT_AND_FILTER_SUPER_FUND_LIST]: filteredSuperFundList,
};

export default PayrollSettingsMapping;
