import {
  LOAD_ACCOUNT_BANKING,
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_PAYROLL,
  LOAD_PURCHASE,
  LOAD_SALES,
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
} from '../DashboardIntents';
import loadAccountBankingResponse from './data/loadAccountBankingResponse';
import loadDashboardResponse from './data/loadDashboardResponse';
import loadDefaultBankingResponse from './data/loadDefaultBankingResponse';
import loadPayrollResponse from './data/loadPayrollResponse';
import loadPurchaseResponse from './data/loadPurchaseResponse';
import loadSalesResponse from './data/loadSalesResponse';
import loadTrackingDetailResponse from './data/loadTrackingDetailResponse';
import loadTrackingResponse from './data/loadTrackingResponse';

const MemoryDashboardMapping = {
  [LOAD_DASHBOARD]: ({ onSuccess }) => onSuccess(loadDashboardResponse),
  [LOAD_SALES]: ({ onSuccess }) => onSuccess(loadSalesResponse),
  [LOAD_PURCHASE]: ({ onSuccess }) => onSuccess(loadPurchaseResponse),
  [LOAD_TRACKING]: ({ onSuccess }) => onSuccess(loadTrackingResponse),
  [LOAD_TRACKING_DETAIL]: ({ onSuccess }) => onSuccess(loadTrackingDetailResponse),
  [LOAD_DEFAULT_BANKING]: ({ onSuccess }) => onSuccess(loadDefaultBankingResponse),
  [LOAD_ACCOUNT_BANKING]: ({ onSuccess }) => onSuccess(loadAccountBankingResponse),
  [LOAD_PAYROLL]: ({ onSuccess }) => onSuccess(loadPayrollResponse),
};

export default MemoryDashboardMapping;
