import {
  DELETE_BANK_FEED,
  GET_BANK_FEEDS_ACCESS,
  LOAD_BANK_FEEDS,
  LOAD_BANK_FEEDS_V2,
  REFRESH_BANK_FEEDS,
  SAVE_BANK_FEEDS,
} from '../BankFeedsIntents';
import loadBankFeedsResponse from './data/loadBankFeeds';
import successResponse from './data/success.json';

const loadBankFeeds = ({ onSuccess }) => onSuccess(loadBankFeedsResponse);
const saveBankFeeds = ({ onSuccess }) => onSuccess(successResponse);
const deleteBankFeed = ({ onSuccess }) => onSuccess(successResponse);
const refreshBankFeeds = ({ onSuccess }) => onSuccess(successResponse);
const getBankFeedsAccess = ({ onSuccess }) => onSuccess(true);

const MemoryBankFeedsMapping = {
  [LOAD_BANK_FEEDS]: loadBankFeeds,
  [LOAD_BANK_FEEDS_V2]: loadBankFeeds,
  [SAVE_BANK_FEEDS]: saveBankFeeds,
  [DELETE_BANK_FEED]: deleteBankFeed,
  [REFRESH_BANK_FEEDS]: refreshBankFeeds,
  [GET_BANK_FEEDS_ACCESS]: getBankFeedsAccess,
};

export default MemoryBankFeedsMapping;
