import { UPDATE_WAGE_DETAIL } from './salaryAndWagesIntents';

const createSalaryAndWageDispatcher = store => ({
  updateWageDetail: ({ key, value }) => {
    const intent = UPDATE_WAGE_DETAIL;
    store.dispatch({ intent, key, value });
  },
});

export default createSalaryAndWageDispatcher;
