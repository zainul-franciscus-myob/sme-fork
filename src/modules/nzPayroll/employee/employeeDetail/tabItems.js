export const tabIds = {
  contactDetails: 'contactDetails',
  payrollDetails: 'payrollDetails',

  employmentDetails: 'employmentDetails',
  salaryAndWages: 'salaryAndWages',
  leave: 'leave',
};

export const tabItems = [
  { id: tabIds.contactDetails, label: 'Contact details' },
  {
    id: tabIds.payrollDetails,
    label: 'Payroll details',
    subTabs: [
      { id: tabIds.employmentDetails, label: 'Employment details' },
      { id: tabIds.salaryAndWages, label: 'Salary and wages' },
      { id: tabIds.leave, label: 'Leave' },
    ],
  },
];
