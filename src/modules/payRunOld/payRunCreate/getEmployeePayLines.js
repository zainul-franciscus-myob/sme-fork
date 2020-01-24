const getEmployeePayLines = (employeePays, isSelectedFunc) => (
  employeePays.map(employeePay => ({
    ...employeePay,
    isSelected: isSelectedFunc(employeePay),
    payItems: employeePay.payItems.map(
      payItem => ({
        ...payItem,
        isSubmitting: false,
      }),
    ),
  })));

export default getEmployeePayLines;
