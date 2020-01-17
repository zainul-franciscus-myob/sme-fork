import { createSelector } from 'reselect';

import { getBusinessId } from '../PayRunSelectors';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getNumberOfSelected = state => (
  state.employeePayList.lines.filter(line => line.isSelected).length
);

const getPaymentInformation = state => ({
  paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
  paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
  payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
  payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
});

export const getIsRegisteredForStp = state => state.stpRegistrationStatus === 'registered';
export const getPayRunId = state => state.payRunId;

export const getRecordPayContents = state => ({
  payRunId: getPayRunId(state),
  dateOccurred: formatIsoDate(new Date()),
  employeePayLines: state.employeePayList.lines.filter(line => line.isSelected),
  ...getPaymentInformation(state),
});

export const getStpDeclarationContext = createSelector(
  getBusinessId,
  getPayRunId,
  (businessId, payRunId) => ({
    businessId,
    eventId: payRunId,
  }),
);
