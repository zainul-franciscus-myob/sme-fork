import {
  GET_BANK_FEEDS_ACCESS,
  GET_SERIAL_NUMBER,
} from '../bankingLearnIntents';

const HttpBankLearnsMapping = {
  [GET_BANK_FEEDS_ACCESS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/can_use_new_flow`,
  },
  [GET_SERIAL_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/load_bank_feeds`,
  },
};

export default HttpBankLearnsMapping;
