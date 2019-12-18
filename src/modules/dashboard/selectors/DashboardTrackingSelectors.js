import { addYears, getYear } from 'date-fns';
import { createSelector } from 'reselect';

import { getBusinessId } from './DashboardSelectors';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

export const getIsLoading = state => state.tracking.isLoading;
export const getIsDetailLoading = state => state.tracking.isDetailLoading;
export const getHasError = state => state.tracking.hasError;
export const getIsEmpty = state => state.tracking.isEmpty;
export const getFinancialYear = state => state.tracking.financialYear;
export const getIncomeAmount = state => state.tracking.incomeAmount;
export const getExpenseAmount = state => state.tracking.expenseAmount;
export const getProfitAmount = state => state.tracking.profitAmount;
export const getChart = state => state.tracking.chart;
export const getFinancialYearOptions = state => state.tracking.financialYearOptions;

export const getIsDisabled = createSelector(
  getIsLoading,
  getIsDetailLoading,
  (isLoading, isDetailLoading) => isLoading || isDetailLoading,
);

export const getLegend = createSelector(
  getIncomeAmount,
  getExpenseAmount,
  getProfitAmount,
  getFinancialYear,
  getFinancialYearOptions,
  (incomeAmount, expenseAmount, profitAmount, financialYear, financialYearOptions) => {
    const financialYearOption = financialYearOptions
      .find(({ value }) => value === financialYear) || {};
    const { name: financialYearLabel } = financialYearOption;

    const date = new Date(financialYear);
    const financialYearDisplay = `${getYear(date)}-${getYear(addYears(date, 1))}`;

    return {
      incomeAmount: formatCurrency(incomeAmount),
      expenseAmount: formatCurrency(expenseAmount),
      profitAmount: formatCurrency(profitAmount),
      isIncomeNegative: incomeAmount < 0,
      isExpensesNegative: expenseAmount < 0,
      isProfitNegative: profitAmount < 0,
      financialYearLabel,
      financialYearDisplay,
    };
  },
);

export const getLoadTrackingUrlParams = state => ({
  businessId: getBusinessId(state),
});

export const getLoadTrackingParams = () => ({
  todayDate: formatIsoDate(new Date()),
});

export const getLoadTrackingDetailUrlParams = state => ({
  businessId: getBusinessId(state),
  financialYear: getFinancialYear(state),
});
