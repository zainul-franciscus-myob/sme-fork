import {
  LOAD_ACCOUNT_BANKING, LOAD_DASHBOARD, LOAD_DEFAULT_BANKING, LOAD_PURCHASE, LOAD_SALES,
} from '../../dashboard/DashboardIntents';

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
  [LOAD_DEFAULT_BANKING]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_default_banking`,
  },
  [LOAD_ACCOUNT_BANKING]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_account_banking`,
  },
};

export default DashboardMapping;
