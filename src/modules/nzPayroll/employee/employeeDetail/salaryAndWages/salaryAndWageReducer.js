import {
  FORMAT_DECIMAL_PLACES,
  UPDATE_WAGE_DETAIL,
} from './salaryAndWagesIntents';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const setWageDetails = (state, partialWage) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    wage: {
      ...state?.payrollDetails?.wage,
      ...partialWage,
    },
  },
});

const updateWageDetails = (state, { key, value }) => {
  const partialWageDetails = {
    [key]: value,
  };
  return setWageDetails(state, partialWageDetails);
};

const formatDecimalPlaces = (state, { key, value }) => {
  const partialWage = {
    [key]: formatNumberWithDecimalScaleRange(value, 2, 4),
  };
  return setWageDetails(state, partialWage);
};

export default {
  [UPDATE_WAGE_DETAIL]: updateWageDetails,
  [FORMAT_DECIMAL_PLACES]: formatDecimalPlaces,
};
