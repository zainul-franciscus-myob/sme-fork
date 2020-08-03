import {
  DELETE_BANK_FEED,
  GET_BANK_FEEDS_ACCESS,
  LOAD_BANK_FEEDS,
  LOAD_BANK_FEEDS_V2,
  REFRESH_BANK_FEEDS,
  SAVE_BANK_FEEDS,
} from '../BankFeedsIntents';

const HttpBankFeedsMapping = {
  [LOAD_BANK_FEEDS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/load_bank_feeds`,
  },
  [LOAD_BANK_FEEDS_V2]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/load_bank_feeds_V2`,
  },
  [SAVE_BANK_FEEDS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/update_bank_feeds`,
  },
  [DELETE_BANK_FEED]: {
    method: 'DELETE',
    getPath: ({ businessId, id }) =>
      `/${businessId}/bankFeeds/delete_bank_feed/${id}`,
  },
  [REFRESH_BANK_FEEDS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/refresh_bank_feeds`,
  },
  [GET_BANK_FEEDS_ACCESS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/can_use_new_flow`,
  },
};

export default HttpBankFeedsMapping;
