import { LOAD_TAX_TABLE_RESULT } from '../taxTableCalculationModalIntents';

const TaxTableCalculationsMapping = {
  [LOAD_TAX_TABLE_RESULT]: {
    method: 'GET',
    getPath: ({ businessId }) => `${businessId}/employees/tax-table-suggestion`,
  },
};

export default TaxTableCalculationsMapping;
