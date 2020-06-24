import {
  GET_AUTHORITY_FORM,
  LOAD_BANK_FEED_APPLICATION_DATA,
  SUBMIT_BANK_FEED_APPLICATION,
} from '../BankFeedsApplyIntents';

const HttpBankFeedsCreateMapping = {
  [GET_AUTHORITY_FORM]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/create/authority_form`,
  },
  [LOAD_BANK_FEED_APPLICATION_DATA]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/create/load_bank_feed_application_data`,
  },
  [SUBMIT_BANK_FEED_APPLICATION]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/create/submit_bank_feed_application`,
  },
};

export default HttpBankFeedsCreateMapping;
