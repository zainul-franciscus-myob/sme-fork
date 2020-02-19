import { LOAD_TAX_TABLE_RESULT } from '../taxTableCalculationModalIntents';
import loadTaxTableResultResponse from './data/loadTaxTableResult';

const loadTaxTableResult = ({ onSuccess }) => onSuccess(loadTaxTableResultResponse);

const TaxTableCalculationsMapping = {
  [LOAD_TAX_TABLE_RESULT]: loadTaxTableResult,
};

export default TaxTableCalculationsMapping;
