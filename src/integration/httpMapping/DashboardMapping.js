import { LOAD_DASHBOARD, LOAD_PURCHASE, LOAD_SALES } from '../../dashboard/DashboardIntents';

const DashboardMapping = {
  [LOAD_DASHBOARD]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_dashboard`,
  },
  [LOAD_SALES]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_sales`,
  },
  [LOAD_PURCHASE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_purchase`,
  },
};

export default DashboardMapping;
