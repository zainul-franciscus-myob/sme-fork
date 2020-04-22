export const tabIds = {
  contactDetails: 'contactDetails',
  payrollDetails: 'payrollDetails',

  employmentDetails: 'employmentDetails',
};

export const tabItems = [
  { id: tabIds.contactDetails, label: 'Contact details' },
  {
    id: tabIds.payrollDetails,
    label: 'Payroll details',
    subTabs: [
      { id: tabIds.employmentDetails, label: 'Employment Details' },
    ],
  },
];
