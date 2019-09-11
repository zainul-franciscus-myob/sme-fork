import dateFormat from 'dateformat';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

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
  dateOccurred: convertToDateString(Date.now()),
  employeePayLines: state.employeePayList.lines,
  ...getPaymentInformation(state),
});
