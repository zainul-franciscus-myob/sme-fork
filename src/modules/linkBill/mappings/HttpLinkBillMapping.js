import {
  LINK_DOCUMENT_TO_BILL,
  LOAD_LINK_BILL,
  SORT_AND_FILTER_BILL_LIST,
} from '../LinkBillIntents';

const HttpLinkBillMapping = {
  [LOAD_LINK_BILL]: {
    method: 'GET',
    getPath: ({ businessId, documentId }) =>
      `/${businessId}/linkBill/load_link_bill/${documentId}`,
  },
  [SORT_AND_FILTER_BILL_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/linkBill/sort_and_filter_bill_list`,
  },
  [LINK_DOCUMENT_TO_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/linkBill/create_linked_document`,
  },
};

export default HttpLinkBillMapping;
