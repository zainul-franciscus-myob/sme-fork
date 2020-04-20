import { GET_SERIAL_NUMBER } from '../bankingLearnIntents';

const HttpBankLearnsMapping = {
  [GET_SERIAL_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/bankFeeds/load_bank_feeds`,
  },
};

export default HttpBankLearnsMapping;
