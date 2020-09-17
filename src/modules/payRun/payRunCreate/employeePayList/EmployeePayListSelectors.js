import { createSelector } from 'reselect';

import EtpPayItemStpCategories from '../types/EtpPayItemStpCategory';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const getEmployeePayLines = (state) => state.employeePayList.lines;

export const getIsPayrollJobColumnEnabled = (state) =>
  state.isPayrollJobColumnEnabled;

export const getJobOptions = (state) => state.employeePayList.jobs;

export const getSelectedEmployeeId = (state) =>
  state.employeePayList.selectedEmployeeId;

export const getSelectedPayItem = (state) =>
  state.employeePayList.selectedPayItem;

export const getJobListModalLoadingState = (state) =>
  state.employeePayList.jobListModalLoadingState;

export const getFormattedEmployeePayLines = createSelector(
  getEmployeePayLines,
  (lines) =>
    lines.map((line) => ({
      ...line,
      gross: formatAmount(line.gross),
      payg: formatAmount(line.payg),
      deduction: formatAmount(line.deduction),
      netPay: formatAmount(line.netPay),
      super: formatAmount(line.super),
    }))
);

export const getIsAllSelected = (state) =>
  state.employeePayList.lines.every((line) => line.isSelected);
const getIsSomeSelected = (state) =>
  state.employeePayList.lines.some((line) => line.isSelected);

export const getIsPartiallySelected = createSelector(
  getIsAllSelected,
  getIsSomeSelected,
  (isAllSelected, isSomeSelected) => !isAllSelected && isSomeSelected
);

export const getIsUnsavedModalOpen = (state) =>
  state.employeePayList.unsavedModalIsOpen;

export const getIsPageEdited = (state) => state.employeePayList.isPageEdited;

export const getNumberOfSelected = (state) =>
  state.employeePayList.lines.filter((line) => line.isSelected).length;

export const getTotals = createSelector(getEmployeePayLines, (lines) => {
  const calculatedTotals = lines
    .filter((line) => line.isSelected)
    .reduce(
      (totals, line) => ({
        gross: totals.gross + line.gross,
        payg: totals.payg + line.payg,
        deduction: totals.deduction + line.deduction,
        netPay: totals.netPay + line.netPay,
        super: totals.super + line.super,
      }),
      {
        gross: 0,
        payg: 0,
        deduction: 0,
        netPay: 0,
        super: 0,
      }
    );

  return {
    gross: formatAmount(calculatedTotals.gross),
    payg: formatAmount(calculatedTotals.payg),
    deduction: formatAmount(calculatedTotals.deduction),
    netPay: formatAmount(calculatedTotals.netPay),
    super: formatAmount(calculatedTotals.super),
  };
});

export const getEtpCodeCategory = (state) => state.employeePayList.etp.category;
export const getEtpCode = (state) => state.employeePayList.etp.code;
export const getIsEtpOpen = (state) => state.employeePayList.etp.isOpen;
export const getIsJobListModalOpen = (state) =>
  state.employeePayList.isJobListModalOpen;
export const getEtpEmployeeId = (state) => state.employeePayList.etp.employeeId;

const getAmount = (array, id) => {
  const obj = array.find((q) => q.jobId === id);
  if (!obj) {
    return '0.00';
  }

  return obj.amount;
};

export const getSelectedPayItemWithAllocatedJobs = createSelector(
  getSelectedPayItem,
  (payItem) => ({
    ...payItem,
    jobs: payItem.jobs.filter((job) => Number(job.amount) !== 0),
  })
);

const buildSelectedPayItemJobs = createSelector(
  getJobOptions,
  getSelectedPayItem,
  (jobs, payItem) =>
    jobs.map((job) => ({
      ...job,
      isSelected: payItem.jobs.some((q) => q.jobId === job.id),
      amount: getAmount(payItem.jobs, job.id),
    }))
);

export const getSelectedPayItemJobs = createSelector(
  buildSelectedPayItemJobs,
  (jobs) => jobs.filter((job) => job.isActive || job.isSelected)
);

const getIsAllJobsSelected = createSelector(getSelectedPayItemJobs, (jobs) =>
  jobs.every((entry) => entry.isSelected)
);

const getIsSomeJobsSelected = createSelector(getSelectedPayItemJobs, (jobs) =>
  jobs.some((line) => line.isSelected)
);

export const getJobsSelectStatus = createSelector(
  getIsAllJobsSelected,
  getIsSomeJobsSelected,
  (isAllSelected, isSomeSelected) => {
    if (isAllSelected) {
      return 'checked';
    }

    if (isSomeSelected) {
      return 'indeterminate';
    }

    return '';
  }
);

const buildJobAllocationAmount = (payItem) => {
  const total = Number(payItem.amount);
  const allocated = payItem.jobs
    ? payItem.jobs.reduce((t, q) => t + Number(q.amount), 0)
    : 0;
  const unallocated = total - allocated;
  const allocatedPercent = (allocated * 100) / total;
  const unallocatedPercent = (unallocated * 100) / total;
  return {
    total,
    allocated,
    unallocated,
    formatedAllocated: formatAmount(allocated),
    formatedUnallocated: formatAmount(unallocated),
    allocatedPercent: formatNumberWithDecimalScaleRange(allocatedPercent, 2, 2),
    unallocatedPercent: formatNumberWithDecimalScaleRange(
      unallocatedPercent,
      2,
      2
    ),
  };
};

const getJobAllocationForValidation = (payItem) => {
  const hasJobAllocation = payItem.jobs && payItem.jobs.length > 0;
  const total = Number(payItem.amount);
  const allocated = hasJobAllocation
    ? payItem.jobs.reduce((t, q) => t + Number(q.amount), 0)
    : 0;

  return {
    total: Number(formatAmount(total)),
    allocated: Number(formatAmount(allocated)),
  };
};

const isJobAllocated = (payItem) => payItem.jobs && payItem.jobs.length > 0;

const isUnderAllocated = (payItem) => {
  const { allocated, total } = getJobAllocationForValidation(payItem);

  if (allocated >= 0) {
    return total > allocated;
  }

  return total < allocated;
};

const isTotalAllocated = (payItem) => {
  const { allocated, total } = getJobAllocationForValidation(payItem);

  return allocated === total;
};

export const getShouldShowUnderAllocationWarning = (payItem) =>
  !payItem.ignoreUnderAllocationWarning &&
  isJobAllocated(payItem) &&
  isUnderAllocated(payItem);

export const getShouldShowOverAllocationError = (payItem) =>
  isJobAllocated(payItem) &&
  !isUnderAllocated(payItem) &&
  !isTotalAllocated(payItem);

export const getIsOverAllocated = createSelector(getSelectedPayItem, (item) =>
  getShouldShowOverAllocationError(item)
);

export const getJobAmount = createSelector(getSelectedPayItem, (item) =>
  buildJobAllocationAmount(item)
);

export const getHeaderSelectStatus = createSelector(
  (state) => state.entries.filter((entry) => entry.isChecked).length,
  (state) => state.entries.length,
  (selectedCount, entryCount) => {
    if (entryCount > 0 && selectedCount === entryCount) {
      return 'checked';
    }

    if (selectedCount > 0) {
      return 'indeterminate';
    }

    return '';
  }
);

export const getIsEtpCodeCategorySelected = createSelector(
  getEtpCodeCategory,
  Boolean
);
export const getInvalidEtpNames = (state) =>
  state.employeePayList.invalidEtpNames;

const isEtpPayItem = ({ stpCategory }) =>
  EtpPayItemStpCategories.includes(stpCategory);
const isEmptyPayItem = ({ amount }) => Number(amount) === 0;
const isUpdateableEtpCode = ({ etpCode }) => Boolean(etpCode);

const isNonEmptyEtpLine = ({ payItems }) =>
  payItems.some((payItem) => isEtpPayItem(payItem) && !isEmptyPayItem(payItem));

export const isEtpAlertForLineShown = (line) =>
  isNonEmptyEtpLine(line) && !isUpdateableEtpCode(line);

export const isEtpSelectionForLineShown = (line) => isNonEmptyEtpLine(line);

export const isValidEtp = ({ invalidEtpNames }) => invalidEtpNames.length === 0;

export const formatEtpCode = ({ etpCode }) =>
  etpCode ? `Code ${etpCode}` : 'None';

const isLineSelected = ({ isSelected }) => Boolean(isSelected);

const getEtpValidationLine = ({ employeeId, name, etpCode, payItems }) => ({
  employeeId,
  name,
  etpCode,
  payItems: payItems
    .filter(isEtpPayItem)
    .map(({ payItemId, amount, stpCategory }) => ({
      payItemId,
      amount,
      stpCategory,
    })),
});

export const getValidateEtpContent = createSelector(
  getEmployeePayLines,
  (lines) => lines.filter(isLineSelected).map(getEtpValidationLine)
);

export const getPayPeriod = ({ startPayRun: { currentEditingPayRun } }) => ({
  payPeriodStart: currentEditingPayRun.payPeriodStart,
  payPeriodEnd: currentEditingPayRun.payPeriodEnd,
});

export const getSelectedEmployeeIds = createSelector(
  getEmployeePayLines,
  (lines) => lines.filter(isLineSelected).map((line) => line.employeeId)
);

export const getIsPayItemLineDirty = (state) =>
  state.employeePayList.isPayItemLineDirty;

const isWagePayItem = (payItemType) =>
  ['SalaryWage', 'HourlyWage'].includes(payItemType);
const isDeductionPayItem = (payItemType) =>
  [
    'Deduction',
    'SuperannuationDeductionBeforeTax',
    'SuperannuationDeductionAfterTax',
  ].includes(payItemType);
const isTaxPayItem = (payItemType) => ['Tax'].includes(payItemType);
const isLeavePayItem = (payItemType) => payItemType === 'Entitlement';
const isEmployerExpensePayItem = (payItemType) =>
  ['Expense', 'SuperannuationExpense'].includes(payItemType);

const getEmployeeLineByEmployeeId = (state, employeeId) =>
  state.employeePayList.lines.find((line) => line.employeeId === employeeId);
const getOriginalEmployeeLineByEmployeeId = (state, employeeId) =>
  state.employeePayList.originalLines.find(
    (line) => line.employeeId === employeeId
  );

const getBaseHourlyWagePayItemId = (state) =>
  state.employeePayList.baseHourlyWagePayItemId;
const getBaseSalaryWagePayItemId = (state) =>
  state.employeePayList.baseSalaryWagePayItemId;

const SMALLER = -1;
const BIGGER = 1;
const wagePayItemComparator = (a, b, baseWageIds) => {
  if (baseWageIds.includes(b.payItemId)) {
    return BIGGER;
  }
  if (baseWageIds.includes(a.payItemId)) {
    return SMALLER;
  }

  if (a.type === 'HourlyWage' && b.type === 'SalaryWage') return SMALLER;
  if (b.type === 'HourlyWage' && a.type === 'SalaryWage') return BIGGER;

  return a.payItemName.localeCompare(b.payItemName);
};

export const getWagePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  getBaseHourlyWagePayItemId,
  getBaseSalaryWagePayItemId,
  (line, baseHourlyWagePayItemId, baseSalaryWagePayItemId) =>
    line.payItems
      .filter((payItem) => isWagePayItem(payItem.type))
      .sort((a, b) =>
        wagePayItemComparator(a, b, [
          baseHourlyWagePayItemId,
          baseSalaryWagePayItemId,
        ])
      )
      .map((payItem) => ({
        ...payItem,
        shouldShowHours: payItem.type === 'HourlyWage',
      }))
);

export const getDeductionPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isDeductionPayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowHours: false,
      }))
);

export const getTaxPayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isTaxPayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowHours: false,
      }))
);

export const getLeavePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems
      .filter((payItem) => isLeavePayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowHours: true,
      }))
);

export const getEmployerExpensePayItemEntries = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (state, props) =>
    state.employeePayList.lines.find(
      (line) => line.employeeId === props.employeeId
    ),
  (line) =>
    line.payItems
      .filter((payItem) => isEmployerExpensePayItem(payItem.type))
      .map((payItem) => ({
        ...payItem,
        shouldShowHours: false,
      }))
);

export const getUpgradeModalShowing = ({ employeePayList }) =>
  employeePayList.isUpgradeModalShowing;

export const getPayPeriodEmployeeLimit = ({
  employeePayList: { payPeriodEmployeeLimit },
}) => payPeriodEmployeeLimit;

export const getShouldShowWagePayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isWagePayItem(payItem.type))
);
export const getShouldShowDeductionPayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isDeductionPayItem(payItem.type))
);
export const getShouldShowTaxPayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isTaxPayItem(payItem.type))
);
export const getShouldShowLeavePayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) => line.payItems.some((payItem) => isLeavePayItem(payItem.type))
);
export const getShouldShowExpensePayItemTableRows = createSelector(
  (state, props) => getEmployeeLineByEmployeeId(state, props.employeeId),
  (line) =>
    line.payItems.some((payItem) => isEmployerExpensePayItem(payItem.type))
);

const getPayItemLineForRecalculatePayload = (payItem) => {
  const { isSubmitting, ...restOfPayItem } = payItem;
  return restOfPayItem;
};

const getEditedPayItemLineForRecalculatePayload = (payItem) => {
  const {
    isSubmitting,
    calculatedAmount,
    calculatedHours,
    ...restOfPayItem
  } = payItem;
  return restOfPayItem;
};

export const getRecalculatePayPayload = ({
  state,
  employeeId,
  payItemId,
  key,
  isAllowNegativesInPayRuns,
}) => {
  const editedField = key;
  const editedEmployeeLine = getEmployeeLineByEmployeeId(state, employeeId);
  const editedPayItem = editedEmployeeLine.payItems.find(
    (payItem) => payItem.payItemId === payItemId
  );
  const originalEmployeeLine =
    !isAllowNegativesInPayRuns &&
    getOriginalEmployeeLineByEmployeeId(state, employeeId);

  return {
    employeeId,
    paymentFrequency: state.startPayRun.currentEditingPayRun.paymentFrequency,
    paymentDate: state.startPayRun.currentEditingPayRun.paymentDate,
    payPeriodStart: state.startPayRun.currentEditingPayRun.payPeriodStart,
    payPeriodEnd: state.startPayRun.currentEditingPayRun.payPeriodEnd,
    payItems: isAllowNegativesInPayRuns
      ? editedEmployeeLine.payItems.map((payItem) =>
          getPayItemLineForRecalculatePayload(payItem)
        )
      : originalEmployeeLine.payItems.map((payItem) =>
          getPayItemLineForRecalculatePayload(payItem)
        ),
    editedField,
    editedPayItem: isAllowNegativesInPayRuns
      ? getEditedPayItemLineForRecalculatePayload(editedPayItem)
      : getPayItemLineForRecalculatePayload(editedPayItem),
  };
};

const formatHours = (hours) => formatNumberWithDecimalScaleRange(hours, 2, 3);
export const getLeaveWarning = (inputHours, leaveWarning) => {
  if (
    inputHours > 0 &&
    leaveWarning &&
    leaveWarning.projectedLeaveBalance < 0
  ) {
    return {
      currentLeaveBalance: formatHours(leaveWarning.currentLeaveBalance),
      leaveAccruedThisPay: formatHours(leaveWarning.leaveAccruedThisPay),
      leaveBeingPaid: formatHours(leaveWarning.leaveBeingPaid),
      projectedLeaveBalance: formatHours(leaveWarning.projectedLeaveBalance),
    };
  }
  return null;
};
