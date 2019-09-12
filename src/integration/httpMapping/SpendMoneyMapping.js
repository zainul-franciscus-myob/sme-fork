import {
  CREATE_SPEND_MONEY,
  DELETE_SPEND_MONEY,
  GET_CALCULATED_TOTALS,
  LOAD_NEW_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SPEND_MONEY_DETAIL, OPEN_ATTACHMENT, REMOVE_ATTACHMENT,
  UPDATE_SPEND_MONEY, UPLOAD_ATTACHMENT,
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
};

export default SpendMoneyMapping;
