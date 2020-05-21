import { LOAD_BANK_FEED_APPLICATION_DATA, SUBMIT_BANK_FEED_APPLICATION } from '../BankFeedsApplyIntents';
import bankFeeds from './data/bankFeeds.json';

const MemoryBankFeedsCreateMapping = {
  [LOAD_BANK_FEED_APPLICATION_DATA]: ({ onSuccess }) => onSuccess(bankFeeds),
  [SUBMIT_BANK_FEED_APPLICATION]: ({ onSuccess }) => onSuccess({
    message: "Great Work! You've done it well!",
  }),
};

export default MemoryBankFeedsCreateMapping;
