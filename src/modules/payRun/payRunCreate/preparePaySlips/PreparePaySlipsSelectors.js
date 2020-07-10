export const getBusinessId = (state) => state.businessId;
export const getSelectedTab = (state) => state.preparePaySlips.selectedTab;
export const getEmailTabEmployees = (state) =>
  state.preparePaySlips.emailPaySlipEmployees;
export const getPrintTabEmployees = (state) =>
  state.preparePaySlips.printPaySlipEmployees;
export const getEmailSettings = (state) => state.preparePaySlips.emailSettings;
export const getSelectedEmployeesToEmail = (state) =>
  getEmailTabEmployees(state)
    .filter((e) => e.isSelected)
    .map((employee) => ({
      id: employee.employeeId,
      name: employee.name,
      email: employee.email,
      transactionId: employee.transactionId,
    }));
export const getEmailPaySlipModalContext = ({
  state,
  employees,
  emailSettings,
}) => ({
  businessId: getBusinessId(state),
  employees,
  emailSettings,
});
