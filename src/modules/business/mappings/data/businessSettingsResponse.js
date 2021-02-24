export default {
  businessDetails: {
    region: 'AU',
    organisationName: 'Wayne Corp',
    tradingName: 'Batman',
    abn: '80123123123', // only be used for AU business
    nzbn: '34', // only be used for NZ business
    irdNumber: '435302235', // only be used for NZ business
    gstBranchNumber: '32', // only be used for AU business
    acn: '123456', // only be used for AU business
    phoneNumber: '0212123445',
    fax: '0212123445',
    clientCode: 'test code',
    email: 'bruce@waynecorp.com',
    address: '123 Some Street\nSomewhere VIC 3111',
    financialYear: '2019',
    lastMonthInFinancialYear: '2',
    openingBalanceDate: '2018-04-01T00:00:00',
    serialNumber: '612312344567',
    hasLockPeriod: true,
    lockDate: '2019-11-11',
    tradeName: 'Clearwater',
    website: 'https://www.myob.com',
    isFinancialYearClosed: false,
    hasTransactions: false,
    payeeNumber: '00000000', // only be used for AU business
    industryCodeOptions: [
      {
        Code: '0114',
        Display: 'Floriculture Production (Under Cover)',
        Searchable: 'flowers florist',
      },
      {
        Code: '2292',
        Display: 'Nut, Bolt, Screw and Rivet Manufacturing',
        Searchable: 'hardware',
      },
      {
        Code: '6611',
        Display: 'Passenger Car Rental and Hiring',
        Searchable: 'uber taxi',
      },
      {
        Code: '0141',
        Display: 'Sheep Farming (Specialised)',
        Searchable: 'farmer',
      },
      {
        Code: '4121',
        Display: 'Fresh Meat, Fish and Poultry Retailing',
        Searchable: 'butcher',
      },
    ],
  },
  gstSettings: {
    reportingFrequency: 'Quarterly',
    accountingBasis: 'Cash',
    gstRegisteredOptions: [
      { value: 'NotRegistered', displayValue: 'No' },
      { value: 'Monthly', displayValue: 'Yes' },
    ],
    accountingBasisOptions: [
      { value: 'Cash', displayValue: 'Cash' },
      { value: 'Accruals', displayValue: 'Accruals' },
    ],
    reportingFrequencyOptions: [
      { value: 'Monthly', displayValue: 'Monthly' },
      { value: 'Quarterly', displayValue: 'Quarterly' },
      { value: 'Annually', displayValue: 'Annually' },
    ],
  },
  preferences: {
    fromName: 'Dr. Clear Water',
    fromEmail: 'clearwater@myob.com',
  },
  financialYearOptions: [
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ],
};
