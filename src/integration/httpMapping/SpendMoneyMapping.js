import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  GET_CALCULATED_TOTALS,
  LINK_IN_TRAY_DOCUMENT,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL,
  OPEN_ATTACHMENT,
  PREFILL_DATA_FROM_IN_TRAY,
  REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY,
  UPLOAD_ATTACHMENT,
} from '../../spendMoney/SpendMoneyIntents';

const SpendMoneyMapping = {
  [LOAD_NEW_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/load_new_spend_money`,
  },
  [LOAD_SPEND_MONEY_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/load_spend_money_detail/${spendMoneyId}`,
  },
  [CREATE_SPEND_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/create_spend_money`,
  },
  [DELETE_SPEND_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/delete_spend_money_detail/${spendMoneyId}`,
  },
  [UPDATE_SPEND_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, spendMoneyId }) => `/${businessId}/spendMoney/update_spend_money_detail/${spendMoneyId}`,
  },
  [LOAD_REFERENCE_ID]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/get_reference_id`,
  },
  [GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/calculate_totals`,
  },
  [UPLOAD_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/upload_attachment`,
  },
  [REMOVE_ATTACHMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, documentId }) => `/${businessId}/spendMoney/delete_attachment/${documentId}`,
  },
  [OPEN_ATTACHMENT]: {
    method: 'GET',
    getPath: ({ businessId, documentId }) => `/${businessId}/spendMoney/load_attachment_detail/${documentId}`,
  },
  [DOWNLOAD_IN_TRAY_DOCUMENT]: {
    method: 'GET',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/spendMoney/download_in_tray_document/${inTrayDocumentId}`,
  },
  [PREFILL_DATA_FROM_IN_TRAY]: {
    method: 'GET',
    getPath: ({ businessId, inTrayDocumentId }) => `/${businessId}/spendMoney/prefill_bill_from_in_tray/${inTrayDocumentId}`,
  },
  [LINK_IN_TRAY_DOCUMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/spendMoney/link_in_tray_document`,
  },
};

export default SpendMoneyMapping;
