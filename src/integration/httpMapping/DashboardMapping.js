import { LOAD_DASHBOARD, LOAD_SALES } from '../../dashboard/DashboardIntents';

const DashboardMapping = {
  [LOAD_DASHBOARD]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_dashboard`,
  },
  [LOAD_SALES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_sales`,
  },
};

export default DashboardMapping;
