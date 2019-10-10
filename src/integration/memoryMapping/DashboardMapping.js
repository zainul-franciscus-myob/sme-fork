import { LOAD_DASHBOARD, LOAD_SALES } from '../../dashboard/DashboardIntents';
import loadDashboardResponse from '../data/dashboard/loadDashboardResponse';
import loadSalesResponse from '../data/dashboard/loadSalesResponse';

const DashboardMapping = {
  [LOAD_DASHBOARD]: ({ onSuccess }) => onSuccess(loadDashboardResponse),
  [LOAD_SALES]: ({ onSuccess }) => onSuccess(loadSalesResponse),
};

export default DashboardMapping;
