import {
  LOAD_REMITTANCE_ADVICE_LIST,
  SORT_AND_FILTER_REMITTANCE_ADVICE_LIST,
} from '../RemittanceAdviceIntents';
import remittanceAdvices from './data/loadRemittanceAdvices.json';
import sortedRemittanceAdviceList from './data/sortedRemittanceAdviceList.json';

const loadRemittanceAdvices = ({ onSuccess }) => onSuccess(remittanceAdvices);
const sortRemittanceAdviceList = ({ onSuccess }) =>
  onSuccess(sortedRemittanceAdviceList);

const MemoryRemittanceAdviceMapping = {
  [LOAD_REMITTANCE_ADVICE_LIST]: loadRemittanceAdvices,
  [SORT_AND_FILTER_REMITTANCE_ADVICE_LIST]: sortRemittanceAdviceList,
};

export default MemoryRemittanceAdviceMapping;
