export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getTaxDetails = (state) => state.payrollDetails?.tax;
export const getIsIrdNumberEditable = (state) =>
  state.payrollDetails.tax.taxCode !== 'ND';

export const getKiwiSaver = (state) => state.payrollDetails?.kiwiSaver;
export const getKiwiSaverStatusOptions = (state) =>
  state.kiwiSaverStatusOptions;
export const getEmployeeContributionOptions = (state) =>
  state.kiwiSaverEmployeeContributionOptions;
