import { LOAD_TAX_DETAIL, LOAD_TAX_LIST, SAVE_TAX_DETAIL } from '../TaxIntents';
import loadTaxDetailResponse from './data/loadTaxDetail';
import loadTaxListResponse from './data/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);
const loadTaxDetail = ({ onSuccess }) => onSuccess(loadTaxDetailResponse);

const MemoryTaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
  [LOAD_TAX_DETAIL]: loadTaxDetail,
  [SAVE_TAX_DETAIL]: ({ onSuccess }) => {
    setTimeout(() => onSuccess({ message: 'well done' }), 500);
  },
};

export default MemoryTaxMapping;
