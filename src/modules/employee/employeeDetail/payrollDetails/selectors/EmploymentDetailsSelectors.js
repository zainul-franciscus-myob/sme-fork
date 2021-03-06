import { differenceInYears } from 'date-fns';

export const getGenderOptions = (state) => state.genderOptions;
export const getEmploymentBasisOptions = (state) =>
  state.employmentBasisOptions;
export const getEmploymentCategoryOptions = (state) =>
  state.employmentCategoryOptions;
export const getEmploymentStatusOptions = (state) =>
  state.employmentStatusOptions;
export const getEmployeePayslipDeliveryOptions = (state) =>
  state.payslipDeliveryOptions;

export const getEmploymentDetails = (state) =>
  state.payrollDetails.employmentDetails;

export const getCalculatedAge = (state) => {
  const age = differenceInYears(
    new Date(),
    new Date(state.payrollDetails.employmentDetails.dateOfBirth)
  );
  return String(age >= 0 ? age : '-');
};

export const getStartDate = (state) =>
  state.payrollDetails.employmentDetails.startDate;

export const getTerminationDate = (state) =>
  state.payrollDetails.employmentDetails.terminationDate;

export const shouldDefaultPayslipEmail = (state) =>
  state.payrollDetails.employmentDetails.paySlipEmail === '' &&
  state.contactDetail.email !== '';

export const getIsPaySlipEmailRequired = (state) =>
  state.payrollDetails.employmentDetails.paySlipDelivery === 'ToBeEmailed' ||
  state.payrollDetails.employmentDetails.paySlipDelivery ===
    'ToBePrintedAndEmailed';

export const getTerminationDateNewlySet = (state) =>
  state.payrollDetails.employmentDetails.terminationDateNewlySet;

export const getTerminationConfirmModalIsOpen = (state) =>
  state.payrollDetails.employmentDetails.terminationConfirmModalIsOpen;
