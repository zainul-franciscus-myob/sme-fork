import {
  DOWNLOAD_PDF,
  LOAD_CUSTOMER_STATEMENTS,
  SEND_EMAIL,
  SORT_AND_FILTER_CUSTOMER_STATEMENTS,
} from '../CustomerStatementIntents';

const HttpCustomerStatementMapping = {
  [LOAD_CUSTOMER_STATEMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/customerStatement/load_customer_statements`,
  },
  [SORT_AND_FILTER_CUSTOMER_STATEMENTS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/customerStatement/sort_and_filter_customer_statements`,
  },
  [DOWNLOAD_PDF]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/customerStatement/download_pdf`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/customerStatement/send_email`,
  },
};

export default HttpCustomerStatementMapping;
