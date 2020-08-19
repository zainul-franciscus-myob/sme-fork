const getEmployeePayLines = (employeePays, isSelectedFunc) => {
  if (!Array.isArray(employeePays)) return [];

  return employeePays.map((employeePay) => ({
    ...employeePay,
    isSelected: isSelectedFunc(employeePay),
    payItems: employeePay.payItems.map((payItem) => ({
      ...payItem,
      isSubmitting: false,
      ignoreUnderAllocationWarning: true,
    })),
  }));
};

export default getEmployeePayLines;
