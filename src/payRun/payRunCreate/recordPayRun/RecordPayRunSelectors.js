import formatIsoDate from '../../../valueFormatters/formatDate/formatIsoDate';

export const getNumberOfSelected = state => (
  state.employeePayList.lines.filter(line => line.isSelected).length
);

const getPaymentInformation = state => ({
  paymentFrequency: state.startPayRun.paymentFrequency,
  paymentDate: state.startPayRun.paymentDate,
  payPeriodStart: state.startPayRun.payPeriodStart,
  payPeriodEnd: state.startPayRun.payPeriodEnd,
});

export const getRecordPayContents = state => ({
  dateOccurred: formatIsoDate(new Date()),
  employeePayLines: state.employeePayList.lines.filter(line => line.isSelected),
  ...getPaymentInformation(state),
});
