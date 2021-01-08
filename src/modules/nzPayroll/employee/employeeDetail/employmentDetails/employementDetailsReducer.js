import * as intents from '../EmployeeDetailNzIntents';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

// #region Employment
const updateEmploymentDetails = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      [key]: value,
    },
  },
});
// #endregion

// #region Tax
const setTaxDetails = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      [key]: value,
    },
  },
});

const updateTaxDetails = (state, action) => {
  const newAction = action;
  const oldState = state;

  if (action.key === 'irdNumberOnBlur') {
    const { irdNumber } = oldState.payrollDetails.tax;
    newAction.key = 'irdNumber';
    newAction.value =
      irdNumber.replace(/\s/g, '').length === 8 ? `0${irdNumber}` : irdNumber;
  }

  if (action.key === 'taxCode') {
    const DEFAULT_IRD_NUMBER = '000000000';
    if (action.value === 'ND') {
      oldState.payrollDetails.tax.irdNumber = DEFAULT_IRD_NUMBER;
    } else if (oldState.payrollDetails.tax.irdNumber === DEFAULT_IRD_NUMBER) {
      oldState.payrollDetails.tax.irdNumber = '';
    }
  }

  return setTaxDetails(oldState, newAction);
};
// #endregion

// #region KiwiSaver
const setKiwiSaverDetails = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    kiwiSaver: {
      ...state.payrollDetails.kiwiSaver,
      [key]: value,
    },
  },
});

const updateKiwiSaverDetails = (state, action) => {
  const newAction = action;
  if (action.key === 'employerContributionRateOnBlur') {
    newAction.key = 'employerContributionRate';
    newAction.value = formatNumberWithDecimalScaleRange(action.value, 2, 2);
  }
  return setKiwiSaverDetails(state, newAction);
};
// #endregion

export default {
  [intents.UPDATE_EMPLOYMENT_DETAIL]: updateEmploymentDetails,
  [intents.UPDATE_TAX_DETAIL]: updateTaxDetails,
  [intents.UPDATE_KIWISAVER_DETAIL]: updateKiwiSaverDetails,
};
