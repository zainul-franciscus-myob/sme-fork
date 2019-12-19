import { DELETE_BANK_FEED, LOAD_BANK_FEEDS, SAVE_BANK_FEEDS } from '../BankFeedsIntents';
import loadBankFeedsResponse from './data/loadBankFeeds';
import successResponse from './data/success.json';

const loadBankFeeds = ({ onSuccess }) => onSuccess(loadBankFeedsResponse);
const saveBankFeeds = ({ onSuccess }) => onSuccess(successResponse);
const deleteBankFeed = ({ onSuccess }) => onSuccess(successResponse);

const MemoryBankFeedsMapping = {
  [LOAD_BANK_FEEDS]: loadBankFeeds,
  [SAVE_BANK_FEEDS]: saveBankFeeds,
  [DELETE_BANK_FEED]: deleteBankFeed,
};

export default MemoryBankFeedsMapping;
