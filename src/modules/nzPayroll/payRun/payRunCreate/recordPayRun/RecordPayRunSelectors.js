import formatIsoDate from '../../../../../common/valueFormatters/formatDate/formatIsoDate';

const getSelected = (state) =>
  state.employeePayList.lines.filter((line) => line.isSelected);

export const getNumberOfSelected = (state) => getSelected(state).length;

const getPaymentInformation = (state) => ({
  paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
  paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
  payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
  payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
});

export const getPayRunId = (state) => state.payRunId;

export const getRecordPayContents = (state) => ({
  payRunId: getPayRunId(state),
  dateOccurred: formatIsoDate(new Date()),
  employeePayLines: getSelected(state),
  ...getPaymentInformation(state),
});
