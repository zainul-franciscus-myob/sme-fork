export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getTaxDetails = (state) => state.payrollDetails?.tax;
export const getIsIrdNumberEditable = (state) =>
  state.payrollDetails.tax.taxCode !== 'ND';
