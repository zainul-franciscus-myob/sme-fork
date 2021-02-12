import formatDateTime from '../../../../../common/valueFormatters/formatDate/formatDateTime';

export const getPayrollYears = (state) => state.eiSubmissions.payrollYears;
export const getSelectedPayrollYear = (state) =>
  state.eiSubmissions.selectedPayrollYear;
export const getIsTableLoading = (state) => state.eiSubmissions.isTableLoading;

const getStatusColour = (status) => {
  const colourMap = {
    'Not submitted': 'orange',
    Submitting: 'blue',
    Submitted: 'green',
    Error: 'red',
    Rejected: 'red',
  };

  return {
    label: status,
    colour: colourMap[status],
  };
};

export const getPayRuns = (state) =>
  state.eiSubmissions.payRuns.map((payRun) => ({
    ...payRun,
    status: getStatusColour(payRun.status),
    dateRecorded: formatDateTime(payRun.dateRecorded),
  }));

export const getFilterEiSubmissionsParams = (state) => {
  const selectedYear = getSelectedPayrollYear(state);
  const yearObj = getPayrollYears(state).find(
    ({ year }) => year === selectedYear
  );

  return {
    startDate: yearObj.startDate,
    endDate: yearObj.endDate,
  };
};
