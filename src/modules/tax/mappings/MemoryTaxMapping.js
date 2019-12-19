import { LOAD_TAX_LIST } from '../TaxIntents';
import loadTaxListResponse from './data/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);

const MemoryTaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
};

export default MemoryTaxMapping;
