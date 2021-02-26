import {
  COMBINE,
  LOAD_TAX_COMBINE,
  LOAD_TAX_DETAIL,
  LOAD_TAX_LIST,
  SAVE_TAX_DETAIL,
} from '../TaxIntents';
import loadTaxCombineResponse from './data/loadTaxCombine';
import loadTaxDetailResponse from './data/loadTaxDetail';
import loadTaxListResponse from './data/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);
const loadTaxDetail = ({ onSuccess }) => onSuccess(loadTaxDetailResponse);
const loadTaxCombine = ({ onSuccess }) => onSuccess(loadTaxCombineResponse);

const MemoryTaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
  [LOAD_TAX_DETAIL]: loadTaxDetail,
  [SAVE_TAX_DETAIL]: ({ onSuccess }) => {
    setTimeout(() => onSuccess({ message: 'well done' }), 500);
  },
  [LOAD_TAX_COMBINE]: loadTaxCombine,
  [COMBINE]: ({ onSuccess }) => {
    setTimeout(
      () => onSuccess({ message: 'Successfully combined tax codes' }),
      500
    );
  },
};

export default MemoryTaxMapping;
