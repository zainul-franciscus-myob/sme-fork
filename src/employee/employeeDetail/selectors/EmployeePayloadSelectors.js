import { getPayHistoryDetailsPayload } from './PayrollPayHistorySelectors';
import { getStandardPayDetailsPayload } from './PayrollStandardPaySelectors';

// Importing from getStandardPayDetailsPayload in EmployeeDetailSelector.js is causing
// webpack/ES6 module circular dependency issue.
// Thus this function has its own selector file to avoid
// 'Selector creators expect all input-selectors to be functions' error.
// eslint-disable-next-line import/prefer-default-export
export const getEmployeePayload = (state) => {
  const { contactDetail, payrollDetails, paymentDetails } = state;
  const standardPayDetails = getStandardPayDetailsPayload(state);
  const payHistoryDetails = getPayHistoryDetailsPayload(state);

  return ({
    contactDetail,
    payrollDetails: {
      ...payrollDetails,
      standardPayDetails,
      payHistoryDetails,
    },
    paymentDetails,
  });
};
