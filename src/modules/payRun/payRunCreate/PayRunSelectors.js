import { createSelector } from 'reselect';

import formatDate from '../../../common/valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';

export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getBusinessId = (state) => state.businessId;
export const getAlert = (state) => state.alert;
export const getStep = (state) => state.step;
export const getPreviousStepModalIsOpen = (state) =>
  state.previousStepModalIsOpen;
export const getIsPayrollSetup = (state) => state.startPayRun.isPayrollSetup;

const getPaymentFrequency = (state) =>
  state.startPayRun.currentEditingPayRun.paymentFrequency;
const getPaymentDate = (state) =>
  formatDate(
    new Date(state.startPayRun.currentEditingPayRun.paymentDate),
    'iii dd/MM/yyyy'
  );
const getPayPeriodStart = (state) =>
  formatDate(
    new Date(state.startPayRun.currentEditingPayRun.payPeriodStart),
    'iii dd/MM/yyyy'
  );
const getPayPeriodEnd = (state) =>
  formatDate(
    new Date(state.startPayRun.currentEditingPayRun.payPeriodEnd),
    'iii dd/MM/yyyy'
  );
const getTotalNetPay = (state) => state.totalNetPay;

export const getEmployeeHeader = createSelector(
  getPaymentFrequency,
  getPaymentDate,
  getPayPeriodStart,
  getPayPeriodEnd,
  getTotalNetPay,
  (
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
    totalNetPay
  ) => ({
    paymentFrequency,
    paymentDate,
    payPeriodStart,
    payPeriodEnd,
    totalNetPay,
  })
);

export const getPayOnDate = (state) =>
  formatSlashDate(new Date(state.startPayRun.currentEditingPayRun.paymentDate));

const initialStepperSteps = [
  {
    number: '1',
    title: 'Select pay period',
    type: 'incomplete',
  },
  {
    number: '2',
    title: 'Calculate pays',
    type: 'incomplete',
  },
  {
    number: '3',
    title: 'Record and report',
    type: 'incomplete',
  },
  {
    number: '4',
    title: 'Prepare pay slips',
    type: 'incomplete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

const isStepCompleted = (stepIndex, activeStepIndex) =>
  stepIndex < activeStepIndex;
const completeTheStep = (step) => ({ ...step, type: 'complete' });

export const getPayRunListUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/payRun`;
};

export const getElectronicPaymentsCreateUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/electronicPayments?paymentType=PayEmployees`;
};

export const getStpReportingUrl = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/stp/reportingCentre?tab=reports`;
};

export const getStepperSteps = (state) => {
  const activeStepIndex = getStep(state);

  return initialStepperSteps.map((step, index) =>
    isStepCompleted(index, activeStepIndex) ? completeTheStep(step) : step
  );
};

export const getStepNumber = (state) => String(state.step + 1);

const getSelectedEmployeeIds = (state) =>
  state.employeePayList.lines
    .filter((employeePay) => employeePay.isSelected === true)
    .map((employeePay) => employeePay.employeeId);

const getEmployeePayOriginalLines = (state) =>
  state.employeePayList.originalLines;
const getEmployeePayLines = (state) => state.employeePayList.lines;
const getUnprocessedTimesheetLines = (state) => state.unprocessedTimesheetLines;

export const getSaveDraftContent = (state, isAllowNegativesInPayRuns) => ({
  ...state.startPayRun.currentEditingPayRun,
  selectedEmployeeIds: getSelectedEmployeeIds(state),
  employeePays: isAllowNegativesInPayRuns
    ? getEmployeePayLines(state).map((employeePay, i) => ({
        ...employeePay,
        note: getEmployeePayLines(state)[i].note,
        payItems: employeePay.payItems.map((payItem) => ({
          ...payItem,
          jobs: getEmployeePayLines(state)
            .find((q) => q.employeeId === employeePay.employeeId)
            ?.payItems.find((q) => q.payItemId === payItem.payItemId)?.jobs,
        })),
      }))
    : getEmployeePayOriginalLines(state).map((employeePay, i) => ({
        ...employeePay,
        note: getEmployeePayLines(state)[i].note,
        payItems: employeePay.payItems.map((payItem) => ({
          ...payItem,
          jobs: getEmployeePayLines(state)
            .find((q) => q.employeeId === employeePay.employeeId)
            ?.payItems.find((q) => q.payItemId === payItem.payItemId)?.jobs,
        })),
      })),
  unprocessedTimesheetSelections: getUnprocessedTimesheetLines(state),
});

export const getPayrollSettingsLink = (state) => {
  const { businessId, region } = state;
  return `/#/${region}/${businessId}/payrollSettings?tab=general`;
};

export const getRegion = (state) => state.region;

export const getStpErrorUrl = (state) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);

  return `/#/${region}/${businessId}/stp/errors?source=payRunCreate`;
};
