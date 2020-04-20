import { GET_SERIAL_NUMBER } from '../bankingLearnIntents';
import loadBankFeedsResponse from './data/loadBankFeeds';

const loadSerialNumber = ({ onSuccess }) => onSuccess(loadBankFeedsResponse);

const MemoryBankFeedsMapping = {
  [GET_SERIAL_NUMBER]: loadSerialNumber,
};

export default MemoryBankFeedsMapping;
