export const mainTabIds = {
  contactDetails: 'contactDetails',
  payrollDetails: 'payrollDetails',
  paymentDetails: 'paymentDetails',
};

export const mainTabItems = [
  { id: mainTabIds.contactDetails, label: 'Contact details' },
  { id: mainTabIds.payrollDetails, label: 'Payroll details' },
  { id: mainTabIds.paymentDetails, label: 'Payment details' },
];

export const payrollDetailsSubTabIds = {
  employmentDetails: 'employmentDetails',
  salaryAndWages: 'salaryAndWages',
  leave: 'leave',
  deductions: 'deductions',
  superannuation: 'superannuation',
  expenses: 'expenses',
  taxes: 'taxes',
  wages: 'wages',
  standardPay: 'standardPay',
  payHistory: 'payHistory',
};

export const payrollDetailsSubTabItems = [
  {
    id: payrollDetailsSubTabIds.employmentDetails,
    label: 'Employment details',
  },
  { id: payrollDetailsSubTabIds.salaryAndWages, label: 'Salary and wages' },
  { id: 'leave', label: 'Leave' },
  { id: payrollDetailsSubTabIds.deductions, label: 'Deductions' },
  { id: payrollDetailsSubTabIds.superannuation, label: 'Superannuation' },
  { id: payrollDetailsSubTabIds.expenses, label: 'Expenses' },
  { id: payrollDetailsSubTabIds.taxes, label: 'Taxes' },
  { id: payrollDetailsSubTabIds.standardPay, label: 'Standard pay' },
  { id: payrollDetailsSubTabIds.payHistory, label: 'Pay history' },
];
