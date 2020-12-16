const sampleTestData = {
  gst: {
    code: 'GST',
    description: 'Goods & Services Tax',
    type: 'GST_VAT',
    rate: '10',
    includeInGSTReturn: false,
    taxCollectedAccountId: '123', // withholdingCreditsAccountId
    taxPaidAccountId: '789', // withholdingPayableAccountsId
    linkedContactId: '78',
    isWithholding: false,
    luxuryCarTax: '60000',
  },
  nz: {
    code: 'E',
    description: 'Exempt',
    type: 'GST_VAT',
    rate: '0',
    includeInGSTReturn: true,
    taxCollectedAccountId: '123', // withholdingCreditsAccountId
    taxPaidAccountId: '789', // withholdingPayableAccountsId
    linkedContactId: '78',
    isWithholding: false,
  },
  importDuty: {
    code: 'FRE',
    description: 'GST Free',
    type: 'ImportDuty',
    rate: '10',
    includeInGSTReturn: false,
    taxPaidAccountId: '789', // withholdingPayableAccountsId
    linkedContactId: '78',
    isWithholding: false,
    isDutyTax: true,
  },
  withholding: {
    code: 'ABN',
    description: 'No ABN Withholding',
    type: 'NoABN_TFN',
    rate: '10',
    includeInGSTReturn: false,
    taxCollectedAccountId: '123', // withholdingCreditsAccountId
    taxPaidAccountId: '789', // withholdingPayableAccountsId
    linkedContactId: '5',
    isWithholding: true,
  },
  consolidated: {
    code: 'LCG',
    description: 'Consolidated LCT & GST',
    type: 'Consolidated',
    taxCollectedAccountId: '123', // withholdingCreditsAccountId
  },
  inputTaxed: {
    code: 'INP',
    description: 'Input Taxed',
    type: 'InputTaxed',
    rate: '10',
    taxCollectedAccountId: '123', // withholdingCreditsAccountId
  },
};

export default {
  ...sampleTestData.gst,
  childrenTaxCodes: [
    { code: 'WET', description: 'Wine Equalisation Tax', rate: '10' },
    { code: 'WEG', description: 'GST on Wine Equalisation Tax', rate: '12.9' },
  ],
  accountOptions: [
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
};
