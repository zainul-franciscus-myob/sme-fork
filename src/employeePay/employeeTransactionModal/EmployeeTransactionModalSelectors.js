export const getUrlParams = state => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getEmployeeName = state => state.employeeName;
export const getModalEmployeeDetails = state => state.employeeDetails;
export const getIsLoading = state => state.isLoading;
export const getDeletePopoverIsOpen = state => state.deletePopoverIsOpen;
export const getIsModalOpen = state => state.isOpen;
