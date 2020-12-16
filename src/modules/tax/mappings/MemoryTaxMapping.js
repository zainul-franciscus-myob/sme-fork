import { LOAD_TAX_DETAIL, LOAD_TAX_LIST } from '../TaxIntents';
import loadTaxDetailResponse from './data/loadTaxDetail';
import loadTaxListResponse from './data/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);
const loadTaxDetail = ({ onSuccess }) => onSuccess(loadTaxDetailResponse);

const MemoryTaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
  [LOAD_TAX_DETAIL]: loadTaxDetail,
};

export default MemoryTaxMapping;
