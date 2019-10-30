export default {
  layout: 'service',
  pageTitle: 'Quote 00000123',
  quote: {
    id: '5',
    customerId: '2',
    customerName: 'Cow Feed',
    expirationTerm: 'OnADayOfTheMonth',
    expirationDays: '4',
    chargeForLatePayment: 123.12,
    discountForEarlyPayment: 3546.34,
    numberOfDaysForDiscount: 10,
    taxInclusive: true,
    quoteNumber: '00000123',
    address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
    issueDate: '2018-11-02',
    purchaseOrderNumber: '123',
    notesToCustomer: 'Thank you!',
    lines: [
      {
        id: '345',
        description: 'Yak shaving - 1/2 an hour',
        allocatedAccountId: '123',
        amount: '48.50',
        taxCodeId: '124',
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
      {
        id: '346',
        description: 'Yak shower - 1/2 an hour',
        allocatedAccountId: '456',
        amount: '50.00',
        taxCodeId: '123',
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
      {
        id: '347',
        description: 'Yak blow dry - 1/2 an hour',
        allocatedAccountId: '123',
        amount: '12.50',
        taxCodeId: '124',
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
    ],
  },
  expirationTerms: [
    {
      value: 'OnADayOfTheMonth',
      name: 'Due on a date of this month',
    },
    {
      value: 'Prepaid',
      name: 'Prepaid',
    },
    {
      value: 'InAGivenNumberOfDays',
      name: 'Due in a number of days after the issue date',
    },
    {
      value: 'CashOnDelivery',
      name: 'Cash on delivery',
    },
    {
      value: 'DayOfMonthAfterEOM',
      name: 'Due on a date of next month',
    },
    {
      value: 'NumberOfDaysAfterEOM',
      name: 'Due in a number of days after the end of the month',
    },
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
        displayName: 'Expense Accou t',
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
    subTotal: '$48.50',
    totalTax: '$4.39',
    totalAmount: '$48.30',
  },
  comments: [
    { value: 'Happy Holiday!' },
    { value: 'Great doing business' },
    { value: "don't call us we'll call you" },
  ],
  exportPdf: {
    templateOptions: [
      {
        name: 'a',
        label: 'apple',
      },
      {
        name: 'b',
        label: 'banana',
      },
    ],
    template: 'a',
  },
};
