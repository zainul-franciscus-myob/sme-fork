import { UPDATE_WAGE_DETAIL } from '../EmployeeDetailNzIntents';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const updateWageDetails = (state, action) => {
  const newAction = action;

  if (action.shouldFormat === true) {
    newAction.value = formatNumberWithDecimalScaleRange(action.value, 2, 4);
  }

  return {
    ...state,
    isPageEdited: true,
    payrollDetails: {
      ...state.payrollDetails,
      wage: {
        ...state.payrollDetails.wage,
        [newAction.key]: newAction.value,
      },
    },
  };
};

export default {
  [UPDATE_WAGE_DETAIL]: updateWageDetails,
};
