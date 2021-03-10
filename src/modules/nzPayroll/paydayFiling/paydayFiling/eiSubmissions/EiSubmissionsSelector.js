import { createSelector } from 'reselect';

import formatDateTime from '../../../../../common/valueFormatters/formatDate/formatDateTime';

const getEiSubmissionState = (state) => state.eiSubmissions;

export const getPayrollYears = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => eiSubmissions.payrollYears
);

export const getSelectedPayrollYear = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => eiSubmissions.selectedPayrollYear
);

export const getIsTableLoading = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => eiSubmissions.isTableLoading
);

export const getSelectedPayRunId = createSelector(
  getEiSubmissionState,
  (eiSubmissions) =>
    eiSubmissions.selectedPayRun ? eiSubmissions.selectedPayRun.id : ''
);

export const getHasSelectedPayRun = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => !!eiSubmissions.selectedPayRun
);

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

export const getPayRuns = createSelector(
  getEiSubmissionState,
  (eiSubmissions) =>
    eiSubmissions.payRuns.map((payRun) => ({
      ...payRun,
      status: getStatusColour(payRun.status),
      dateRecorded: formatDateTime(payRun.dateRecorded),
    }))
);

export const getSelectedPayRun = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => {
    const payRun = eiSubmissions.selectedPayRun;
    return payRun
      ? {
          ...payRun,
          status: getStatusColour(payRun.status),
          dateRecorded: formatDateTime(payRun.dateRecorded),
        }
      : {};
  }
);

export const getShouldDisplaySubmissionInfo = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => {
    return (
      !!eiSubmissions.selectedPayRun &&
      eiSubmissions.selectedPayRun.initialStatus !== 'Not submitted'
    );
  }
);

export const getShouldDisplaySubmitToIrButton = (state) =>
  getHasSelectedPayRun(state) &&
  (getSelectedPayRun(state).status.label === 'Not submitted' ||
    (getSelectedPayRun(state).status.label === 'Rejected' &&
      !getSelectedPayRun(state).submissionKey));

export const getDetailsLoadingState = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => eiSubmissions.detailsLoadingState
);

export const getDetailsAlertMessage = createSelector(
  getEiSubmissionState,
  (eiSubmissions) => eiSubmissions.detailsAlertMessage
);

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
