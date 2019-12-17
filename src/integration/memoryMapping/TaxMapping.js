import { LOAD_TAX_LIST } from '../../modules/tax/TaxIntents';
import loadTaxListResponse from '../data/tax/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);

const TaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
};

export default TaxMapping;
