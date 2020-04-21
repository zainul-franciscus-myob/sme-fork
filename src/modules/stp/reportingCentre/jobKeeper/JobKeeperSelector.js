export const getPayrollYears = () => [];
export const getSelectedPayrollYear = state => state.selectedPayrollYear;
export const getActiveSort = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});
