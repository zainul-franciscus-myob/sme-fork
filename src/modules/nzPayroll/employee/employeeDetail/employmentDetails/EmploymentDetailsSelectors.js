export const getEmploymentStatusOptions = ({ employmentStatusOptions }) =>
  employmentStatusOptions;
export const getEmploymentDetails = ({ payrollDetails }) =>
  payrollDetails?.employmentDetails;

export const getTaxDetails = ({ payrollDetails }) => payrollDetails?.tax;
export const getTaxCodeOptions = ({ taxCodeOptions }) => taxCodeOptions;

export const getKiwiSaverDetails = (state) => state.payrollDetails?.kiwiSaver;
export const getKiwiSaverOptions = (state) => ({
  kiwiSaverStatusOptions: state.kiwiSaverStatusOptions,
  employeeContributionRateOptions: state.kiwiSaverEmployeeContributionOptions,
  esctRateOptions: state.employerSuperannuationContributionTaxOptions,
});
