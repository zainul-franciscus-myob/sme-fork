import {
  CLOSE_TASK,
  CREATE_IN_TRAY_DOCUMENT,
  LOAD_ACCOUNT_BANKING,
  LOAD_DASHBOARD,
  LOAD_DEFAULT_BANKING,
  LOAD_IN_TRAY,
  LOAD_PAYROLL,
  LOAD_PAYROLL_REPORTS,
  LOAD_PURCHASE,
  LOAD_SALES,
  LOAD_TASKS,
  LOAD_TRACKING,
  LOAD_TRACKING_DETAIL,
} from '../DashboardIntents';

const HttpDashboardMapping = {
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
  [LOAD_TRACKING]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_tracking`,
  },
  [LOAD_TRACKING_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, financialYear }) =>
      `/${businessId}/dashboard/load_tracking_detail/${financialYear}`,
  },
  [LOAD_DEFAULT_BANKING]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/dashboard/load_default_banking`,
  },
  [LOAD_ACCOUNT_BANKING]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/dashboard/load_account_banking`,
  },
  [LOAD_PAYROLL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_payroll`,
  },
  [LOAD_PAYROLL_REPORTS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/dashboard/load_payroll_reports`,
  },
  [LOAD_IN_TRAY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_inTray`,
  },
  [CREATE_IN_TRAY_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/inTray/create_in_tray_document`,
  },
  [LOAD_TASKS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/dashboard/load_tasks`,
  },
  [CLOSE_TASK]: {
    method: 'POST',
    getPath: ({ businessId, closeEvent }) =>
      `/${businessId}/dashboard/update_with_event/${closeEvent}`,
  },
};

export default HttpDashboardMapping;
