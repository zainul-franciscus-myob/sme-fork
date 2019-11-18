import { DELETE_BANK_FEED, LOAD_BANK_FEEDS, SAVE_BANK_FEEDS } from '../../bankFeeds/BankFeedsIntents';
import loadBankFeedsResponse from '../data/bankFeeds/loadBankFeeds';
import successResponse from '../data/success';

const loadBankFeeds = ({ onSuccess }) => onSuccess(loadBankFeedsResponse);
const saveBankFeeds = ({ onSuccess }) => onSuccess(successResponse);
const deleteBankFeed = ({ onSuccess }) => onSuccess(successResponse);

const BankFeedsMapping = {
  [LOAD_BANK_FEEDS]: loadBankFeeds,
  [SAVE_BANK_FEEDS]: saveBankFeeds,
  [DELETE_BANK_FEED]: deleteBankFeed,
};

export default BankFeedsMapping;
