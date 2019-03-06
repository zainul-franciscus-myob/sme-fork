import { LOAD_TAX_LIST } from '../../tax/TaxIntents';
import loadTaxListResponse from '../data/tax/loadTaxList';

const loadTaxList = ({ onSuccess }) => onSuccess(loadTaxListResponse);

const TaxMapping = {
  [LOAD_TAX_LIST]: loadTaxList,
};

export default TaxMapping;
