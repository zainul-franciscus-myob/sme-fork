const getEmployeePayLines = (employeePays, isSelectedFunc) => {
  if (!Array.isArray(employeePays)) return [];

  return employeePays.map((employeePay) => ({
    ...employeePay,
    isSelected: isSelectedFunc(employeePay),
    payLines: employeePay.payLines.map((payLine) => ({
      ...payLine,
      isSubmitting: false,
    })),
  }));
};

export default getEmployeePayLines;
