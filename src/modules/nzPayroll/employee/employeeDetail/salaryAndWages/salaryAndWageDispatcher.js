import {
  FORMAT_DECIMAL_PLACES,
  UPDATE_WAGE_DETAIL,
} from './salaryAndWagesIntents';

const salaryAndWageDispatcher = (store) => ({
  updateWageDetail: ({ key, value }) => {
    const intent = UPDATE_WAGE_DETAIL;
    store.dispatch({ intent, key, value });
  },
  formatDecimalPlaces: ({ key, value }) => {
    const intent = FORMAT_DECIMAL_PLACES;
    store.dispatch({ intent, key, value });
  },
});

export default salaryAndWageDispatcher;
