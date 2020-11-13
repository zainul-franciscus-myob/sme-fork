import {
  GET_BANK_FEEDS_ACCESS,
  GET_SERIAL_NUMBER,
} from '../bankingLearnIntents';
import loadBankFeedsResponse from './data/loadBankFeeds.json';

const loadSerialNumber = ({ onSuccess }) => onSuccess(loadBankFeedsResponse);

const MemoryBankFeedsMapping = {
  [GET_SERIAL_NUMBER]: loadSerialNumber,
  [GET_BANK_FEEDS_ACCESS]: () => true,
};

export default MemoryBankFeedsMapping;
