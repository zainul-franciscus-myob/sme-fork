import { createSelector } from 'reselect';

import { getBusinessId } from '../PayRunSelectors';
import EtpPayItemStpCategories from '../types/EtpPayItemStpCategory';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

export const getNumberOfSelected = (state) =>
  state.employeePayList.lines.filter((line) => line.isSelected).length;

const getPaymentInformation = (state) => ({
  paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
  paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
  payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
  payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
});

export const getIsRegisteredForStp = (state) =>
  state.stpRegistrationStatus === 'registered';
export const getPayRunId = (state) => state.payRunId;

const isEtpPayItem = ({ stpCategory }) =>
  EtpPayItemStpCategories.includes(stpCategory);
const isEmptyPayItem = ({ amount }) => Number(amount) === 0;
const isNonEmptyEtpLine = ({ payItems }) =>
  payItems.some((payItem) => isEtpPayItem(payItem) && !isEmptyPayItem(payItem));

const removeEtpCodeIfEmptyEtp = (line) =>
  !isNonEmptyEtpLine(line)
    ? {
        ...line,
        etpCode: undefined,
      }
    : line;

export const getRecordPayContents = (state) => ({
  payRunId: getPayRunId(state),
  dateOccurred: formatIsoDate(new Date()),
  employeePayLines: state.employeePayList.lines
    .filter((line) => line.isSelected)
    .map((line) => removeEtpCodeIfEmptyEtp(line)),
  ...getPaymentInformation(state),
  unprocessedTimesheetLines: state.unprocessedTimesheetLines,
});

export const getStpDeclarationContext = createSelector(
  getBusinessId,
  getPayRunId,
  (businessId, payRunId) => ({
    businessId,
    eventId: payRunId,
  })
);
