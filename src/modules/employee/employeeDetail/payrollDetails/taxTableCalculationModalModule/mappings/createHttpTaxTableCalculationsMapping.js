import { LOAD_TAX_TABLE_RESULT } from '../taxTableCalculationModalIntents';

const TaxTableCalculationsMapping = {
  [LOAD_TAX_TABLE_RESULT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/tax_table_suggestion`,
  },
};

export default TaxTableCalculationsMapping;
