import formatDateTime from '../../../../common/valueFormatters/formatDate/formatDateTime';

export const getBusinessId = state => state.businessId;
export const getLoadingState = state => state.loadingState;
export const getIsTableLoading = state => state.isTableLoading;
export const getDetailsLoadingState = state => state.detailsLoadingState;
export const getPayrollYears = state => state.payrollYears;
export const getSelectedPayrollYear = state => state.selectedPayrollYear;
export const getHasPayEventSelected = state => !!state.selectedPayEvent;

const getStatusColor = (status) => {
  const colorMap = {
    'Not sent': 'orange',
    Sending: 'blue',
    Sent: 'blue',
    Accepted: 'green',
    'Accepted with errors': 'orange',
    Failed: 'red',
    Rejected: 'red',
  };

  return ({
    label: status,
    color: colorMap[status],
  });
};

export const getPayEvents = state => state.payEvents.map(payEvent => ({
  ...payEvent,
  status: getStatusColor(payEvent.status),
  recordedDate: formatDateTime(payEvent.recordedDate),
  isSelected: payEvent.id === state.selectedPayEvent,
}));

export const getSelectedPayEvent = (state) => {
  const payEvent = state.selectedPayEvent;
  return payEvent ? {
    ...payEvent,
    status: getStatusColor(payEvent.status),
    recordedDate: formatDateTime(payEvent.recordedDate),
    declarationDate: formatDateTime(payEvent.declarationDate),
  } : {};
};

export const getFilterPayEventsParams = (state) => {
  const selectedYear = getSelectedPayrollYear(state);
  const yearObj = state.payrollYears.find(({ year }) => year === selectedYear);

  return {
    startDate: yearObj.startDate,
    endDate: yearObj.endDate,
  };
};

export const getLoadPayEventDetailsUrlParams = state => ({
  businessId: state.businessId,
  payEventId: state.selectedPayEvent.id,
});

export const getIsSelectedPayEvent = (state, payEventId) => (
  payEventId === state.selectedPayEvent.id
);
