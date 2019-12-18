import {
  LOAD_ACCOUNT_BANKING,
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_PURCHASE,
  LOAD_SALES,
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
} from '../../modules/dashboard/DashboardIntents';
import loadAccountBankingResponse from '../data/dashboard/loadAccountBankingResponse';
import loadDashboardResponse from '../data/dashboard/loadDashboardResponse';
import loadDefaultBankingResponse from '../data/dashboard/loadDefaultBankingResponse';
import loadPurchaseResponse from '../data/dashboard/loadPurchaseResponse';
import loadSalesResponse from '../data/dashboard/loadSalesResponse';
import loadTrackingDetailResponse from '../data/dashboard/loadTrackingDetailResponse';
import loadTrackingResponse from '../data/dashboard/loadTrackingResponse';

const DashboardMapping = {
  [LOAD_DASHBOARD]: ({ onSuccess }) => onSuccess(loadDashboardResponse),
  [LOAD_SALES]: ({ onSuccess }) => onSuccess(loadSalesResponse),
  [LOAD_PURCHASE]: ({ onSuccess }) => onSuccess(loadPurchaseResponse),
  [LOAD_TRACKING]: ({ onSuccess }) => onSuccess(loadTrackingResponse),
  [LOAD_TRACKING_DETAIL]: ({ onSuccess }) => onSuccess(loadTrackingDetailResponse),
  [LOAD_DEFAULT_BANKING]: ({ onSuccess }) => onSuccess(loadDefaultBankingResponse),
  [LOAD_ACCOUNT_BANKING]: ({ onSuccess }) => onSuccess(loadAccountBankingResponse),
};

export default DashboardMapping;
