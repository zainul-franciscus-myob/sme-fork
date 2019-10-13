import { LOAD_DASHBOARD, LOAD_PURCHASE, LOAD_SALES } from '../../dashboard/DashboardIntents';
import loadDashboardResponse from '../data/dashboard/loadDashboardResponse';
import loadPurchaseResponse from '../data/dashboard/loadPurchaseResponse';
import loadSalesResponse from '../data/dashboard/loadSalesResponse';

const DashboardMapping = {
  [LOAD_DASHBOARD]: ({ onSuccess }) => onSuccess(loadDashboardResponse),
  [LOAD_SALES]: ({ onSuccess }) => onSuccess(loadSalesResponse),
  [LOAD_PURCHASE]: ({ onSuccess }) => onSuccess(loadPurchaseResponse),
};

export default DashboardMapping;
