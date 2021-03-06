import {
  LOAD_INCOME_ALLOCATION,
  SAVE_INCOME_ALLOCATION,
} from '../IncomeAllocationIntents';

const HttpIncomeAllocationMapping = {
  [LOAD_INCOME_ALLOCATION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/incomeAllocation/load_income_allocation`,
  },
  [SAVE_INCOME_ALLOCATION]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/incomeAllocation/update_income_allocation`,
  },
};

export default HttpIncomeAllocationMapping;
