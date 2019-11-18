import { DELETE_BANK_FEED, LOAD_BANK_FEEDS, SAVE_BANK_FEEDS } from '../../bankFeeds/BankFeedsIntents';

const LinkedAccountsMapping = {
  [LOAD_BANK_FEEDS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/load_bank_feeds`,
  },
  [SAVE_BANK_FEEDS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/update_bank_feeds`,
  },
  [DELETE_BANK_FEED]: {
    method: 'DELETE',
    getPath: ({ businessId, id }) => `/${businessId}/bankFeeds/delete_bank_feed/${id}`,
  },
};

export default LinkedAccountsMapping;
