export default {
  layout: 'service',
  quote: {
    expirationTerm: 'OnADayOfTheMonth',
    expirationDays: '4',
    taxInclusive: true,
    quoteNumber: '00000123',
    lines: [],
  },
  customerOptions: [
    {
      name: 'A-Z Stationery Supplies',
      value: '1',
    },
    {
      name: 'Cow Feed',
      value: '2',
    },
  ],
  expirationTermOptions: [
    { value: 'OnADayOfTheMonth', name: 'On a day of the month' },
    { value: 'InAGivenNumberOfDays', name: 'In a given no. of days' },
    { value: 'DayOfMonthAfterEOM', name: 'Day of month after EOM' },
    { value: 'NumberOfDaysAfterEOM', name: 'No. of days after EOM' },
    { value: 'Prepaid', name: 'Prepaid' },
    { value: 'CashOnDelivery', name: 'C.O.D.' },
  ],
  newLine: {
    description: '',
    allocatedAccountId: '',
    amount: '',
    taxCodeId: '',
    accounts: [
      {
        id: '123',
        displayName: 'My Sales Account 1',
        accountType: 'Sales',
        taxCodeId: '123',
        displayId: '4-123',
      },
      {
        id: '456',
        displayName: 'Sales Account 2',
        accountType: 'Assets',
        taxCodeId: '124',
        displayId: '4-456',
      },
      {
        id: '789',
        displayName: 'Expense Account',
        accountType: 'Assets',
        taxCodeId: '124',
        displayId: '6-789',
      },
    ],
    taxCodes: [
      {
        id: '123',
        displayName: 'GST',
        description: 'Goods & Service Tax',
        displayRate: '10%',
      },
      {
        id: '124',
        displayName: 'FRE',
        description: 'GST FREE',
        displayRate: '5%',
      },
    ],
  },
  totals: {
    subTotal: '$0.00',
    totalTax: '$0.0',
    totalAmount: '$0.0',
  },
};
