export const getIsOpen = (state) => state.isOpen;
export const getIsLoading = (state) => state.isLoading;
export const getTotalEmployees = (state) => state.employees.length;
export const getEmployeeCount = (state) => state.currentCount + 1;
export const getCurrentEmployeeName = (state) =>
  state.currentEmployee ? state.currentEmployee.name : '';
export const getCurrentEmployeeEmail = (state) =>
  state.currentEmployee ? state.currentEmployee.email : '';

export const getEmailUrlParams = (state) => ({
  businessId: state.businessId,
  transactionId: state.currentEmployee.transactionId,
});

export const getEmailContentForCurrentEmployee = (state) => {
  const {
    fromEmail,
    fromName,
    paySlipBody,
    paySlipSubject,
  } = state.emailSettings;
  const { name, email } = state.currentEmployee;

  return {
    fromEmail,
    fromName,
    messageBody: paySlipBody,
    subject: paySlipSubject,
    toEmail: email,
    toName: name,
  };
};

export const getIsFinished = (state) =>
  getEmployeeCount(state) === getTotalEmployees(state);
export const getErrored = (state) => state.errors;
export const getSucceeded = (state) => state.success;
