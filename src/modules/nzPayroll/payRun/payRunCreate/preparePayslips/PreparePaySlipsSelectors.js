const getEmployeePayListForPaySlips = (state) =>
  state.draftPayRun.lines
    .filter((e) => e.isSelected)
    .map((employee) => ({
      transactionId: employee.id,
      employeeId: employee.employeeId,
      name: employee.name,
      takeHomePay: employee.takeHomePay,
    }));

export default getEmployeePayListForPaySlips;
