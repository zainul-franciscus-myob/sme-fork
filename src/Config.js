export default {
  INTEGRATION_TYPE: process.env.REACT_APP_INTEGRATION_TYPE,
  TELEMETRY_TYPE: process.env.REACT_APP_TELEMETRY_TYPE,
  LEAN_ENGAGE_TYPE: process.env.REACT_APP_LEAN_ENGAGE_TYPE,
  AUTHENTICATION_AUTHORITY: process.env.REACT_APP_AUTHENTICATION_AUTHORITY,
  AUTHENTICATION_WEB_CLIENT_ID:
    process.env.REACT_APP_AUTHENTICATION_WEB_CLIENT_ID,
  AUTHENTICATION_BFF_CLIENT_ID:
    process.env.REACT_APP_AUTHENTICATION_BFF_CLIENT_ID,
  BFF_BASE_URL: process.env.REACT_APP_BFF_BASE_URL,
  MY_REPORTS_URL: process.env.REACT_APP_MY_REPORTS_URL,
  MANAGE_BANK_FEEDS_BASE_URL: process.env.REACT_APP_MANAGE_BANK_FEEDS_BASE_URL,
  ONLINE_TAX_BASE_URL: process.env.REACT_APP_ONLINE_TAX_BASE_URL,
  LEAN_ENGAGE_APP_ID: process.env.REACT_APP_LEAN_ENGAGE_APP_ID,
  MY_MYOB_AU_URL: process.env.REACT_APP_MY_MYOB_AU_URL,
  MY_MYOB_NZ_URL: process.env.REACT_APP_MY_MYOB_NZ_URL,
  SELF_SERVICE_PORTAL_URL: process.env.REACT_APP_SELF_SERVICE_PORTAL_URL,
  CREATE_BUSINESS_URL_AU: process.env.REACT_APP_CREATE_BUSINESS_URL_AU,
  CREATE_BUSINESS_URL_NZ: process.env.REACT_APP_CREATE_BUSINESS_URL_NZ,
  SPLIT_IO_API_KEY: process.env.REACT_APP_SPLIT_IO_API_KEY,
  BANKFEED_PORTAL_URL: process.env.REACT_APP_BANKFEED_PORTAL_URL,
  MYOB_URL: process.env.REACT_APP_MYOB_URL,
  MYOB_TEAM_URL: process.env.REACT_APP_MYOB_TEAM_URL,
  GENESYS_CHAT:
    (process.env.REACT_APP_GENESYS_CHAT || 'false').toLowerCase() === 'true',
};
