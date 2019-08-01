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
  deductions: 'deductions',
  taxes: 'taxes',
};

export const payrollDetailsSubTabItems = [
  { id: payrollDetailsSubTabIds.employmentDetails, label: 'Employment details' },
  { id: payrollDetailsSubTabIds.salaryAndWages, label: 'Salary and wages' },
  { id: payrollDetailsSubTabIds.deductions, label: 'Deductions' },
  { id: payrollDetailsSubTabIds.taxes, label: 'Taxes' },
];
